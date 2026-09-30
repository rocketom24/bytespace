"use client";

import { Mail, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SimplePage } from "@/components/layout/SimplePage";

const fieldClasses =
  "w-full rounded-full border border-ink/10 bg-surface py-[clamp(0.6rem,1.2vh,0.85rem)] pl-11 pr-5 text-meta text-ink outline-none transition-colors placeholder:text-ink-muted focus-visible:border-primary";

export default function ContactPage() {
  return (
    <SimplePage
      eyebrow="Contact"
      title="Get in touch"
      lede="Questions about a course, a creator payout, or anything else &mdash; send us a note and we'll reply within a day or two."
      seed={32}
    >
      <form
        onSubmit={(event) => event.preventDefault()}
        className="flex w-full max-w-lg flex-col gap-3"
      >
        <label className="relative block">
          <span className="sr-only">Name</span>
          <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" aria-hidden />
          <input type="text" required placeholder="Your name" className={fieldClasses} />
        </label>
        <label className="relative block">
          <span className="sr-only">Email</span>
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" aria-hidden />
          <input type="email" required placeholder="you@example.com" className={fieldClasses} />
        </label>
        <label className="relative block">
          <span className="sr-only">Message</span>
          <MessageSquare className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-ink-muted" aria-hidden />
          <textarea
            required
            rows={5}
            placeholder="How can we help?"
            className="w-full resize-none rounded-3xl border border-ink/10 bg-surface py-3 pl-11 pr-5 text-meta text-ink outline-none transition-colors placeholder:text-ink-muted focus-visible:border-primary"
          />
        </label>
        <Button type="submit" className="mt-1 w-fit">
          Send message
        </Button>
      </form>
    </SimplePage>
  );
}
