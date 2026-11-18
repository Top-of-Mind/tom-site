"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import {
  Code2,
  Repeat,
  MousePointerClick,
  Network,
  ArrowRight,
  X,
  CheckCircle,
  Target,
  type LucideIcon,
} from "lucide-react";

type Playbook = {
  index: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  valueLever: string;
  outcomes: string[];
  bestFit: string[];
  detailHeading: string;
  details: { name: string; text: string }[];
  partnerLabel?: string;
  partners?: string[];
  link?: { href: string; label: string };
};

// Content mirrors the "Top of Mind Labs Playbooks" deck (slides 2–7 and 12).
const playbooks: Playbook[] = [
  {
    index: "01",
    icon: Code2,
    title: "AI-native software development",
    tagline: "Engineering teams that ship more with the people they already have.",
    description:
      "We roll out coding agents across the development lifecycle and train your engineers to run them.",
    valueLever: "Higher quality software, faster product roadmap, lower cost",
    outcomes: ["Higher-quality code", "Faster feature development", "Lower cost to build"],
    bestFit: [
      "The roadmap is capped by engineering capacity",
      "Legacy code slows every release",
    ],
    detailHeading: "What we put in place",
    details: [
      {
        name: "Processes",
        text: "A short plan is agreed before any AI writes code. Work ships in small, tested pieces, and a person approves every change.",
      },
      {
        name: "Skills and shared context",
        text: "The team's best practices captured once and reused by everyone. Routine tasks automated.",
      },
      {
        name: "Tooling",
        text: "AI reviewers check every change. AI works in a safe, isolated environment, with one controlled entry point for AI models and tools.",
      },
      {
        name: "Measurements",
        text: "A baseline taken in week one, and a live dashboard of speed, quality and cost.",
      },
    ],
    link: { href: "/sdlc", label: "Read the full playbook" },
  },
  {
    index: "02",
    icon: Repeat,
    title: "Self-improving agent harnesses",
    tagline: "Expert work done by agents that get better every week they run.",
    description:
      "We build self-improving agent harnesses for knowledge workers: agents that learn from your experts' corrections.",
    valueLever: "Unlock revenue, reduce operating cost with reliable automation",
    outcomes: [
      "Processes that unlock revenue",
      "Time saved for your teams",
      "Lower operating cost",
    ],
    bestFit: [
      "Revenue is held back by how much expert work gets done",
      "The work is repeatable but needs judgment",
    ],
    detailHeading: "How we build it",
    details: [
      {
        name: "1. Build the eval set from history",
        text: "Turn past cases with known outcomes into an eval set, plus a held-out test split.",
      },
      {
        name: "2. Write a plain first SOP as a prompt",
        text: "State the task and goal plainly; strip legacy rituals and prompt debt.",
      },
      {
        name: "3. Hill-climb against the eval set",
        text: "Tune prompts and tool descriptions first, then reasoning effort, model choice and caching.",
      },
      {
        name: "4. Validate, then harden for deployment",
        text: "Confirm gains on the held-out split; add a sandbox, an append-only log and a credential vault.",
      },
    ],
    partnerLabel: "In partnership with",
    partners: ["Anthropic", "OpenAI", "Nous Research"],
  },
  {
    index: "03",
    icon: MousePointerClick,
    title: "Computer-use agents",
    tagline: "Agents that do the work on any screen, the way your people do.",
    description:
      "We automate work by operating any software through its screen like a human would, across web, desktop and legacy apps without integrations.",
    valueLever: "Lower cost per process, without an integration project",
    outcomes: [
      "Tasks done end to end, on any app",
      "No integrations to build",
      "Lower cost per task at scale",
    ],
    bestFit: [
      "Core systems have no usable API",
      "Staff re-key data between systems and portals",
    ],
    detailHeading: "Delivered by our engineers on H Company's technology",
    details: [
      {
        name: "No integrations needed",
        text: "Works through the screen of the software you already have.",
      },
      {
        name: "Less brittle than scripts",
        text: "Keeps working when a screen changes, where a script would break.",
      },
      {
        name: "Specialized, cheaper models",
        text: "H Company reports better results than larger models, at lower cost.",
      },
      {
        name: "Enterprise and sovereignty",
        text: "European, GDPR, SOC 2 Type II, ISO 27001. Our engineers deliver.",
      },
    ],
    partnerLabel: "Delivery partner of",
    partners: ["H Company"],
  },
  {
    index: "04",
    icon: Network,
    title: "AI-ready data infrastructure",
    tagline: "A brain for your enterprise, built on all of your company's data.",
    description:
      "Knowledge graphs and ontologies that let any user or agent draw on the company's data at the moment they need it.",
    valueLever: "A baseline data foundation for AI work",
    outcomes: [
      "One brain for all company data",
      "Answers whenever a user asks",
      "A base every agent can use",
    ],
    bestFit: [
      "Every new question needs a new mart or pipeline",
      "The same entity lives under different IDs in different systems",
    ],
    detailHeading: "Our process",
    details: [
      {
        name: "What we do",
        text: "Match up records so each customer, supplier or product appears once. Map how the business fits together, so AI understands it. Build on the data systems you already have.",
      },
      {
        name: "What you keep",
        text: "One connected, trusted view of company data. Conflicting sources kept visible, not silently overwritten. Documentation and trained internal owners.",
      },
    ],
    partnerLabel: "In partnership with",
    partners: ["Snowflake", "Neo4j"],
  },
];

