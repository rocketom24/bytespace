"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { EASE_OUT, panelVariants } from "@/lib/motion";
import { useHomeNavProgress } from "@/components/layout/HomeNavProgress";
import { useNavHidden } from "@/components/layout/NavVisibility";

const links = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/#paths", label: "Learning Paths" },
  { href: "/#creators", label: "Creators" },
];

type PillRect = { left: number; top: number; width: number; height: number };

/** One shared, non-bouncy tween for the full<->compact morph, matching the cinematic ease already used for page transitions (see app/template.tsx). A spring here read as jittery since it overshoots. */
function shellTransition(reduceMotion: boolean) {
  return reduceMotion ? { duration: 0 } : { duration: 0.55, ease: EASE_OUT };
}

/** Every route runs the minimal navbar except the homepage, which earns the full pill nav. */
function isCompactRoute(pathname: string) {
  return pathname !== "/";
}

function useDropdownDismiss(open: boolean, onClose: () => void) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, onClose]);

  return containerRef;
}

function CompactNavbar({ reduceMotion }: { reduceMotion: boolean }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const containerRef = useDropdownDismiss(open, close);

  return (
    <motion.header
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: shellTransition(reduceMotion) }}
      transition={shellTransition(reduceMotion)}
      className="fixed inset-x-0 top-6 z-50 flex items-center justify-between px-4 sm:px-6"
    >
      <motion.div layoutId="nav-logo" layout="position" transition={shellTransition(reduceMotion)}>
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-lg font-bold tracking-tight text-ink transition-colors hover:text-accent"
        >
          ByteSpace
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
        </Link>
      </motion.div>

      <div className="flex items-center gap-2">
        <Link
          href="/courses"
          aria-label="Search courses"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-ink/95 text-background shadow-xl shadow-ink/25 backdrop-blur transition-colors hover:text-secondary"
        >
          <Search className="h-5 w-5" aria-hidden />
        </Link>

        <div ref={containerRef} className="relative">
          <motion.button
            layoutId="nav-shell"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-ink/95 text-background shadow-xl shadow-ink/25 backdrop-blur transition-colors hover:text-secondary"
            transition={shellTransition(reduceMotion)}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </motion.button>

          <AnimatePresence>
            {open && (
              <motion.div
                variants={panelVariants(reduceMotion)}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute right-0 top-[calc(100%+0.5rem)] flex w-48 flex-col gap-1 rounded-3xl border border-white/10 bg-ink/95 p-2 shadow-xl shadow-ink/25 backdrop-blur"
              >
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={close}
                    className="rounded-xl px-3 py-2 text-meta font-medium text-background/90 transition-colors hover:bg-white/10 hover:text-secondary"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="my-1 h-px bg-white/10" />
                <Link
                  href="/login"
                  onClick={close}
                  className="rounded-xl px-3 py-2 text-left text-meta font-medium text-background/90 transition-colors hover:bg-white/10"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={close}
                  className="rounded-xl bg-accent px-3 py-2 text-left text-meta font-semibold text-background transition-colors hover:bg-accent/90"
                >
                  Join Us
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}

function FullNavbar({ reduceMotion }: { reduceMotion: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<PillRect | null>(null);
  const pathname = usePathname();

  const trackPill = (target: HTMLElement) => {
    const container = containerRef.current;
    if (!container) return;
    const c = container.getBoundingClientRect();
    const r = target.getBoundingClientRect();
    setPill({ left: r.left - c.left, top: r.top - c.top, width: r.width, height: r.height });
  };

  return (
    <motion.header
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: shellTransition(reduceMotion) }}
      transition={shellTransition(reduceMotion)}
      className="fixed inset-x-0 top-6 z-50 flex justify-center px-4"
    >
      <motion.nav
        layoutId="nav-shell"
        transition={shellTransition(reduceMotion)}
        className="flex w-full max-w-3xl items-center justify-between gap-4 overflow-hidden rounded-full border border-white/10 bg-ink/95 py-2 pl-5 pr-2.5 shadow-xl shadow-ink/25 backdrop-blur"
      >
        <motion.div layoutId="nav-logo" layout="position" transition={shellTransition(reduceMotion)}>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-lg font-bold tracking-tight text-background transition-colors hover:text-secondary"
          >
            ByteSpace
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          </Link>
        </motion.div>
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
              key={link.label}
              href={link.href}
              onMouseEnter={(e) => trackPill(e.currentTarget)}
              onFocus={(e) => trackPill(e.currentTarget)}
              className="relative rounded-full px-4 py-2"
            >
              <span className="relative z-10 inline-block text-sm font-medium text-white mix-blend-difference">
                {link.label}
              </span>
              {pathname === link.href ? (
                <span className="absolute left-1/2 -bottom-0.5 h-1 w-1 -translate-x-1/2 rounded-full bg-accent" aria-hidden />
              ) : null}
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
          <Link
            href="/courses"
            aria-label="Search courses"
            className="hidden h-9 w-9 items-center justify-center rounded-full text-background/80 transition-colors hover:bg-white/10 hover:text-background sm:inline-flex"
          >
            <Search className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href="/login"
            className="group relative hidden overflow-hidden rounded-full px-4 py-2 text-sm font-semibold text-background/80 transition-colors duration-300 hover:text-ink sm:inline-flex"
          >
            <span className="absolute inset-0 filter-[url(#liquid-goo)]">
              <span className="absolute bottom-1/2 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 scale-0 rounded-full bg-surface transition-transform duration-500 ease-in-out group-hover:scale-[14]" />
            </span>
            <span className="relative z-10">Sign in</span>
          </Link>
          <Link
            href="/register"
            className="group relative inline-flex items-center justify-center gap-1 overflow-hidden rounded-full bg-accent py-2 pl-5 pr-2 text-xs font-semibold text-background shadow-sm"
          >
            <span className="absolute inset-0 filter-[url(#liquid-goo)]">
              <span className="absolute inset-0 rounded-full bg-accent" />
              <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 scale-0 rounded-full bg-ink transition-transform duration-500 ease-in-out group-hover:scale-[14]" />
            </span>
            <span className="relative z-10">Join us</span>
            <span className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full bg-background/25">
              <ArrowUpRight className="h-2.5 w-2.5" aria-hidden />
            </span>
          </Link>
        </div>
      </motion.nav>
    </motion.header>
  );
}

// Progress past this point on the Learning Paths slide compacts the homepage navbar; a lower
// re-expand threshold gives the flip hysteresis so it doesn't flicker right at the boundary.
const SCROLL_COMPACT_ON = 0.4;
const SCROLL_COMPACT_OFF = 0.28;

export function Navbar() {
  const pathname = usePathname();
  const reduceMotion = Boolean(useReducedMotion());
  const homeNavProgress = useHomeNavProgress();
  const hidden = useNavHidden();
  const [scrollCompact, setScrollCompact] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useMotionValueEvent(homeNavProgress, "change", (value) => {
    setScrollCompact((prev) => (prev ? value > SCROLL_COMPACT_OFF : value > SCROLL_COMPACT_ON));
  });

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(query.matches);
    const onChange = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  if (hidden) return null;

  const compact = isCompactRoute(pathname) || !isDesktop || scrollCompact;

  return (
    <AnimatePresence initial={false}>
      {compact ? (
        <CompactNavbar key="compact" reduceMotion={reduceMotion} />
      ) : (
        <FullNavbar key="full" reduceMotion={reduceMotion} />
      )}
    </AnimatePresence>
  );
}
