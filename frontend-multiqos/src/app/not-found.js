import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NotFoundContent from "@/components/site/NotFoundContent";

export const metadata = { title: "Page not found" };

// 404 for addresses outside every route (e.g. /some/unknown/path)
export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <NotFoundContent />
      </main>
      <Footer />
    </>
  );
}
