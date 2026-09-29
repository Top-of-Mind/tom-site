import type { Metadata } from "next";
import Header from "@/components/Header";
import SdlcHero from "@/components/sdlc/SdlcHero";
import SdlcProblem from "@/components/sdlc/SdlcProblem";
import TrackRecord from "@/components/sdlc/TrackRecord";
import Deliverables from "@/components/sdlc/Deliverables";
import EngagementModel from "@/components/sdlc/EngagementModel";
import WhatWeMeasure from "@/components/sdlc/WhatWeMeasure";
import SdlcCta from "@/components/sdlc/SdlcCta";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Software Dev Lifecycle — Fix AI-Era Code Review and Delivery | Top of Mind Labs",
  description:
    "AI made your team faster at writing code. Now it's stuck in review. We fix the delivery system behind your coding agents — review, CI, quality gates and AI spend — so the code actually ships. Built by engineers who've done this at Google and Block.",
  keywords: [
    "SDLC",
    "software dev lifecycle",
    "code review",
    "CI",
    "coding agents",
    "AI spend",
    "developer productivity",
    "engineering delivery",
    "Claude Code",
    "Cursor",
    "Codex",
  ],
  openGraph: {
    title: "Software Dev Lifecycle — Fix AI-Era Code Review and Delivery | Top of Mind Labs",
    description:
      "AI made your team faster at writing code. Now it's stuck in review. We fix the delivery system behind your coding agents.",
    type: "website",
  },
};

export default function SdlcPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <SdlcHero />
      <SdlcProblem />
      <TrackRecord />
      <Deliverables />
      <EngagementModel />
      <WhatWeMeasure />
      <SdlcCta />
      <Contact source="tom-sdlc" />
      <Footer />
    </main>
  );
}
