import Link from "next/link";
import PageHero from "@/components/site/PageHero";
import PostCard from "@/components/site/blog/PostCard";
import Pagination from "@/components/site/Pagination";
import { getPublishedPosts } from "@/lib/publicApi";
import styles from "./blog.module.css";
import { seoMetadata, brandTitle } from "@/content/seo";

const PER_PAGE = 9;

export async function generateMetadata({ searchParams }) {
  const page = Number.parseInt((await searchParams).page, 10) || 1;
  if (page === 1) return seoMetadata("/blog");
  return { ...seoMetadata("/blog"), title: { absolute: brandTitle(`Blog – Page ${page}`) }, alternates: { canonical: `/blog?page=${page}` } };
}

export default async function BlogPage({ searchParams }) {
  const page = Math.max(1, Number.parseInt((await searchParams).page, 10) || 1);
  const { posts, pages, total } = await getPublishedPosts({ page, limit: PER_PAGE });

  // Newest post gets the big card on the first page
  const [featured, ...rest] = page === 1 ? posts : [null, ...posts];

  return (
    <>
      <PageHero
        eyebrow="Our Blog"
        title="Insights & ideas from our team"
        highlight="Insights & ideas"
        intro="Practical articles on software, AI, web and mobile development — written by the people who build it every day."
      />

      <section className={`section ${styles.section}`}>
        <div className="container">
          {total === 0 ? (
            <div className={styles.empty}>
              <h2>No articles yet</h2>
              <p>We&apos;re working on our first posts — check back soon.</p>
              <Link href="/contact" className="btn btn--dark">
                Talk to us in the meantime
              </Link>
            </div>
          ) : posts.length === 0 ? (
            <div className={styles.empty}>
              <h2>This page is empty</h2>
              <p>There are no more articles here.</p>
              <Link href="/blog" className="btn btn--dark">
                Back to the latest articles
              </Link>
            </div>
          ) : (
            <>
              {featured && (
                <div className={styles.featured}>
                  <PostCard post={featured} featured headingLevel={2} />
                </div>
              )}

              {rest.length > 0 && (
                <>
                  {featured && (
                    <h2 className={styles.heading}>
                      <span className="eyebrow">Latest</span>
                      More articles
                    </h2>
                  )}
                  <ul className={styles.grid} data-stagger>
                    {rest.map((post) => (
                      <li key={post.id}>
                        <PostCard post={post} headingLevel={featured ? 3 : 2} />
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <Pagination page={page} pages={pages} hrefFor={(p) => (p === 1 ? "/blog" : `/blog?page=${p}`)} />
            </>
          )}
        </div>
      </section>
    </>
  );
}
