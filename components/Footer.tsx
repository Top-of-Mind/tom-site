"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Linkedin, Twitter, Mail } from "lucide-react";

// Platforms named across our engagements — honest, no fabricated certifications.
const stack = ["Snowflake", "Azure", "BigQuery", "dbt", "Cortex", "FHIR"];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const hash = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  const navLinks = [
    { label: "Services", href: hash("services") },
    { label: "Process", href: hash("process") },
    { label: "Software Dev Lifecycle", href: "/sdlc" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Focus", href: hash("focus") },
    { label: "Contact", href: hash("contact") },
  ];

  return (
    <footer className="border-t border-[hsl(var(--border))] bg-surface-raised">
      {/* Trust bar — enterprise stack we ship on */}
      <div className="border-b border-[hsl(var(--border))]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-muted mb-5">
            Enterprise stack we ship on
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {stack.map((name) => (
              <span
                key={name}
                className="font-mono text-sm uppercase tracking-widest text-muted/80"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <span className="text-sm font-medium text-foreground tracking-widest uppercase">
              Top of Mind Labs
            </span>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              AI researchers and engineers, embedded in your team.
            </p>
          </div>

          <div>
            <h3 className="text-xs text-muted uppercase tracking-widest mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-foreground transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs text-muted uppercase tracking-widest mb-4">
              Connect
            </h3>
            <div className="space-y-4">
              <a
                href="mailto:Nick@gettom.io"
                className="flex items-center gap-2 text-muted hover:text-foreground transition-colors duration-200 text-sm"
              >
                <Mail className="w-4 h-4" />
                Nick@gettom.io
              </a>
              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/company/topofmindlabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-[hsl(var(--border))] flex items-center justify-center text-muted hover:text-accent hover:border-[hsl(var(--border-strong))] transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-[hsl(var(--border))] flex items-center justify-center text-muted hover:text-accent hover:border-[hsl(var(--border-strong))] transition-all duration-300"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[hsl(var(--border))] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted text-sm">
            © {currentYear} Top of Mind Labs. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-muted hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
