"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CatMascot } from "@/components/ui/CatMascot";
import { GoogleButton } from "@/components/ui/GoogleButton";
import { SectionDoodles } from "@/components/ui/SectionDoodles";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { EASE_OUT } from "@/lib/motion";

const fieldClasses =
  "w-full rounded-full border border-ink/10 bg-surface py-[clamp(0.6rem,1.2vh,0.85rem)] pl-11 pr-5 text-meta text-ink outline-none transition-colors placeholder:text-ink-muted focus-visible:border-primary";

export default function LoginPage() {
  const reduceMotion = useReducedMotionSafe();

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden px-[var(--gutter)] py-[var(--nav-space)]">
      <SectionDoodles seed={4} density="light" accentWeight={0.25} />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="relative z-10 flex w-full max-w-sm flex-col items-center"
      >
        <CatMascot bubble="Meow! Welcome back." size="lg" className="mb-4" />

        <div className="w-full rounded-[2rem] bg-surface p-[clamp(1.5rem,2vw+1vh,2.25rem)] shadow-xl shadow-ink/10 ring-1 ring-ink/5">
          <Link href="/" className="mx-auto mb-1 flex w-fit items-center gap-1 text-lg font-bold tracking-tight text-ink">
            ByteSpace
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          </Link>
          <h1 className="mt-3 text-center text-title font-bold text-ink">Sign in</h1>
          <p className="mt-1 text-center text-lead text-ink-muted">Pick up right where you left off.</p>

          <form onSubmit={(event) => event.preventDefault()} className="mt-6 flex flex-col gap-3">
            <label className="relative block">
              <span className="sr-only">Email</span>
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" aria-hidden />
              <input type="email" required placeholder="you@example.com" className={fieldClasses} />
            </label>
            <label className="relative block">
              <span className="sr-only">Password</span>
              <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" aria-hidden />
              <input type="password" required placeholder="Password" className={fieldClasses} />
            </label>

            <div className="flex items-center justify-end">
              <button type="button" className="text-micro font-medium text-ink-muted hover:text-ink">
                Forgot password?
              </button>
            </div>

            <Button type="submit" className="mt-1 w-full">
              Sign in
            </Button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-ink/10" />
            <span className="text-micro font-medium text-ink-muted">or</span>
            <span className="h-px flex-1 bg-ink/10" />
          </div>

          <GoogleButton label="Continue with Google" />

          <p className="mt-6 text-center text-meta text-ink-muted">
            New to ByteSpace?{" "}
            <Link href="/register" className="font-semibold text-ink hover:text-accent">
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
