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

export const metadata: Metadata = {
  title: "Augie Aristito Sudiarto | Cyber Security Portfolio",
  description:
    "Portfolio of Augie Aristito Sudiarto — Cybersecurity Engineering student, Full Stack Developer, Network Engineer, and AI/ML Enthusiast. Secure software, networking, and applied AI.",
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
  openGraph: {
    title: "Augie Aristito Sudiarto | Cyber Security Portfolio",
    description:
      "Cybersecurity Engineering student portfolio — secure software, networking, and applied AI.",
    type: "website",
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
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
