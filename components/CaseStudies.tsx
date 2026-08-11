"use client";

import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeftRight,
  ScanLine,
  FileText,
  Database,
  LayoutDashboard,
  ShieldCheck,
  FileSearch,
  MessageSquare,
  CalendarCheck,
  FolderTree,
  GitMerge,
  Layers,
  Blocks,
  Network,
  Scale,
  ClipboardCheck,
  Lock,
  Phone,
  Mic,
  Workflow,
  SlidersHorizontal,
  Lightbulb,
  Search,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

interface Metric {
  /** Context caption shown above the value. */
  label: string;
  before?: string;
  after?: string;
  /** Impact phrase shown in place of a before → after when no number is supportable. */
  phrase?: string;
}

interface Capability {
  icon: LucideIcon;
  label: string;
  description: string;
}

interface CaseStudy {
  id: string;
  /** Label for the secondary pill (Private Equity only). */
  subLabel?: string;
  deliverable: string;
  description: string;
  metric: Metric;
  capabilities: Capability[];
  value: string;
}

interface Industry {
  id: string;
  label: string;
  cases: CaseStudy[];
}

const industries: Industry[] = [
  {
    id: "healthcare",
    label: "Healthcare",
    cases: [
      {
        id: "healthcare-knowledge-graph",
        deliverable: "From Medallion to Knowledge Graph",
        description:
          "We rebuilt the hospital gold layer for MRF and payer Transparency in Coverage price data — replacing a pile of dbt marts, where every new question needed a new mart and no join key survived across sources, with a knowledge graph that lives as a logical layer over the same BigQuery tables.",
        metric: {
          label: "Gold layer",
          before: "Medallion",
          after: "Knowledge Graph",
        },
        capabilities: [
          {
            icon: GitMerge,
            label: "Entity Resolution",
            description:
              "NPPES is the provider spine; blocking, probabilistic scoring, and transitive clustering do the rest, with embeddings for messy facility names. Versioned cluster IDs mean merges never break downstream keys.",
          },
          {
            icon: Scale,
            label: "Reconciliation",
            description:
              "MRF and TiC disagree often. We never overwrite — conflicting values become sibling assertions, and a precedence policy derives a consensus view. Divergence becomes a tracked signal, not a COALESCE.",
          },
          {
            icon: Network,
            label: "The Ontology",
            description:
              "We reused rather than invented. FHIR R4 supplies the core classes; SKOS carries CPT, MS-DRG, and NDC. Rates become reified assertion nodes — a price is an n-ary relationship, not an edge property — each carrying PROV-O provenance.",
          },
        ],
        value:
          "Questions became traversals instead of marts, and the gold backlog dissolved. The graph lives as a logical layer over the same BigQuery tables — no second store, no ID handoff between engines.",
      },
    ],
  },
  {
    id: "consumer-goods",
    label: "Consumer Goods",
    cases: [
      {
        id: "fmcg-semantic-layer",
        deliverable: "Agent-Ready Semantic Layer",
        description:
          "A distributor running on a legacy ERP that holds every order, product, contract, and payment. We land every source table in a queryable store and build a named business vocabulary and machine-callable tools over it.",
        metric: {
          label: "Agent tool surface",
          before: "100+ tools",
          after: "16 verbs",
        },
        capabilities: [
          {
            icon: Database,
            label: "Raw Ingestion, Downstream Interpretation",
            description:
              "Pulls every source table without an allowlist — anything filtered at ingest is a question the business has silently decided not to answer.",
          },
          {
            icon: Layers,
            label: "Business Vocabulary as Named Views",
            description:
              "Turns each concept the ERP can't express into a documented view. Nouns compose — so ten views answer more questions than ten tools.",
          },
          {
            icon: Blocks,
            label: "Consolidated Agent Tool Surface",
            description:
              "Exposes sixteen typed verbs, a runtime schema description, and a read-only escape hatch — instead of hundreds of generated tools that flood context.",
          },
        ],
        value:
          "Making the machine interface primary puts the whole ERP within reach of natural language. It runs unattended in production, and the client's team extends it. A later, unrelated automation reused the same vocabulary without touching ingest or schema — the first automation costs a project, the second a fraction of it.",
      },
    ],
  },
  {
    id: "tax",
    label: "Tax & Wealth",
    cases: [
      {
        id: "tax-copilot",
        deliverable: "Agentic Copilot for Tax Advisory",
        description:
          "A conversational agent that turns a complex tax-planning tool into a natural-language strategist — so any advisor becomes a power user without navigating deep menus.",
        metric: {
          label: "Multi-year scenario modeling",
          before: "4 hours",
          after: "10 minutes",
        },
        capabilities: [
          {
            icon: ArrowLeftRight,
            label: "Conversational Scenario Modeling",
            description:
              "Run multi-year what-ifs — Roth conversions, capital-gain harvesting, DAF contributions — through plain-language queries.",
          },
          {
            icon: ScanLine,
            label: "Return Q&A and Anomaly Detection",
            description:
              "Flags high-value planning opportunities, overlooked deductions, and potential tax cliffs that static summaries miss.",
          },
          {
            icon: FileText,
            label: "Client-Facing Deliverables",
            description:
              "Generates plain-language client emails, talking points, and tailored summaries that explain complex strategies.",
          },
        ],
        value:
          "Advisors surface hidden planning opportunities and run complex scenarios through natural language — without wrestling with menus — so every client gets deeper, faster planning.",
      },
    ],
  },
  {
    id: "gov",
    label: "Government",
    cases: [
      {
        id: "gov-reports",
        deliverable: "Financial Report Automation",
        description:
          "Turns municipal accounting data, prior-year reports, and source documents into publication-ready, compliant financial reports with minimal manual intervention.",
        metric: {
          label: "Report production timeline",
          before: "3 months",
          after: "2 weeks",
        },
        capabilities: [
          {
            icon: Database,
            label: "Data Ingestion and Mapping",
            description:
              "Standardizes complex financial data straight into compliance-ready reporting templates.",
          },
          {
            icon: LayoutDashboard,
            label: "Automated Layout and Formatting",
            description:
              "Compiles report sections, tables, and visual disclosures for both accountants and designers.",
          },
          {
            icon: ShieldCheck,
            label: "Audit and Compliance Review",
            description:
              "Real-time verification tools so implementation teams can audit accuracy and approve final layouts.",
          },
        ],
        value:
          "One firm can serve far more municipalities in parallel — cutting labor costs and compliance stress while finance teams move from one manual report to many.",
      },
    ],
  },
  {
    id: "prop",
    label: "Property",
    cases: [
      {
        id: "prop-insurance",
        deliverable: "Insurance Proof and Scheduling",
        description:
          "Automates the Certificate of Insurance workflow for property managers — reading documents, following up with providers, and scheduling approved work.",
        metric: {
          label: "Provider response cycle",
          before: "3 days",
          after: "2 hours",
        },
        capabilities: [
          {
            icon: FileSearch,
            label: "Certificate Reading and Evaluation",
            description:
              "Reads and evaluates submitted Certificates of Insurance automatically.",
          },
          {
            icon: MessageSquare,
            label: "Provider Follow-Up",
            description:
              "Handles all messaging around acceptances, rejections, or missing information.",
          },
          {
            icon: CalendarCheck,
            label: "Automated Scheduling",
            description:
              "Schedules the provider's work the moment a COI is verified and approved.",
          },
        ],
        value:
          "Property managers stop manually reading COIs and chasing providers — service delivery accelerates from days of waiting to a same-cycle response.",
      },
    ],
  },
  {
    id: "legal",
    label: "Estate & Legal",
    cases: [
      {
        id: "legal-ontology",
        deliverable: "Estate Planning Ontology",
        description:
          "A multi-agent system that reconciles heterogeneous estate documents into a standardized, fully cited beneficiary and tax-strategy model legal experts can review and validate.",
        metric: {
          label: "Estate file review",
          before: "3 weeks",
          after: "2 days",
        },
        capabilities: [
          {
            icon: FolderTree,
            label: "Document Primacy Engine",
            description:
              "Maps wills, trusts, amendments, and decrees to determine which clauses take precedence.",
          },
          {
            icon: Network,
            label: "Estate Ontology Builder",
            description:
              "Synthesizes provisions into a unified model of asset distributions and scenarios per beneficiary.",
          },
          {
            icon: Scale,
            label: "Strategy and Citation Reasoning",
            description:
              "Applies tax-optimization strategies with explanations and direct source-document citations.",
          },
        ],
        value:
          "Estate file review becomes a fast, standardized process with complete audit trails — consistent across team members, instead of an expensive, variable bottleneck.",
      },
    ],
  },
  {
    id: "hr",
    label: "Benefits & HR",
    cases: [
      {
        id: "hr-proposals",
        deliverable: "Proposal Creation Tool",
        description:
          "Extracts employee demographic data from varied RFP formats, flags missing information, and securely processes census files to streamline benefits underwriting.",
        metric: {
          label: "Per-file processing time",
          before: "1.5 hours",
          after: "30 seconds",
        },
        capabilities: [
          {
            icon: FileSearch,
            label: "Automated Data Extraction",
            description:
              "Pulls employee details from non-standardized RFP documents in real time.",
          },
          {
            icon: ClipboardCheck,
            label: "Proactive Data Integrity",
            description:
              "Validates input files and alerts Business Development Managers the moment key items are missing.",
          },
          {
            icon: Lock,
            label: "HIPAA-Compliant Infrastructure",
            description:
              "A private model in Azure AI Foundry keeps PHI secure and never exposes sensitive data.",
          },
        ],
        value:
          "Underwriting timelines shrink and data accuracy improves — and missing-data alerts let the team handle far higher request volumes without compromising compliance.",
      },
    ],
  },
  {
    id: "field",
    label: "Field Ops",
    cases: [
      {
        id: "field-voice",
        deliverable: "Voice AI Agent",
        description:
          "A voice system that lets mobile field workers query and update CRM and ERP systems hands-free, over the phone, in real time.",
        metric: {
          label: "Per-update time",
          before: "5 minutes",
          after: "30 seconds",
        },
        capabilities: [
          {
            icon: Phone,
            label: "Telephony Integration",
            description:
              "Manages inbound call routing and the live audio stream between user and system.",
          },
          {
            icon: Mic,
            label: "Voice Processing Engine",
            description:
              "Converts spoken audio to text and turns system responses back into natural speech.",
          },
          {
            icon: Workflow,
            label: "Intent and Workflow Orchestration",
            description:
              "Interprets intent, runs business logic, and triggers real-time API operations in CRM and ERP.",
          },
        ],
        value:
          "Field workers manage orders, log interactions, and create tasks without logging into software — so back-office systems always reflect real-time operational data.",
      },
    ],
  },
  {
    id: "pe",
    label: "Private Equity",
    cases: [
      {
        id: "pe-governance",
        subLabel: "Data Governance",
        deliverable: "Governed AI Data Access Strategy",
        description:
          "A data-access architecture that brings security controls, regulatory compliance, and leakage prevention to safely expose firm knowledge to LLMs.",
        metric: {
          label: "Data governance",
          phrase: "End-to-end Compliance Coverage",
        },
        capabilities: [
          {
            icon: FolderTree,
            label: "Storage Governance Assessment",
            description:
              "Evaluates folder structures, permission levels, and data-sensitivity exposure across enterprise repositories.",
          },
          {
            icon: SlidersHorizontal,
            label: "Trade-off Analysis",
            description:
              "Compares content sources, staging layers, and database architectures for speed vs. governance control.",
          },
          {
            icon: ShieldCheck,
            label: "Functional Pilot Deployments",
            description:
              "Validates security rules against low-risk content slices before broader rollout.",
          },
        ],
        value:
          "Proprietary CRM, investor files, and internal communications respect strict boundary controls and SEC parameters — with safe, isolated data prep before any LLM runs.",
      },
      {
        id: "pe-knowledge-graph",
        subLabel: "Knowledge Graph",
        deliverable: "Unified Network and Knowledge Graph Modeling",
        description:
          "An ontology that adds meaning and context to centralized data — resolving entity conflicts across siloed systems and building clean data domains.",
        metric: {
          label: "Data foundation",
          phrase: "Unified Definitions and Data Access",
        },
        capabilities: [
          {
            icon: Network,
            label: "Conformed Knowledge Graph",
            description:
              "Resolves entity conflicts across platforms, mapping frontend accounts to legal back-office structures.",
          },
          {
            icon: Database,
            label: "Automated Ingestion Pipelines",
            description:
              "Cleans, maps, and folds source tables into the Snowflake warehouse with tested pipelines.",
          },
          {
            icon: Lightbulb,
            label: "Immediate Value Use Cases",
            description:
              "Ships a high-value entry use case — like a 360-degree relationship view — to prove value fast.",
          },
        ],
        value:
          "Fragmented Snowflake data becomes a clean, queryable single source of truth — with the catalogs, semantic layer, and stewardship that were missing.",
      },
      {
        id: "pe-doc-search",
        subLabel: "Document Search",
        deliverable: "Unstructured Document Indexing and Search",
        description:
          "Firm-wide indexing that prepares, chunks, and indexes complex multi-format document directories so they're entirely AI-ready and searchable.",
        metric: {
          label: "Firm knowledge",
          phrase: "Institutional Memory Retention",
        },
        capabilities: [
          {
            icon: FileSearch,
            label: "Automated Parsing Pipeline",
            description:
              "Processes text and metadata from PDFs, spreadsheets, and presentations.",
          },
          {
            icon: Search,
            label: "Cortex Search Index",
            description:
              "Snowflake Cortex indexes for exact-term and thematic semantic search across the corpus.",
          },
          {
            icon: LayoutDashboard,
            label: "Lightweight Retrieval Interface",
            description:
              "A secure interface returns targeted document context alongside original source links.",
          },
        ],
        value:
          "Users query unorganized documents safely through a secure AI harness — cutting token burn and ending manual file-dumping.",
      },
    ],
  },
];

