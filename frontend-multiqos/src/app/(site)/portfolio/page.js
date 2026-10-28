import BlockRenderer from "@/components/blocks/BlockRenderer";
import JsonLd from "@/components/seo/JsonLd";
import { contentPageMetadata, contentPageJsonLd } from "@/content/seo";
import { getPage } from "@/content/pages";

const page = getPage("/portfolio");

export const metadata = contentPageMetadata("/portfolio");

export default function PortfolioPage() {
  return (
    <>
      <JsonLd data={contentPageJsonLd("/portfolio")} />
      <BlockRenderer blocks={page.blocks} />
    </>
  );
}
