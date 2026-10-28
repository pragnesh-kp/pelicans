import { notFound, permanentRedirect } from "next/navigation";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import JsonLd from "@/components/seo/JsonLd";
import { contentPageMetadata, contentPageJsonLd } from "@/content/seo";
import { getPage, pageSlugs } from "@/content/pages";
import { getPublishedPost } from "@/lib/publicApi";

// Top-level content pages keep their WordPress URLs: /hire-nodejs-developers,
// /laravel, /healthcare, /process, ... (/portfolio has its own route)
export function generateStaticParams() {
  return pageSlugs("/")
    .filter((slug) => slug !== "portfolio")
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return contentPageMetadata(`/${slug}`);
}

// Anything else at this level: old WordPress post links (/post-slug/) get a
// permanent (308) redirect to /blog/post-slug so visitors and Google rankings
// follow; the rest is a proper 404.
export default async function RootSlugPage({ params }) {
  const { slug } = await params;
  const page = getPage(`/${slug}`);
  if (page) {
    return (
      <>
        <JsonLd data={contentPageJsonLd(`/${slug}`)} />
        <BlockRenderer blocks={page.blocks} />
      </>
    );
  }

  const post = await getPublishedPost(slug).catch(() => null);
  if (post) permanentRedirect(`/blog/${post.slug}`);
  notFound();
}
