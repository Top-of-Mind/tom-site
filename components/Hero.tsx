"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import Link from "next/link";

// Outcome deltas drawn from real engagements (see /case-studies Results Dossier).
const stats = [
  {
    domain: "Tax Advisory",
    before: "4 hrs",
    after: "10 min",
    label: "Multi-year scenario modeling",
  },
  {
    domain: "Government",
    before: "3 mo",
    after: "2 wks",
    label: "Financial report production",
  },
  {
    domain: "Benefits & HR",
    before: "1.5 hrs",
    after: "30 sec",
    label: "RFP census processing",
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Warm grid background */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(hsl(28 10% 50%) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(28 10% 50%) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />
      {/* Soft warm glow top-left */}
      <div className="absolute -top-40 -left-32 w-[40rem] h-[40rem] rounded-full bg-accent-soft blur-3xl opacity-60 pointer-events-none" />
      {/* Top fade into grid */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[hsl(var(--background))] to-transparent z-[1]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-9"
        >
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-medium leading-[1.05] tracking-tight text-balance max-w-4xl"
          >
            <span className="text-foreground">Turning portfolio companies</span>
            <br />
            <span className="text-muted">into AI-first companies.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-lg text-muted max-w-2xl leading-relaxed"
          >
            Four playbooks, run by AI researchers and engineers embedded in your portfolio company&apos;s team.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-7 py-3.5 rounded-lg font-medium text-sm hover:bg-accent-hover transition-all duration-300"
            >
              Talk to our team
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
            </Link>
            <Link
              href="#playbooks"
              className="inline-flex items-center justify-center gap-2 text-foreground px-7 py-3.5 rounded-lg font-medium text-sm border border-[hsl(var(--border-strong))] hover:border-[hsl(var(--muted))] hover:bg-surface transition-all duration-300"
            >
              See the four playbooks
            </Link>
          </motion.div>

          {/* Dashboard stat tiles — proof before you scroll */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="pt-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <p className="text-xs uppercase tracking-[0.24em] text-muted">
                Proof, not promises
              </p>
              <span className="h-px flex-1 bg-[hsl(var(--border))]" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl">
              {stats.map((s, index) => (
                <div
                  key={index}
                  className="group rounded-xl border border-[hsl(var(--border))] bg-surface px-5 py-4 hover:border-[hsl(var(--border-strong))] transition-colors duration-300"
                >
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted mb-3">
                    {s.domain}
                  </p>
                  <p className="font-mono nums text-foreground text-xl leading-none tracking-tight mb-3">
                    <span className="text-muted line-through decoration-1">{s.before}</span>
                    <ArrowRight className="inline w-4 h-4 mx-2 text-accent align-middle" />
                    <span className="text-foreground">{s.after}</span>
                  </p>
                  <p className="text-[13px] leading-snug text-muted">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="hidden sm:flex items-center gap-2 text-muted text-xs pt-4"
          >
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            <span className="uppercase tracking-[0.2em]">Scroll to explore</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
