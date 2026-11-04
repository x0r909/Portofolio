import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JetBrains_Mono, VT323 } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { BuildLive } from "@/components/build-live";
import { CrtOverlay } from "@/components/crt-overlay";
import { BootScreen } from "@/components/boot-screen";
import { MatrixRain } from "@/components/matrix-rain";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

/* Display face for headings only — VT323 is a single-weight pixel-adjacent
   terminal face and falls apart below ~24px, so it never touches body copy. */
const vt323 = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

/* Body and code. Everything on the page is monospace by design. */
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://augie.my.id";

const SITE_TITLE = "Augie Aristito Sudiarto | Cyber Security Portfolio";
const SITE_DESCRIPTION =
  "Portfolio of Augie Aristito Sudiarto — Cybersecurity Engineering student, Network Engineer, and AI/ML Enthusiast. Secure software, networking, and applied AI.";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: SITE_TITLE,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: "id",
    },
    {
      "@type": "Person",
      name: "Augie Aristito Sudiarto",
      url: SITE_URL,
      email: "mailto:augie.aristitoazka@gmail.com",
      jobTitle: "Cybersecurity Engineering Student & COO Teknostudio",
      worksFor: {
        "@type": "Organization",
        name: "Teknostudio",
        url: "https://teknostudio.id",
      },
      knowsAbout: [
        "Cyber Security",
        "Network Engineering",
        "Artificial Intelligence",
        "Machine Learning",
      ],
      sameAs: [
        "https://github.com/x0r909",
        "https://linkedin.com/in/augiearistito",
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "cyber security",
    "portfolio",
    "augie aristito",
    "security engineering",
    "network engineer",
    "AI ML",
    "RetroUI",
  ],
  authors: [{ name: "Augie Aristito Sudiarto" }],
  creator: "Augie Aristito Sudiarto",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description:
      "Cybersecurity Engineering student portfolio — secure software, networking, and applied AI.",
    type: "website",
    url: "/",
    siteName: SITE_TITLE,
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  verification: {
    google: "googled0603f47ddea834e",
  },
};

/* Runs before first paint. It sets exactly two attributes and both are
   strictly opt-in, so the no-JS page is complete:

   `data-build="on"`  permits the live build to hide anything at all.
   `data-phosphor`    restores the saved accent before paint (no flash).

   Reduced motion and coarse pointers (touch, no hover) never arm the build:
   there is no way to skip it there, and a finger cannot chase a cursor.

   The boot screen is handled separately by `boot-screen.tsx`, which reads the
   session marker — it must not run on a repeat visit within the same tab. */
const BOOT_SCRIPT = `(function(){var d=document.documentElement,w=window;try{var t;try{t=localStorage.getItem("phosphor")}catch(e){}if(t==="amber"||t==="blue")d.setAttribute("data-theme",t);var m=matchMedia("(prefers-reduced-motion: reduce)").matches,c=matchMedia("(hover: none), (pointer: coarse)").matches;if(m||c)return;d.setAttribute("data-build","on");w.__buildWatchdog=setTimeout(function(){d.removeAttribute("data-build")},3000)}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${vt323.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
        {/* Belt to the gating's braces. Every build rule is scoped to
            `html[data-build="on"]`, which only the script above can set, so
            this should already be unreachable — but if anything ever sets that
            attribute by another route, the page must still be readable. */}
        <noscript>
          <style>{`[data-build]{opacity:1 !important;animation:none !important}.typewriter{width:auto !important;border-right:0 !important}`}</style>
        </noscript>
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <BootScreen />
          <CrtOverlay />
          <BuildLive />
          <MatrixRain />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}