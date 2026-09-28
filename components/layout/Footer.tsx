"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

const courseLinks = [
  { label: "Web Development", href: "/search" },
  { label: "Programming Languages", href: "/search" },
  { label: "Computer Science", href: "/search" },
];

const platformLinks = [
  { label: "Become a creator", href: "/#creators" },
  { label: "Reviews", href: "/reviews" },
  { label: "Pricing", href: "/search" },
];

const companyLinks = [
  { label: "About", href: "#" },
  { label: "Help center", href: "#" },
  { label: "Contact", href: "#" },
];

const legalLinks = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
];

export function Footer() {
  return (
    <div className="flex h-full flex-col justify-center gap-10 lg:max-h-screen lg:overflow-y-auto lg:py-12">
      <div className="flex flex-col gap-4 border-b border-ink/10 pb-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-ink">Stay in the loop</h2>
          <p className="text-sm text-ink-muted">
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
            className="w-full rounded-full border border-ink/10 bg-surface px-5 py-3 text-sm text-ink placeholder:text-ink-muted"
          />
          <Button type="submit" className="shrink-0">
            Subscribe
          </Button>
        </form>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3">
          <span className="text-lg font-bold text-ink">ByteSpace</span>
          <p className="text-sm text-ink-muted">Learn to build, one lesson at a time.</p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-ink">Courses</h3>
          {courseLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-ink-muted hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-ink">Platform</h3>
          {platformLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-ink-muted hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-ink">Company</h3>
          {companyLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-ink-muted hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-ink/10 pt-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
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
