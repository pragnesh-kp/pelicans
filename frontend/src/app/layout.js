import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/content/seo";

// Brand font (self-hosted by Next.js at build time)
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Pelicans Technologies – Custom Software & AI Development",
    template: "%s | Pelicans Technologies",
  },
  description:
    "Pelicans Technologies builds AI-powered custom software, web and mobile apps for startups and global enterprises.",
};

export const viewport = {
  themeColor: "#000000",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>{children}</body>
    </html>
  );
}
