import { notFound } from "next/navigation";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import JsonLd from "@/components/seo/JsonLd";
import { contentPageMetadata, contentPageJsonLd } from "@/content/seo";
import { getPage, pageSlugs } from "@/content/pages";

// One page per case study: /portfolio/slay-coffee-online-store, ...
export const dynamicParams = false;

export function generateStaticParams() {
  return pageSlugs("/portfolio/").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return contentPageMetadata(`/portfolio/${slug}`);
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const page = getPage(`/portfolio/${slug}`);
  if (!page) notFound();
  return (
    <>
      <JsonLd data={contentPageJsonLd(`/portfolio/${slug}`)} />
      <BlockRenderer blocks={page.blocks} />
    </>
  );
}
