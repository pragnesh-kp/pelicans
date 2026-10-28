import { Manrope } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/content/seo";

// Brand font (self-hosted by Next.js at build time)
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

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
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
