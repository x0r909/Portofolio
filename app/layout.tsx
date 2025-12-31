import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Augie Aristito Sudiarto | Portfolio",
  description:
    "Portfolio Augie Aristito Sudiarto - Rekayasa Keamanan Siber, jaringan, dan blue team cybersecurity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen overflow-x-hidden`}
      >
        <div className="grid-overlay" />
        <div className="noise-overlay" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
