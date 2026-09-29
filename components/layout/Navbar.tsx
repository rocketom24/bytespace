"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useRef, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/#creators", label: "Creators" },
];

type PillRect = { left: number; top: number; width: number; height: number };

function CompactNavbar() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <header className="fixed inset-x-0 top-6 z-50 flex justify-end px-4 sm:px-6">
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-ink/95 text-background shadow-xl shadow-ink/25 backdrop-blur transition-colors hover:text-secondary"
        >
          {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95, transition: { duration: reduceMotion ? 0 : 0.15 } }}
              transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 30 }}
              className="absolute right-0 top-[calc(100%+0.5rem)] flex w-48 flex-col gap-1 rounded-3xl border border-white/10 bg-ink/95 p-2 shadow-xl shadow-ink/25 backdrop-blur"
            >
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-meta font-medium text-background/90 transition-colors hover:bg-white/10 hover:text-secondary"
                >
                  {link.label}
                </Link>
              ))}
              <div className="my-1 h-px bg-white/10" />
              <button className="rounded-xl px-3 py-2 text-left text-meta font-medium text-background/90 transition-colors hover:bg-white/10">
                Sign In
              </button>
              <button className="rounded-xl bg-secondary px-3 py-2 text-left text-meta font-semibold text-ink transition-colors hover:bg-secondary/90">
                Join Us
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export function Navbar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<PillRect | null>(null);
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();

  if (pathname === "/courses" || pathname === "/courses/all") {
    return <CompactNavbar />;
  }

  const trackPill = (target: HTMLElement) => {
    const container = containerRef.current;
    if (!container) return;
    const c = container.getBoundingClientRect();
    const r = target.getBoundingClientRect();
    setPill({ left: r.left - c.left, top: r.top - c.top, width: r.width, height: r.height });
  };

  return (
    <header className="fixed inset-x-0 top-6 z-50 flex justify-center px-4">
      <nav className="flex w-full max-w-3xl items-center justify-between gap-4 rounded-full border border-white/10 bg-ink/95 py-2 pl-5 pr-2.5 shadow-xl shadow-ink/25 backdrop-blur">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-background transition-colors hover:text-secondary"
        >
          ByteSpace
        </Link>
        <div
          ref={containerRef}
          className="relative isolate hidden items-center gap-1 md:flex"
          onMouseLeave={() => setPill(null)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) setPill(null);
          }}
        >
          <AnimatePresence>
            {pill && (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute rounded-full bg-white mix-blend-difference"
                initial={{ ...pill, opacity: 0, scale: 0.8 }}
                animate={{ ...pill, opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: reduceMotion ? 0 : 0.15 } }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 480, damping: 28, mass: 0.7 }
                }
              />
            )}
          </AnimatePresence>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onMouseEnter={(e) => trackPill(e.currentTarget)}
              onFocus={(e) => trackPill(e.currentTarget)}
              className="relative rounded-full px-4 py-2"
            >
              <span className="relative z-10 inline-block text-sm font-medium text-white mix-blend-difference">
                {link.label}
              </span>
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <svg className="absolute h-0 w-0">
            <filter id="liquid-goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </svg>
          <button className="group relative hidden overflow-hidden rounded-full px-4 py-2 text-sm font-semibold text-background/80 transition-colors duration-300 hover:text-ink sm:inline-flex">
            <span className="absolute inset-0 filter-[url(#liquid-goo)]">
              <span className="absolute bottom-1/2 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 scale-0 rounded-full bg-surface transition-transform duration-500 ease-in-out group-hover:scale-[14]" />
            </span>
            <span className="relative z-10">Sign In</span>
          </button>
          <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-secondary px-5 py-2 text-xs font-semibold text-ink shadow-sm">
            <span className="absolute inset-0 filter-[url(#liquid-goo)]">
              <span className="absolute inset-0 rounded-full bg-secondary" />
              <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 scale-0 rounded-full bg-soft transition-transform duration-500 ease-in-out group-hover:scale-[14]" />
            </span>
            <span className="relative z-10">Join Us</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
