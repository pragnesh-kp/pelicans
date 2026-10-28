import { Poppins, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/content/seo";

// Fonts (self-hosted by Next.js at build time):
//   Poppins          — everything
//   Instrument Serif — the italic accent words in big headings
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

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
    <html lang="en" className={`${poppins.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
