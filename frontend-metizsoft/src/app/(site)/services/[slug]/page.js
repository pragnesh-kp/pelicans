import { notFound } from "next/navigation";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import JsonLd from "@/components/seo/JsonLd";
import { contentPageMetadata, contentPageJsonLd } from "@/content/seo";
import { getPage, pageSlugs, pageSection } from "@/content/pages";

// One page per service: /services/ai-ml-development, /services/web-development, ...
export const dynamicParams = false;

export function generateStaticParams() {
  return pageSlugs("/services/").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return contentPageMetadata(`/services/${slug}`);
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const page = getPage(`/services/${slug}`);
  if (!page) notFound();
  return (
    <>
      <JsonLd data={contentPageJsonLd(`/services/${slug}`)} />
      <BlockRenderer blocks={page.blocks} kicker={pageSection(`/services/${slug}`)?.name || "Pelicans Technologies"} />
    </>
  );
}
