// Imports published blog posts and categories from a WordPress site (via its public REST API).
//
//   npm run import:wordpress                       -> dry run: shows what would happen, changes nothing
//   npm run import:wordpress -- --apply            -> imports
//   npm run import:wordpress -- --apply --author=you@example.com   -> posts get this author
//   npm run import:wordpress -- --apply --update   -> also overwrites posts that were imported before
//   npm run import:wordpress -- --apply --download-images          -> copies images to backend/uploads
//
// Other options: --site=https://example.com   --include=slug1,slug2 (import posts skipped by default)
//
// Posts keep their WordPress slug, so /old-post-slug/ can redirect to /blog/old-post-slug.
import sanitizeHtml from "sanitize-html";
import { writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { pool } from "../src/config/db.js";
import { sanitizeContent } from "../src/utils/sanitizeContent.js";
import { slugify } from "../src/utils/slugify.js";

// ---------- Options ----------
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...v] = a.replace(/^--/, "").split("=");
    return [k, v.length ? v.join("=") : true];
  })
);
const SITE = String(args.site || "https://pelicanstechnologies.com").replace(/\/+$/, "");
const APPLY = Boolean(args.apply);
const UPDATE = Boolean(args.update);
const DOWNLOAD_IMAGES = Boolean(args["download-images"]);
// Placeholder posts that aren't real articles
const DEFAULT_SKIP = ["blog-detail-template"];
const INCLUDE = new Set(String(args.include || "").split(",").filter(Boolean));
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const UPLOAD_DIR = path.resolve("uploads");

// ---------- Helpers ----------
const NAMED_ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", hellip: "…", ndash: "–", mdash: "—",
  lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”", copy: "©", reg: "®", trade: "™",
};
const decodeEntities = (s = "") =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, name) => NAMED_ENTITIES[name.toLowerCase()] ?? m);

