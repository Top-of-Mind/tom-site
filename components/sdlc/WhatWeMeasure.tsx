"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// The signature of this page: one instrument panel instead of scattered stats.
// A readout you'd actually ship — each cell a committed target, set in tabular
// numerals so the digits line up like a dashboard. The fine print below keeps
// the claim honest: targets depend on where you start.
const targets = [
  { label: "PR merges", value: "50%", note: "faster" },
  { label: "Review pickup", value: "4", note: "hrs or less" },
  { label: "CI time", value: "10", note: "min or less" },
];

export default function WhatWeMeasure() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-[hsl(var(--border))]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <p className="text-xs text-muted uppercase tracking-widest mb-3">What We Measure</p>
          <h2 className="text-3xl md:text-5xl font-medium text-foreground tracking-tight mb-3">
            Numbers, not opinions
          </h2>
          <p className="text-muted text-base leading-relaxed">
            We baseline your team in week one, then report against it: PR merge time, review
            wait time, CI time, PR size, rework rate and AI spend per team.
          </p>
        </motion.div>

        {/* Readout panel — three committed targets, one surface */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-[hsl(var(--border-strong))] bg-surface-raised overflow-hidden"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[hsl(var(--border-strong))]">
            {targets.map((t, index) => (
              <div key={index} className="px-8 py-9">
                <p className="font-mono text-xs uppercase tracking-widest text-muted mb-4">
                  {t.label}
                </p>
                <p className="nums text-5xl font-medium text-foreground tracking-tight">
                  {t.value}
                </p>
                <p className="text-sm text-muted mt-2">{t.note}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-sm text-muted leading-relaxed max-w-2xl"
        >
          Typical targets are 50% faster PR merges, reviews picked up within 4 hours and CI
          under 10 minutes. Results depend on your starting point.
        </motion.p>
      </div>
    </section>
  );
}
