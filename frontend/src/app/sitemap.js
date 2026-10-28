import { absoluteUrl } from "@/content/seo";
import { allPagePaths, pageGroup } from "@/content/pages";
import { getPublishedPosts } from "@/lib/publicApi";

// /sitemap.xml: every public page and published blog post, so Google finds them all
export const revalidate = 3600;

const PRIORITY = { services: 0.9, hire: 0.8, technologies: 0.7, industries: 0.7, portfolio: 0.6, company: 0.5 };

// All published posts (the API returns at most 50 per page)
async function blogPosts() {
  const posts = [];
  try {
    for (let page = 1, pages = 1; page <= pages; page++) {
      const data = await getPublishedPosts({ page, limit: 50 });
      posts.push(...(data?.posts || []));
      pages = data?.pages || 1;
    }
  } catch {
    // Backend down: the sitemap still lists every other page
  }
  return posts;
}

export default async function sitemap() {
  const fixed = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.7 },
    { path: "/blog", priority: 0.6, changeFrequency: "weekly" },
  ];
  const pages = allPagePaths().map((path) => ({ path, priority: PRIORITY[pageGroup(path)] }));
  const posts = (await blogPosts()).map((p) => ({
    path: `/blog/${p.slug}`,
    priority: 0.6,
    lastModified: p.updated_at || p.published_at,
  }));

  return [...fixed, ...pages, ...posts].map(({ path, priority, changeFrequency = "monthly", lastModified }) => ({
    url: absoluteUrl(path),
    lastModified: lastModified ? new Date(lastModified) : undefined,
    changeFrequency,
    priority,
  }));
}
