import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { mediaUrl } from "@/lib/media";
import { formatDate } from "@/utils/formatDate";
import styles from "./PostCard.module.css";

// Blog post preview. `featured` = large horizontal card (newest post).
export default function PostCard({ post, featured = false, headingLevel = 3 }) {
  const Heading = `h${headingLevel}`;
  const href = `/blog/${post.slug}`;

  return (
    <article className={`${styles.card} ${featured ? styles.featured : ""}`}>
      <div className={styles.cover} style={{ "--hue": (post.id * 47) % 360 }}>
        {post.featured_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={mediaUrl(post.featured_image)} alt="" loading={featured ? "eager" : "lazy"} />
        ) : (
          // No image: coloured cover with the category name
          <span className={styles.coverText} aria-hidden="true">
            {post.categories?.[0]?.name || "Insights"}
          </span>
        )}
      </div>

      <div className={styles.body}>
        {post.categories?.length > 0 && (
          <ul className={styles.categories} aria-label="Categories">
            {post.categories.slice(0, 2).map((c) => (
              <li key={c.id}>{c.name}</li>
            ))}
          </ul>
        )}

        <Heading className={styles.title}>
          {/* The link covers the whole card (see .title a::after) */}
          <Link href={href}>{post.title}</Link>
        </Heading>

        {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}

        <div className={styles.meta}>
          <span>
            <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
            {post.author_name && <> · {post.author_name}</>}
          </span>
          <span className={styles.read} aria-hidden="true">
            Read <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
    </article>
  );
}
