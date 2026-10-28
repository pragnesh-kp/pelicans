import { SITE_URL } from "@/content/seo";

// /robots.txt: everything public may be crawled; the admin panel may not
export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
