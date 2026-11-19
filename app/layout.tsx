import type { Metadata } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import "./globals.scss";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

const switzer = localFont({
  src: "./fonts/Switzer-Variable.woff2",
  variable: "--font-switzer",
  weight: "100 900",
});
// Not preloaded: mono is only used below the fold, so it must not compete with the hero text.
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: AI agents and data platforms, with your team in the loop`,
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
        <a href="#main" className="skip-link">
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
