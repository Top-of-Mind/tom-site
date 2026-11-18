import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

const geist = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Top of Mind Labs — Four Playbooks to Make Portfolio Companies AI-First",
  description: "Four playbooks, run by AI researchers and engineers embedded in your portfolio company's team: AI-native software development, self-improving agent harnesses, computer-use agents, and AI-ready data infrastructure.",
  keywords: ["AI engineers", "AI researchers", "embedded AI team", "AI consulting", "machine learning", "enterprise AI", "data engineering", "LLM solutions", "AI implementation"],
  authors: [{ name: "Top of Mind Labs" }],
  openGraph: {
    title: "Top of Mind Labs — Four Playbooks to Make Portfolio Companies AI-First",
    description: "AI-native software development, self-improving agent harnesses, computer-use agents, and AI-ready data infrastructure, delivered by engineers embedded in your team.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Script
          src="https://visitor-id.prd.coffee.work/pixel?id=e3bc0916-241c-45a9-bb21-4e712ee17aec"
          strategy="afterInteractive"
          async
        />
      </body>
    </html>
  );
}
