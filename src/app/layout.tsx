import type { Metadata } from "next";
import { Archivo_Black, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-head",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const SITE_URL = "https://augie.my.id";

const SITE_TITLE = "Augie Aristito Sudiarto | Cyber Security Portfolio";
const SITE_DESCRIPTION =
  "Portfolio of Augie Aristito Sudiarto — Cybersecurity Engineering student, Full Stack Developer, Network Engineer, and AI/ML Enthusiast. Secure software, networking, and applied AI.";

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
      jobTitle: "Cybersecurity Engineering Student",
      knowsAbout: [
        "Cyber Security",
        "Full Stack Development",
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
    "full stack developer",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${archivoBlack.variable} ${spaceGrotesk.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground font-sans retro-pattern">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
