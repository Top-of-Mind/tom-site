"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

type Partner = {
  name: string;
  logo?: string;
  playbook: string;
  role: string;
};

// Partners named in the "Top of Mind Labs Playbooks" deck.
// H Company has no logo file yet: drop one at /images/partners/h-company.svg
// and set `logo` below to show it instead of the lettermark.
const partners: Partner[] = [
  { name: "Anthropic", logo: "/images/partners/anthropic.svg", playbook: "02", role: "Partner" },
  { name: "OpenAI", logo: "/images/partners/openai.svg", playbook: "02", role: "Partner" },
  { name: "Nous Research", logo: "/images/partners/nous-research.svg", playbook: "02", role: "Partner" },
  { name: "H Company", playbook: "03", role: "Delivery partner" },
  { name: "Snowflake", logo: "/images/partners/snowflake.svg", playbook: "04", role: "Partner" },
  { name: "Neo4j", logo: "/images/partners/neo4j.svg", playbook: "04", role: "Partner" },
];

export default function Partners() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="partners" className="py-20 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-[hsl(var(--border))]" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 max-w-2xl"
        >
          <p className="text-xs text-muted uppercase tracking-widest mb-3">Partners</p>
          <h2 className="text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-3">
            Built with the labs and platforms behind the playbooks
          </h2>
          <p className="text-muted text-sm leading-relaxed">
            Our engineers deliver each playbook on technology from the companies below.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="bg-surface rounded-xl border border-[hsl(var(--border))] hover:border-[hsl(var(--border-strong))] transition-colors duration-300 p-5 flex flex-col items-center text-center"
            >
              <div className="h-12 flex items-center justify-center mb-4">
                {partner.logo ? (
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    width={40}
                    height={40}
                    unoptimized
                    className="h-10 w-10 object-contain"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="h-10 w-10 rounded-md bg-foreground text-[hsl(var(--background))] flex items-center justify-center text-xl font-semibold"
                  >
                    {partner.name.charAt(0)}
                  </span>
                )}
              </div>
              <p className="text-base font-medium text-foreground">{partner.name}</p>
              <p className="text-xs text-muted mt-1">
                {partner.role} · Playbook {partner.playbook}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
