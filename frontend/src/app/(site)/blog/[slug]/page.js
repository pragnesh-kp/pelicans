import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import PostCard from "@/components/site/blog/PostCard";
import CtaBanner from "@/components/site/CtaBanner";
import { getPublishedPost, getPublishedPosts } from "@/lib/publicApi";
import { mediaUrl, expandMediaUrls } from "@/lib/media";
import { formatDate } from "@/utils/formatDate";
import { stripHtml, truncate, readingTime } from "@/utils/text";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL, breadcrumbJsonLd, brandTitle, clip } from "@/content/seo";
import styles from "./post.module.css";

const describe = (post) => clip(post.excerpt || truncate(stripHtml(post.content), 160));

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) return { title: "Article not found" };

  const description = describe(post);
  const image = post.featured_image ? mediaUrl(post.featured_image) : undefined;

  return {
    title: { absolute: brandTitle(post.title) },
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url: `/blog/${post.slug}`,
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      authors: post.author_name ? [post.author_name] : undefined,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: { card: image ? "summary_large_image" : "summary", title: post.title, description },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  const { posts: latest } = await getPublishedPosts({ limit: 4 });
  const morePosts = latest.filter((p) => p.id !== post.id).slice(0, 3);
  const minutes = readingTime(post.content);
  const image = post.featured_image ? mediaUrl(post.featured_image) : null;
  // Don't show the summary under the title if it just repeats the article's opening
  const opening = stripHtml(post.content).slice(0, 400);
  const showLead = post.excerpt && !opening.includes(post.excerpt.replace(/…$/, "").slice(0, 80));

  // Structured data so search engines understand this is an article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: describe(post),
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: post.author_name ? { "@type": "Person", name: post.author_name } : undefined,
    publisher: { "@id": `${SITE_URL}/#organization` },
    image: image || undefined,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <>
      <JsonLd
        data={[
          jsonLd,
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <article>
        <header className={`${styles.hero} ${image ? styles.heroWithImage : ""}`}>
          <div className={`container ${styles.narrow}`}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <ol>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
                <li aria-current="page">{truncate(post.title, 40)}</li>
              </ol>
            </nav>

            {post.categories?.length > 0 && (
              <ul className={styles.categories} aria-label="Categories">
                {post.categories.map((c) => (
                  <li key={c.id}>{c.name}</li>
                ))}
              </ul>
            )}

            <h1 className={styles.title}>{post.title}</h1>
            {showLead && <p className={styles.lead}>{post.excerpt}</p>}

            <div className={styles.meta}>
              {post.author_name && (
                <span className={styles.author}>
                  <span className={styles.avatar} aria-hidden="true">
                    {post.author_name[0]}
                  </span>
                  {post.author_name}
                </span>
              )}
              <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
              <span className={styles.reading}>
                <Clock size={16} aria-hidden="true" /> {minutes} min read
              </span>
            </div>
          </div>
        </header>

        {image && (
          <figure className={`container ${styles.figure}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt="" />
          </figure>
        )}

        <div className={`container ${styles.narrow} ${styles.bodyWrap}`}>
          {/* Post HTML is cleaned by the backend when it is saved (only safe tags are kept) */}
          <div className={styles.prose} dangerouslySetInnerHTML={{ __html: expandMediaUrls(post.content || "") }} />

          <footer className={styles.footer}>
            {post.updated_at && formatDate(post.updated_at) !== formatDate(post.published_at) && (
              <p className={styles.updated}>Last updated {formatDate(post.updated_at)}</p>
            )}
            <Link href="/blog" className={styles.back}>
              <ArrowLeft size={18} aria-hidden="true" /> Back to all articles
            </Link>
          </footer>
        </div>
      </article>

      {morePosts.length > 0 && (
        <section className={`section section--alt ${styles.more}`} aria-labelledby="more-heading">
          <div className="container">
            <h2 id="more-heading" className={styles.moreTitle}>
              More from the blog
            </h2>
            <ul className={styles.moreGrid}>
              {morePosts.map((p) => (
                <li key={p.id}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBanner />
    </>
  );
}
