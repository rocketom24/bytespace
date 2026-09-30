"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { cn } from "@/lib/cn";

export function CourseFAQ({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotionSafe();

  return (
    <div className="flex w-full flex-col gap-3">
      {faqs.map((faq, index) => {
        const isOpen = index === openIndex;
        return (
          <div key={faq.question} className="overflow-hidden rounded-2xl bg-surface shadow-sm shadow-ink/5">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-3 px-[clamp(1rem,1.4vw,1.35rem)] py-[clamp(0.7rem,1.3vh,0.95rem)] text-left text-meta font-semibold text-ink"
            >
              {faq.question}
              <ChevronDown
                className={cn("h-4 w-4 shrink-0 text-ink-muted transition-transform duration-300", isOpen && "rotate-180")}
                aria-hidden
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.25 }}
                  className="px-[clamp(1rem,1.4vw,1.35rem)]"
                >
                  <p className="pb-[clamp(0.7rem,1.3vh,0.95rem)] text-meta text-ink-muted">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
