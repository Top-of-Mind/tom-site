"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TriangleAlert } from "lucide-react";

// Five symptoms of the AI-era delivery bottleneck — one for each place the
// speedup goes to die: review, standards, CI, spend, and the codebase itself.
const problems = [
  "PRs sit in review for days. Reviewers rubber-stamp or block everything.",
  "Every engineer runs a different agent setup, and the codebase shows it.",
  "CI takes 20+ minutes, so agent speed turns into waiting.",
  "The AI bill keeps climbing and nobody can say what it bought.",
  "The codebase is getting harder to change, not easier.",
];

export default function SdlcProblem() {
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
          className="mb-12"
        >
          <p className="text-xs text-muted uppercase tracking-widest mb-3">The Problem</p>
          <h2 className="text-3xl md:text-5xl font-medium text-foreground tracking-tight mb-4 text-balance">
            Sound familiar?
          </h2>
        </motion.div>

        <div className="border-t border-[hsl(var(--border))]">
          {problems.map((p, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-5 py-6 border-b border-[hsl(var(--border))]"
            >
              <TriangleAlert className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
              <p className="text-foreground text-lg leading-relaxed">{p}</p>
            </motion.div>
          ))}
        </div>

        {/* The field evidence — the problem is industry-wide, not a you problem */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 text-muted text-[15px] leading-relaxed"
        >
          You&apos;re not alone. Teams with heavy AI adoption merged{" "}
          <span className="nums text-foreground font-medium">98%</span> more PRs, but review
          time rose <span className="nums text-foreground font-medium">91%</span>.{" "}
          <a
            href="https://www.faros.ai/blog/ai-software-engineering"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-4 decoration-[hsl(var(--border-strong))] hover:decoration-accent transition-colors"
          >
            Faros AI
          </a>
        </motion.p>
      </div>
    </section>
  );
}
