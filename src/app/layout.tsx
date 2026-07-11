import type { Metadata } from "next";
import { Inter, Orbitron, Space_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "Augie Aristito Sudiarto | Cyber Security Portfolio",
  description:
    "Portfolio website of Augie Aristito Sudiarto, a Cyber Security Engineering student at Politeknik Negeri Cilacap. Retro-cyber style portfolio showcasing projects and skills.",
  keywords: [
    "cyber security",
    "portfolio",
    "retro cyber",
    "augie aristito",
    "security engineering",
    "web development",
  ],
  openGraph: {
    title: "Augie Aristito Sudiarto | Cyber Security Portfolio",
    description: "Retro-cyber style portfolio showcasing projects and skills.",
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
      lang="en"
      className={`${inter.variable} ${orbitron.variable} ${spaceMono.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-cyber-bg text-white grid-bg relative overflow-x-hidden">
        {/* Scan line effect */}
        <div className="fixed top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-20 animate-scan-line -z-10"></div>

        {/* Grid overlay */}
        <div className="fixed inset-0 pointer-events-none -z-20 opacity-5 grid-bg"></div>

        {/* Gradient background */}
        <div className="fixed inset-0 bg-gradient-to-br from-cyber-bg via-cyber-surface to-cyber-bg -z-30"></div>

        {/* Matrix rain effect (background only) */}
        <div className="fixed inset-0 pointer-events-none -z-40 opacity-5">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0 text-cyber-green font-mono text-xs animate-matrix-rain"
              style={{
                left: `${(i * 5) % 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${5 + (i % 3)}s`,
              }}
            >
              {Array.from({ length: 30 }).map((_, j) => (
                <div key={j} className="opacity-70">
                  {String.fromCharCode(48 + ((i * j) % 74))}
                </div>
              ))}
            </div>
          ))}
        </div>

        <Navigation />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
