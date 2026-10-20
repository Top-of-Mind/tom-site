"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hash = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  // Routes that render the contact form locally — link straight to it there
  // (keeps campaign attribution like source=tom-sdlc intact) instead of
  // bouncing visitors to the homepage's form.
  const localContact = ["/", "/sdlc", "/case-studies"].includes(pathname);
  const contactHref = localContact ? "#contact" : "/#contact";

  const navItems = [
    { label: "Services", href: hash("services") },
    { label: "Process", href: hash("process") },
    { label: "Software Dev Lifecycle", href: "/sdlc" },
    { label: "Case Studies", href: "/case-studies" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[hsl(var(--background)/0.85)] backdrop-blur-xl border-b border-[hsl(var(--border))]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/tom-logo.png"
              alt="Top of Mind Labs logo"
              width={512}
              height={630}
              priority
              className="h-8 w-auto rounded-md"
            />
            <span className="text-sm font-medium text-foreground tracking-widest uppercase">
              Top of Mind Labs
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-10 whitespace-nowrap">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-muted hover:text-foreground transition-colors duration-300 text-sm"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={contactHref}
              className="bg-accent text-accent-foreground px-5 py-2 rounded-lg text-sm font-medium hover:bg-accent-hover transition-all duration-300"
            >
              Talk to Us
            </Link>
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-muted hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-[hsl(var(--background)/0.97)] backdrop-blur-xl border-t border-[hsl(var(--border))]"
          >
            <nav className="px-6 py-6 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-muted hover:text-foreground transition-colors text-sm"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  href={contactHref}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center bg-accent text-accent-foreground px-6 py-3 rounded-lg text-sm font-medium"
                >
                  Talk to Us
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