function StatBlock({ metric }: { metric: Metric }) {
  return (
    <div className="h-full rounded-xl p-6 flex flex-col justify-center border border-[hsl(var(--foreground)/0.15)] bg-surface-raised">
      <p className="text-[13px] text-[hsl(var(--muted))] uppercase tracking-widest mb-4">
        {metric.label}
      </p>
      {metric.phrase ? (
        <p className="text-3xl md:text-4xl font-medium text-foreground tracking-tight leading-tight">
          {metric.phrase}
        </p>
      ) : (
        <p className="text-3xl md:text-4xl font-medium tracking-tight leading-tight">
          <span className="text-[hsl(var(--muted)]">{metric.before}</span>
          <ArrowRight className="inline w-6 h-6 mx-2 text-[hsl(var(--muted))] align-middle" />
          <span className="text-foreground">{metric.after}</span>
        </p>
      )}
    </div>
  );
}

function Capabilities({ items }: { items: Capability[] }) {
  return (
    <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] overflow-hidden h-full">
      <ul className="divide-y divide-[hsl(var(--border))]">
        {items.map((capability, i) => (
          <li key={i} className="flex items-start gap-4 p-5">
            <div className="w-9 h-9 rounded-lg bg-surface border border-[hsl(var(--border))] flex items-center justify-center flex-shrink-0">
              <capability.icon className="w-4 h-4 text-[hsl(var(--muted))]" />
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-medium text-foreground mb-1">{capability.label}</h4>
              <p className="text-sm text-[hsl(var(--muted))] leading-relaxed">
                {capability.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CasePanel({ study, eyebrow }: { study: CaseStudy; eyebrow: string }) {
  return (
    <div className="rounded-2xl border border-[hsl(var(--border))] bg-surface p-6 md:p-8">
      <p className="text-xs text-[hsl(var(--muted))] uppercase tracking-widest mb-3">
        {eyebrow}
      </p>
      <h3 className="text-2xl md:text-3xl font-medium text-foreground tracking-tight mb-3">
        {study.deliverable}
      </h3>
      <p className="text-[hsl(var(--muted))] text-sm md:text-base leading-relaxed max-w-3xl mb-8">
        {study.description}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,300px)_1fr] gap-4 mb-6">
        <StatBlock metric={study.metric} />
        <Capabilities items={study.capabilities} />
      </div>

      <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-6">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--muted))] mb-2">
          Outcome
        </p>
        <p className="text-sm md:text-base text-foreground leading-relaxed max-w-3xl">
          {study.value}
        </p>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const [activeIndustryId, setActiveIndustryId] = useState(industries[0].id);
  const [activeSub, setActiveSub] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const activeIndustry = industries.find((i) => i.id === activeIndustryId) ?? industries[0];
  const activeCase = activeIndustry.cases[activeSub] ?? activeIndustry.cases[0];
  const hasSubCases = activeIndustry.cases.length > 1;

  const eyebrow = hasSubCases
    ? `${activeIndustry.label} — ${activeCase.subLabel}`
    : activeIndustry.label;

  const selectIndustry = (id: string) => {
    setActiveIndustryId(id);
    setActiveSub(0);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(hsl(0 0% 50%) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(0 0% 50%) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[hsl(var(--background))] to-transparent z-[1]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-36 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <p className="text-xs text-[hsl(var(--muted))] uppercase tracking-widest mb-4">
              Results Dossier
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.08] tracking-tight text-balance">
              <span className="text-foreground">Built for the work</span>
              <br />
              <span className="text-[hsl(var(--muted))]">that can't afford to be wrong.</span>
            </h1>
            <p className="text-base md:text-lg text-[hsl(var(--muted))] max-w-2xl leading-relaxed mt-6">
              We ship agentic AI into regulated, high-stakes workflows — tax advisory,
              estate law, municipal finance, benefits underwriting, field operations,
              healthcare, consumer goods, and private markets. Pick a vertical to see the
              deliverable, what it replaced, and the outcome it drove.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Picker + panel */}
      <section ref={ref} className="relative pb-24">
        <div className="absolute top-0 left-0 right-0 h-px bg-[hsl(var(--border))]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-10">
          {/* Primary picker */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4"
          >
            <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1 pb-1">
              {industries.map((industry) => {
                const active = industry.id === activeIndustryId;
                return (
                  <button
                    key={industry.id}
                    onClick={() => selectIndustry(industry.id)}
                    className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium border transition-all duration-300 ${
                      active
                        ? "bg-foreground text-[hsl(var(--background))] border-foreground"
                        : "bg-surface text-[hsl(var(--muted))] border-[hsl(var(--border))] hover:text-foreground hover:border-[hsl(var(--muted)/0.5)]"
                    }`}
                  >
                    {industry.label}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Secondary picker (Private Equity only) */}
          <AnimatePresence initial={false}>
            {hasSubCases && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden mb-8"
              >
                <div className="flex gap-1 rounded-lg border border-[hsl(var(--border))] bg-surface p-1 w-fit max-w-full overflow-x-auto no-scrollbar">
                  {activeIndustry.cases.map((c, i) => {
                    const active = i === activeSub;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setActiveSub(i)}
                        className={`whitespace-nowrap rounded-md px-3.5 py-1.5 text-xs font-medium transition-all duration-300 ${
                          active
                            ? "bg-surface-raised text-foreground"
                            : "text-[hsl(var(--muted))] hover:text-foreground"
                        }`}
                      >
                        {c.subLabel}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCase.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <CasePanel study={activeCase} eyebrow={eyebrow} />
            </motion.div>
          </AnimatePresence>

          {/* Footnote + CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <p className="text-xs text-[hsl(var(--muted))] leading-relaxed max-w-xl">
              Eleven engagements across regulated and high-stakes workflows — the deliverable,
              what it replaced, and the outcome it drove.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground whitespace-nowrap group"
            >
              Discuss your vertical
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
