import NotFoundContent from "@/components/site/NotFoundContent";

export const metadata = { title: "Page not found" };

// 404 inside the website (Header + Footer come from the (site) layout)
export default function SiteNotFound() {
  return <NotFoundContent />;
}
