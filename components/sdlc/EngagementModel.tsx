"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Step {
  index: string;
  label: string;
  duration: string;
  text: string;
}

// A productized ladder, not a bespoke engagement: a time-boxed scan you keep,
// an install we run with you, and a watch we keep. The scan is the low-commitment
// entry point — everything after it is earned, not assumed.
const steps: Step[] = [
  {
    index: "01",
    label: "SDLC Scan",
    duration: "2 weeks",
    text: "We measure where time is lost today and hand you a ranked fix list. You keep the report and dashboard.",
  },
  {
    index: "02",
    label: "SDLC Install",
    duration: "8 weeks",
    text: "We put the fixes in place in your repos, CI and tools, and train your team to run them.",
  },
  {
    index: "03",
    label: "SDLC Watch",
    duration: "monthly",
    text: "We keep the setup current and report progress against your baseline every month.",
  },
];

export default function EngagementModel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-20 relative scroll-mt-16">
      <div className="absolute top-0 left-0 right-0 h-px bg-[hsl(var(--border))]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <p className="text-xs text-muted uppercase tracking-widest mb-3">How It Works</p>
          <h2 className="text-3xl md:text-5xl font-medium text-foreground tracking-tight mb-3 text-balance">
            Start with two weeks. Keep what you learn.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-surface rounded-xl border border-[hsl(var(--border))] p-7"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-accent-soft border border-[hsl(var(--accent-soft))] font-mono text-xs text-accent">
                  {step.index}
                </span>
                <span className="font-mono nums text-sm text-muted tracking-tight">
                  {step.duration}
                </span>
              </div>

              <h3 className="text-xl font-medium text-foreground mb-3">{step.label}</h3>
              <p className="text-muted text-[15px] leading-relaxed">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
