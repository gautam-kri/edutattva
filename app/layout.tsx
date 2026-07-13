import type { Metadata } from "next";
import { Archivo, Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});
const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.edutattva.com"),
  title: {
    default: "Edutattva Classes — IIT-JEE | NEET | Foundation Coaching in Chennai",
    template: "%s · Edutattva Classes",
  },
  description:
    "Edutattva Classes — IIT-JEE, NEET & Foundation coaching in Chennai (Siruseri & Kelambakkam). Mentorship-driven, systems-led preparation with 80+ years of combined faculty experience. Quality at an affordable fee.",
  keywords: [
    "IIT-JEE coaching Chennai",
    "NEET coaching Siruseri",
    "Foundation classes Kelambakkam",
    "Edutattva Classes",
    "JEE NEET Chennai",
  ],
  openGraph: {
    title: "Edutattva Classes — Where Fundamentals Become Excellence",
    description:
      "IIT-JEE | NEET | Foundation programs for Class 6–12 in Chennai. Real mentorship, powerful testing and quality at an affordable fee.",
    url: "/",
    siteName: "Edutattva Classes",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Edutattva Classes — Where Fundamentals Become Excellence",
    description: "IIT-JEE | NEET | Foundation programs for Class 6–12 in Chennai.",
  },
  manifest: "/favicons/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/favicons/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicons/favicon.ico"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${barlow.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
