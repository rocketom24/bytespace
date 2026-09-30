"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

const courseLinks = [
  { label: "Web Development", href: "/courses" },
  { label: "Programming Languages", href: "/courses" },
  { label: "Computer Science", href: "/courses" },
];

const platformLinks = [
  { label: "Become a creator", href: "/#creators" },
  { label: "Reviews", href: "/reviews" },
  { label: "Pricing", href: "/courses" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Help center", href: "/help" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function Footer() {
  return (
    <div className="flex h-full flex-col justify-center gap-[var(--block)]">
      <div className="flex flex-col gap-4 border-b border-ink/10 pb-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-title font-bold text-ink">Stay in the loop</h2>
          <p className="text-meta text-ink-muted">
            New courses and creator drops, once or twice a month.
          </p>
        </div>
        <form
          onSubmit={(event) => event.preventDefault()}
          className="flex w-full max-w-md gap-3"
        >
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-full border border-ink/10 bg-surface px-5 py-[clamp(0.6rem,1.4vh,0.9rem)] text-meta text-ink outline-none transition-colors placeholder:text-ink-muted focus-visible:border-primary"
          />
          <Button type="submit" className="shrink-0">
            Subscribe
          </Button>
        </form>
      </div>

      <div className="grid gap-[clamp(1rem,2.2vw,2rem)] sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3">
          <span className="text-subtitle font-bold text-ink">ByteSpace</span>
          <p className="text-meta text-ink-muted">Learn to build, one lesson at a time.</p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-meta font-semibold text-ink">Courses</h3>
          {courseLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-meta text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-meta font-semibold text-ink">Platform</h3>
          {platformLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-meta text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-meta font-semibold text-ink">Company</h3>
          {companyLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-meta text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-ink/10 pt-[clamp(0.75rem,2vh,1.5rem)] text-micro text-ink-muted sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} ByteSpace. All rights reserved.</span>
        <div className="flex gap-4">
          {legalLinks.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-ink">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
