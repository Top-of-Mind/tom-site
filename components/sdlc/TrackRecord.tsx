"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Credibility without logos: the names live in the copy itself, sized honestly
// (10-100 engineers) — same structure as Google and Block, right scale for you.
export default function TrackRecord() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-[hsl(var(--border))]" />

      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs text-muted uppercase tracking-widest mb-3">Track Record</p>
          <h2 className="text-3xl md:text-5xl font-medium text-foreground tracking-tight mb-4 text-balance">
            We&apos;ve built this structure at Google and Block.
          </h2>
          <p className="text-muted text-base leading-relaxed">
            Our engineers have led SDLC optimization at Google and Block — review flow, CI,
            quality gates and developer tooling at scale. We bring the same structure to your
            team, sized for companies with 10 to 100 engineers.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
