import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PostCard from "@/components/site/blog/PostCard";
import { getPublishedPosts } from "@/lib/publicApi";
import { BlockHeading } from "./parts";
import styles from "./BlogPosts.module.css";

// Latest three blog posts from the admin panel. Shows nothing if the API is down or there are no posts.
export default async function BlogPosts({ heading = { text: "Latest Insights" }, intro = [], tone }) {
  const data = await getPublishedPosts({ limit: 3 }).catch(() => null);
  if (!data?.posts?.length) return null;
  return (
    <section className={`section ${tone === "alt" ? "section--alt" : ""}`}>
      <div className="container">
        <BlockHeading eyebrow="Our Blog" heading={heading} intro={intro} />
        <ul className={styles.grid} data-stagger>
          {data.posts.map((post) => (
            <li key={post.id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
        <div className={styles.all}>
          <Link href="/blog" className="btn">
            Explore All Blogs <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
