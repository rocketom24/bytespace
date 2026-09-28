"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export function Slide({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "flex w-screen shrink-0 flex-col justify-center px-6 py-24 lg:h-screen lg:px-16",
        className
      )}
    >
      {children}
    </motion.section>
  );
}