const plainText = (html = "") =>
  decodeEntities(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

function truncate(text, max) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" ") > 0 ? cut.lastIndexOf(" ") : max).replace(/[,;:.\s]+$/, "")}…`;
}

async function getJson(url) {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return { data: await res.json(), totalPages: Number(res.headers.get("x-wp-totalpages") || 1) };
}

async function getAll(endpoint) {
  const items = [];
  for (let page = 1; ; page++) {
    const { data, totalPages } = await getJson(`${SITE}/wp-json/wp/v2/${endpoint}${endpoint.includes("?") ? "&" : "?"}per_page=100&page=${page}`);
    items.push(...data);
    if (page >= totalPages) break;
  }
  return items;
}

// WordPress block HTML -> the simple HTML our editor and blog use
function cleanContent(html) {
  // The "Table of Contents" sidebar column sits at the end of the post: drop it
  const sidebar = html.search(/<div[^>]+class="[^"]*\bblog-sidebar\b/);
  if (sidebar >= 0) html = html.slice(0, sidebar);
  // Fallback: a "Table of Contents" heading followed by a list
  html = html.replace(/<h[1-6][^>]*>\s*Table of Contents\s*<\/h[1-6]>\s*<(ul|ol)[\s\S]*?<\/\1>/gi, "");

  const cleaned = sanitizeHtml(html, {
    allowedTags: ["p", "br", "h2", "h3", "h4", "strong", "b", "em", "i", "u", "s", "a", "ul", "ol", "li", "blockquote", "code", "pre", "hr", "img"],
    allowedAttributes: { a: ["href", "target", "rel"], img: ["src", "alt", "width", "height"], ol: ["start"] },
    transformTags: {
      h1: "h2", // the post title is the page's only h1
      h5: "h3",
      h6: "h3", // used for the numbered sub-sections
      // In-page links (#section) point at the removed table of contents: keep just the text
      a: (tagName, attribs) => (attribs.href?.startsWith("#") ? { tagName: "span", attribs: {} } : { tagName, attribs }),
    },
    // Drop paragraphs and headings that end up empty
    exclusiveFilter: (frame) => ["p", "h2", "h3", "h4", "strong"].includes(frame.tag) && !frame.text.trim() && !frame.mediaChildren?.length,
  });

  // Same rules as content saved from the admin editor
  return sanitizeContent(cleaned).replace(/\n{2,}/g, "\n").trim();
}

// First real paragraph (skips short label paragraphs like "Introduction")
function makeExcerpt(contentHtml, wpExcerptHtml) {
  for (const m of contentHtml.matchAll(/<p>([\s\S]*?)<\/p>/g)) {
    const text = plainText(m[1]);
    if (text.length >= 80) return truncate(text, 220);
  }
  return truncate(plainText(wpExcerptHtml).replace(/\s*\[…\]\s*$/, "").replace(/^Introduction\s+/i, ""), 220) || null;
}

const toDate = (gmt) => (gmt ? new Date(`${gmt}Z`) : new Date());

// ---------- Images ----------
const siteHost = new URL(SITE).host;
const imageUrlsIn = (html) => [...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1]);

function sniffImageType(buf) {
  const ascii = (start, end) => buf.subarray(start, end).toString("latin1");
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "image/jpeg";
  if (ascii(0, 8) === "\x89PNG\r\n\x1a\n") return "image/png";
  if (ascii(0, 4) === "GIF8") return "image/gif";
  if (ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return "image/webp";
  if (ascii(4, 8) === "ftyp" && ["avif", "avis"].includes(ascii(8, 12))) return "image/avif";
  return null;
}

// Copies one image from the WordPress site into backend/uploads. Returns the new "/uploads/..." path.
async function downloadImage(url, authorId) {
  const u = new URL(url);
  if (u.host !== siteHost) throw new Error(`skipped (not on ${siteHost})`);

  // Already copied on an earlier run? Reuse it.
  const filenameFor = `wp-${path.basename(u.pathname).toLowerCase().replace(/[^a-z0-9._-]/g, "-").slice(-80)}`;
  const [known] = await pool.query("SELECT url FROM media WHERE filename = ? LIMIT 1", [filenameFor]);
  if (known.length && (await stat(path.join(UPLOAD_DIR, filenameFor)).catch(() => null))) return known[0].url;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length > MAX_IMAGE_BYTES) throw new Error("skipped (over 10 MB)");
  // Decide the type from the file's own bytes (some servers label images wrongly).
  // SVG is never copied: SVG files can contain scripts.
  const type = sniffImageType(buf);
  if (!type) throw new Error("skipped (not a JPG, PNG, GIF, WebP or AVIF image)");

  const filename = filenameFor;
  await writeFile(path.join(UPLOAD_DIR, filename), buf);
  const url2 = `/uploads/${filename}`;
  await pool.query(
    "INSERT INTO media (filename, original_name, mime_type, size, url, uploaded_by) VALUES (?, ?, ?, ?, ?, ?)",
    [filename, path.basename(u.pathname), type, buf.length, url2, authorId]
  );
  return url2;
}

// ---------- Main ----------
async function main() {
  console.log(`${APPLY ? "IMPORTING" : "DRY RUN (nothing will be changed — add --apply to import)"} from ${SITE}\n`);

  let authorId = null;
  if (args.author) {
    const [rows] = await pool.query("SELECT id, name FROM users WHERE email = ?", [String(args.author).toLowerCase()]);
    if (!rows.length) throw new Error(`No user with email ${args.author}. Create the account first.`);
    authorId = rows[0].id;
    console.log(`Author for imported posts: ${rows[0].name}\n`);
  } else {
    console.log("No --author given: posts will be imported without an author (you can set one later).\n");
  }

  const [wpCategories, wpPosts] = await Promise.all([getAll("categories"), getAll("posts?status=publish&_embed=wp:featuredmedia")]);

  // --- Categories (matched by slug) ---
  const catIdMap = new Map(); // WordPress id -> our id
  console.log("Categories:");
  for (const c of wpCategories) {
    const slug = slugify(c.slug) || slugify(decodeEntities(c.name));
    const [existing] = await pool.query("SELECT id FROM categories WHERE slug = ?", [slug]);
    if (existing.length) {
      catIdMap.set(c.id, existing[0].id);
      console.log(`  = ${decodeEntities(c.name)} (already exists)`);
    } else if (APPLY) {
      const [r] = await pool.query("INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)", [
        decodeEntities(c.name).slice(0, 100), slug, plainText(c.description) || null,
      ]);
      catIdMap.set(c.id, r.insertId);
      console.log(`  + ${decodeEntities(c.name)} (created)`);
    } else {
      console.log(`  + ${decodeEntities(c.name)} (would be created)`);
    }
  }
  if (APPLY) {
    // Second pass: parents
    for (const c of wpCategories) {
      if (c.parent && catIdMap.has(c.parent) && catIdMap.has(c.id)) {
        await pool.query("UPDATE categories SET parent_id = ? WHERE id = ? AND parent_id IS NULL", [catIdMap.get(c.parent), catIdMap.get(c.id)]);
      }
    }
  }

  // --- Posts ---
  console.log("\nPosts:");
  const summary = { created: 0, updated: 0, skipped: 0, images: 0, imageErrors: 0 };
  for (const p of wpPosts) {
    const title = decodeEntities(p.title.rendered).trim();
    const slug = slugify(p.slug);
    if (DEFAULT_SKIP.includes(slug) && !INCLUDE.has(slug)) {
      console.log(`  - SKIP  "${title}" (placeholder post; use --include=${slug} to import it)`);
      summary.skipped++;
      continue;
    }

    let content = cleanContent(p.content.rendered);
    const excerpt = makeExcerpt(content, p.excerpt.rendered);
    let featured = p._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
    const categoryIds = p.categories.map((id) => catIdMap.get(id)).filter(Boolean);
    const images = [...new Set([featured, ...imageUrlsIn(content)].filter(Boolean))];

    const [existing] = await pool.query("SELECT id FROM posts WHERE slug = ?", [slug]);
    const action = existing.length ? (UPDATE ? "UPDATE" : "SKIP") : "CREATE";
    const words = plainText(content).split(" ").filter(Boolean).length;
    console.log(`  ${action === "CREATE" ? "+" : action === "UPDATE" ? "~" : "="} ${action.padEnd(6)} "${title}"`);
    console.log(`      /blog/${slug} · ${words} words · ${images.length} image(s) · published ${toDate(p.date_gmt).toISOString().slice(0, 10)}`);
    if (action === "SKIP") {
      console.log("      (already imported — use --update to overwrite)");
      summary.skipped++;
      continue;
    }
    if (!APPLY) continue;

    // Optional: copy images to our own server and point the post at the copies
    if (DOWNLOAD_IMAGES) {
      for (const src of images) {
        try {
          const local = await downloadImage(src, authorId);
          content = content.split(`src="${src}"`).join(`src="${local}"`);
          if (featured === src) featured = local;
          summary.images++;
        } catch (err) {
          console.log(`      image ${path.basename(src)}: ${err.message}`);
          summary.imageErrors++;
        }
      }
    }

    const data = {
      title: title.slice(0, 255),
      slug,
      content,
      excerpt,
      featured_image: featured,
      status: "published",
      author_id: authorId,
      published_at: toDate(p.date_gmt),
      created_at: toDate(p.date_gmt),
      updated_at: toDate(p.modified_gmt),
    };

    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      let postId;
      if (action === "UPDATE") {
        postId = existing[0].id;
        await conn.query("UPDATE posts SET ? WHERE id = ?", [data, postId]);
        await conn.query("DELETE FROM post_categories WHERE post_id = ?", [postId]);
        summary.updated++;
      } else {
        const [r] = await conn.query("INSERT INTO posts SET ?", [data]);
        postId = r.insertId;
        summary.created++;
      }
      for (const cid of categoryIds) {
        await conn.query("INSERT IGNORE INTO post_categories (post_id, category_id) VALUES (?, ?)", [postId, cid]);
      }
      await conn.commit();
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }

  console.log(
    `\nDone${APPLY ? "" : " (dry run)"}: ${summary.created} created, ${summary.updated} updated, ${summary.skipped} skipped` +
      (DOWNLOAD_IMAGES ? `, ${summary.images} image(s) ready on this server, ${summary.imageErrors} image problem(s)` : "")
  );
  if (APPLY && !DOWNLOAD_IMAGES) {
    console.log("Images still load from the WordPress site. Run again with --update --download-images to copy them here.");
  }
}

main()
  .catch((err) => {
    console.error(`\nImport failed: ${err.message}`);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
