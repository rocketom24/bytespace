"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform, type Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CatMascot } from "@/components/ui/CatMascot";
import { MarkShape } from "@/components/ui/decor";
import { useSlideProgress } from "@/components/layout/Slide";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { EASE_OUT, HOVER_LIFT } from "@/lib/motion";
import { cn } from "@/lib/cn";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

const linkClass =
  "group relative inline-block w-fit text-meta text-ink-muted transition-[color,transform] duration-200 ease-out hover:translate-x-0.5 hover:text-ink";
const linkUnderline =
  "absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100";

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

/** Hand-drawn rule (echoes the doodle backdrop) standing in for a flat border, positioned absolutely so it never costs a flex gap. */
function WavyDivider({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 10"
      preserveAspectRatio="none"
      className={cn("pointer-events-none absolute inset-x-0 h-2.5 w-full text-ink/15", className)}
    >
      <path
        d="M0 5 Q 12.5 1 25 5 T 50 5 T 75 5 T 100 5 T 125 5 T 150 5 T 175 5 T 200 5 T 225 5 T 250 5 T 275 5 T 300 5 T 325 5 T 350 5 T 375 5 T 400 5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

const dotColors = ["bg-accent", "bg-primary", "bg-secondary"];

function LinkColumn({
  heading,
  links,
  dotColor,
}: {
  heading: string;
  links: { label: string; href: string }[];
  dotColor: string;
}) {
  return (
    <motion.div variants={itemVariants} className="flex flex-col gap-3">
      <h3 className="flex items-center gap-2 text-meta font-semibold text-ink">
        <span className={cn("h-1.5 w-1.5 rounded-full", dotColor)} aria-hidden />
        {heading}
      </h3>
      {links.map((link) => (
        <Link key={link.label} href={link.href} className={linkClass}>
          {link.label}
          <span aria-hidden className={linkUnderline} />
        </Link>
      ))}
    </motion.div>
  );
}

export function Footer() {
  const reduceMotion = useReducedMotionSafe();
  const fallbackProgress = useMotionValue(0.5);
  const slideProgress = useSlideProgress() ?? fallbackProgress;
  const wordmarkY = useTransform(slideProgress, [0, 0.5, 1], [14, 0, -14]);

  const reveal = reduceMotion
    ? { initial: false as const }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-80px" },
      };

  return (
    <div className="relative flex h-full flex-col justify-center gap-[var(--block)]">
      <CatMascot
        bubble="Don't be a stranger!"
        className="pointer-events-none absolute -top-2 right-0 z-10 hidden origin-top-right lg:-right-6 lg:block lg:scale-[0.8] xl:scale-90"
      />

      <motion.div
        variants={itemVariants}
        {...reveal}
        className="relative flex flex-col gap-4 pb-10 lg:flex-row lg:items-center lg:justify-between"
      >
        <WavyDivider className="bottom-0" />
        <div className="flex max-w-md flex-col gap-2">
          <h2 className="text-[clamp(1.9rem,3.4vw,3.1rem)] font-bold leading-[1.05] tracking-[-0.03em] text-ink">
            Ready when{" "}
            <span className="relative inline-block">
              you are.
              <svg
                aria-hidden
                viewBox="0 0 40 40"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-3 w-full text-accent"
              >
                <MarkShape variant="squiggle" />
              </svg>
            </span>
          </h2>
          <p className="text-meta text-ink-muted">
            New courses and creator drops, once or twice a month. No spam, promise.
          </p>
        </div>
        <form
          onSubmit={(event) => event.preventDefault()}
          className="flex w-full max-w-md gap-3"
        >
          <div className="relative w-full">
            <span
              aria-hidden
              className="animate-search-glow pointer-events-none absolute inset-0 rounded-full border-2 border-primary"
            />
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="relative w-full rounded-full border-2 border-primary/30 bg-surface px-5 py-[clamp(0.6rem,1.4vh,0.9rem)] text-meta text-ink outline-none transition-[color,border-color,transform] duration-200 placeholder:text-ink-muted focus-visible:scale-[1.01] focus-visible:border-primary"
            />
          </div>
          <Button type="submit" className={cn("shrink-0", HOVER_LIFT)}>
            Subscribe
          </Button>
        </form>
      </motion.div>

      <motion.div
        variants={containerVariants}
        {...reveal}
        className="grid gap-[clamp(1rem,2.2vw,2rem)] sm:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div variants={itemVariants} className="flex flex-col gap-3">
          <motion.span
            style={reduceMotion ? undefined : { y: wordmarkY }}
            className="inline-flex w-fit items-center gap-1 text-subtitle font-bold text-ink"
          >
            ByteSpace
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          </motion.span>
          <p className="text-meta text-ink-muted">Learn to build, one lesson at a time.</p>
        </motion.div>
        <LinkColumn heading="Courses" links={courseLinks} dotColor={dotColors[0]} />
        <LinkColumn heading="Platform" links={platformLinks} dotColor={dotColors[1]} />
        <LinkColumn heading="Company" links={companyLinks} dotColor={dotColors[2]} />
      </motion.div>

      <motion.div
        variants={itemVariants}
        {...reveal}
        className="relative flex flex-col gap-4 pt-[clamp(0.75rem,2vh,1.5rem)] text-micro text-ink-muted sm:flex-row sm:items-center sm:justify-between"
      >
        <WavyDivider className="top-0" />
        <span>© {new Date().getFullYear()} ByteSpace. All rights reserved.</span>
        <div className="flex gap-4">
          {legalLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="group relative inline-block w-fit transition-[color,transform] duration-200 ease-out hover:translate-x-0.5 hover:text-ink"
            >
              {link.label}
              <span aria-hidden className={linkUnderline} />
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
