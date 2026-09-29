"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SdlcCta() {
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
          className="relative overflow-hidden rounded-2xl border border-[hsl(var(--border-strong))] bg-surface px-6 py-16 md:py-24 text-center"
        >
          {/* Soft warm glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-accent-soft blur-3xl opacity-60 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-medium text-foreground tracking-tight mb-5 text-balance">
              Find out where your delivery is stuck.
            </h2>
            <p className="text-muted text-base leading-relaxed mb-9">
              Two weeks. A baseline you keep. A ranked list of what to fix.
            </p>

            <Link
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-lg font-medium text-sm hover:bg-accent-hover transition-all duration-300"
            >
              Book an SDLC Scan
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
