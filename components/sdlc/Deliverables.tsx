"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { LucideIcon } from "lucide-react";
import { GitPullRequest, Terminal, Timer, ShieldCheck, Wallet } from "lucide-react";

interface Fix {
  icon: LucideIcon;
  title: string;
  text: string;
}

// Five fixes, one for each symptom in the section above — the delivery loop
// around the agent: how code gets reviewed, standardized, tested, gated and paid for.
const fixes: Fix[] = [
  {
    icon: GitPullRequest,
    title: "Review flow",
    text: "Smaller PRs, clear reviewer routing, stale-PR alerts and an AI first-pass reviewer.",
  },
  {
    icon: Terminal,
    title: "Agent standards",
    text: "One shared setup for every engineer's coding agent, whether it's Claude Code, Cursor or Codex.",
  },
  {
    icon: Timer,
    title: "Fast CI, test-first",
    text: "CI cut to minutes, and agents write a failing test before they write code.",
  },
  {
    icon: ShieldCheck,
    title: "Quality and security gates",
    text: "Security scans, dependency checks and duplication checks on every PR.",
  },
  {
    icon: Wallet,
    title: "Spend control",
    text: "Every AI request routed to the right model, with cost visible per team.",
  },
];

export default function Deliverables() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="fixes" className="py-20 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-[hsl(var(--border))]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <p className="text-xs text-muted uppercase tracking-widest mb-3">What We Fix</p>
          <h2 className="text-3xl md:text-5xl font-medium text-foreground tracking-tight mb-3">
            What we put in place
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fixes.map((f, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`bg-surface rounded-xl border border-[hsl(var(--border))] hover:border-[hsl(var(--border-strong))] hover:shadow-sm transition-all duration-400 p-7 ${
                index === fixes.length - 1 ? "md:col-span-2" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-accent-soft border border-[hsl(var(--accent-soft))] flex items-center justify-center mb-5">
                <f.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">{f.title}</h3>
              <p className="text-muted text-[15px] leading-relaxed max-w-2xl">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