function PlaybookCard({
  playbook,
  index,
  onLearnMore,
}: {
  playbook: Playbook;
  index: number;
  onLearnMore: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <div className="relative bg-surface rounded-xl p-6 border border-[hsl(var(--border))] hover:border-[hsl(var(--border-strong))] hover:shadow-sm transition-all duration-500 h-full flex flex-col">
        <div className="flex items-center justify-between mb-5">
          <div className="w-10 h-10 rounded-lg bg-accent-soft border border-[hsl(var(--accent-soft))] flex items-center justify-center">
            <playbook.icon className="w-5 h-5 text-accent" />
          </div>
          <span className="font-mono nums text-xs text-muted tracking-widest">
            PLAYBOOK {playbook.index}
          </span>
        </div>

        <h3 className="text-lg font-medium text-foreground mb-2">{playbook.title}</h3>
        <p className="text-foreground text-sm leading-relaxed mb-2">{playbook.tagline}</p>
        <p className="text-muted text-sm leading-relaxed mb-5">{playbook.description}</p>

        <div className="border-t border-[hsl(var(--border))] pt-4 mb-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted mb-2.5">
            What you get
          </p>
          <ul className="space-y-1.5">
            {playbook.outcomes.map((outcome) => (
              <li key={outcome} className="flex items-start gap-2.5 text-sm text-foreground">
                <span className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
          {playbook.partners ? (
            <p className="text-xs text-muted">
              {playbook.partnerLabel}{" "}
              <span className="text-foreground">{playbook.partners.join(" · ")}</span>
            </p>
          ) : (
            <span />
          )}
          <button
            onClick={onLearnMore}
            className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors duration-300 group/btn"
          >
            Learn more
            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function PlaybookModal({
  playbook,
  isOpen,
  onClose,
}: {
  playbook: Playbook | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!playbook) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[hsl(var(--foreground)/0.45)] backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-surface rounded-xl border border-[hsl(var(--border-strong))] w-full max-w-2xl max-h-[85vh] overflow-y-auto my-8 shadow-xl"
          >
            <div className="sticky top-0 bg-surface border-b border-[hsl(var(--border))] p-6 z-10">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-accent-soft border border-[hsl(var(--accent-soft))] flex items-center justify-center flex-shrink-0">
                    <playbook.icon className="w-4 h-4 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] text-muted tracking-widest">
                      PLAYBOOK {playbook.index} / 04
                    </p>
                    <h3 className="text-base font-medium text-foreground">{playbook.title}</h3>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="text-muted hover:text-foreground transition-colors p-2 hover:bg-surface-raised rounded-lg flex-shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <p className="text-foreground text-sm leading-relaxed mb-2">{playbook.tagline}</p>
                <p className="text-muted text-sm leading-relaxed">{playbook.description}</p>
              </div>

              <div>
                <h4 className="text-xs font-medium text-muted uppercase tracking-widest mb-3 flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-accent" />
                  {playbook.detailHeading}
                </h4>
                <div className="border-t border-[hsl(var(--border))]">
                  {playbook.details.map((detail) => (
                    <div key={detail.name} className="py-3 border-b border-[hsl(var(--border))]">
                      <p className="text-sm font-medium text-foreground mb-0.5">{detail.name}</p>
                      <p className="text-muted text-[13px] leading-relaxed">{detail.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-surface-raised rounded-lg p-4 border border-[hsl(var(--border))]">
                  <div className="flex items-center gap-2 text-muted text-xs uppercase tracking-widest mb-1.5">
                    <ArrowRight className="w-3.5 h-3.5" />
                    Value lever
                  </div>
                  <p className="text-foreground text-sm">{playbook.valueLever}</p>
                </div>
                <div className="bg-surface-raised rounded-lg p-4 border border-[hsl(var(--border))]">
                  <div className="flex items-center gap-2 text-muted text-xs uppercase tracking-widest mb-1.5">
                    <Target className="w-3.5 h-3.5" />
                    Best fit when
                  </div>
                  <ul className="space-y-1">
                    {playbook.bestFit.map((fit) => (
                      <li key={fit} className="text-muted text-sm">
                        {fit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href="#contact"
                  onClick={onClose}
                  className="flex-1 block bg-accent text-accent-foreground text-center px-6 py-3.5 rounded-lg font-medium text-sm hover:bg-accent-hover transition-all duration-300"
                >
                  Discuss this playbook with us
                </a>
                {playbook.link && (
                  <Link
                    href={playbook.link.href}
                    className="flex-1 block text-center text-foreground px-6 py-3.5 rounded-lg font-medium text-sm border border-[hsl(var(--border-strong))] hover:border-[hsl(var(--muted))] hover:bg-surface-raised transition-all duration-300"
                  >
                    {playbook.link.label}
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Playbooks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<Playbook | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLearnMore = (playbook: Playbook) => {
    setSelected(playbook);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelected(null), 300);
  };

  return (
    <section id="playbooks" className="py-20 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-[hsl(var(--border))]" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 max-w-2xl"
        >
          <p className="text-xs text-muted uppercase tracking-widest mb-3">The four playbooks</p>
          <h2 className="text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-3">
            Four playbooks to make a portfolio company AI-first
          </h2>
          <p className="text-muted text-sm leading-relaxed">
            Each playbook moves a value lever inside the hold period, and leaves a documented,
            measured AI capability that a buyer can diligence. Start with the one that matches the
            company&apos;s constraint.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {playbooks.map((playbook, index) => (
            <PlaybookCard
              key={playbook.index}
              playbook={playbook}
              index={index}
              onLearnMore={() => handleLearnMore(playbook)}
            />
          ))}
        </div>
      </div>

      <PlaybookModal playbook={selected} isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  );
}
