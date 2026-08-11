import type { Metadata } from "next";
import Header from "@/components/Header";
import CaseStudies from "@/components/CaseStudies";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Case Studies — Top of Mind Labs",
  description:
    "Agentic AI engagements across regulated, high-stakes workflows — tax, legal, municipal finance, benefits, field operations, healthcare, consumer goods, and private markets. See what we shipped, what it replaced, and the outcome.",
  openGraph: {
    title: "Case Studies — Top of Mind Labs",
    description:
      "Agentic AI engagements across regulated, high-stakes workflows. See what we shipped, what it replaced, and the outcome it drove.",
    type: "website",
  },
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <CaseStudies />
      <Contact />
      <Footer />
    </main>
  );
}
