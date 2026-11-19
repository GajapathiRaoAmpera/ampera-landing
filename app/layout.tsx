import type { Metadata } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

const switzer = localFont({
  src: "./fonts/Switzer-Variable.woff2",
  variable: "--font-switzer",
  weight: "100 900",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: AI agents that turn your data into decisions`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: { siteName: site.name, type: "website" },
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  email: site.email,
  sameAs: [site.linkedin],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${switzer.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-pill focus:bg-purple focus:px-5 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
      </body>
    </html>
  );
}
