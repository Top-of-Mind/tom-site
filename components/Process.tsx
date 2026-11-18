"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Compass, PencilRuler, Hammer, Rocket, GraduationCap, LineChart } from "lucide-react";

const phases = [
  {
    index: "01",
    weeks: "Weeks 1–3",
    title: "Align & Design",
    description:
      "Before any code, we pin down what success looks like and what's in the way. We audit your data and integrations, pick the metrics leadership will actually judge this on, and design the system.",
    items: [
      { icon: Compass, name: "Alignment", text: "We set the metrics leadership will judge the work by, and audit what your data and integrations actually support." },
      { icon: PencilRuler, name: "Design", text: "We design the system architecture and integration plan against those metrics." },
    ],
  },
  {
    index: "02",
    weeks: "Weeks 4–8",
    title: "Build & Deploy",
    description:
      "We build in a sandbox with tests and an eval suite gated into the pipeline, then ship to production with monitoring and guardrails — so it holds up under real traffic and real edge cases, not just the demo.",
    items: [
      { icon: Hammer, name: "Build", text: "We build in a sandbox with tests and an eval suite gated into the pipeline." },
      { icon: Rocket, name: "Deploy", text: "We ship to production with monitoring, guardrails, and a rollback path." },
    ],
  },
  {
    index: "03",
    weeks: "Weeks 9–12",
    title: "Transfer & Optimize",
    description:
      "We hand over the docs, runbooks, and eval suite, train your team to run it, then stay on to tune against real usage — so your people own it after we leave.",
    items: [
      { icon: GraduationCap, name: "Transfer", text: "We hand over docs, runbooks, and the eval suite, and train your team to run the system." },
      { icon: LineChart, name: "Optimize", text: "We tune against real usage and hand over the dashboards your team will watch." },
    ],
  },
];

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-20 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-[hsl(var(--border))]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <p className="text-xs text-muted uppercase tracking-widest mb-3">How We Work</p>
          <h2 className="text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-3">
            Twelve weeks from kickoff to a system your team owns
          </h2>
          <p className="text-muted text-sm leading-relaxed">
            Every engagement runs the same arc — stand up the foundation, build to production, then hand it over. The shape holds; the scope flexes to what you&apos;re building.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-surface rounded-xl border border-[hsl(var(--border))] p-6 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-accent-soft border border-[hsl(var(--accent-soft))] font-mono text-xs text-accent">
                  {phase.index}
                </span>
                <span className="font-mono nums text-sm text-muted tracking-tight">
                  {phase.weeks}
                </span>
              </div>

              <h3 className="text-lg font-medium text-foreground mb-2">
                {phase.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-5">
                {phase.description}
              </p>

              <div className="mt-auto border-t border-[hsl(var(--border))]">
                {phase.items.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 py-4 ${
                      i < phase.items.length - 1 ? "border-b border-[hsl(var(--border))]" : ""
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-accent-soft border border-[hsl(var(--accent-soft))] flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-medium text-foreground mb-0.5">
                        {item.name}
                      </h4>
                      <p className="text-muted text-[13px] leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
