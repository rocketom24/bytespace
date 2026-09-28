"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";
import type { PlatformStat } from "@/data/stats";

function formatValue(value: number, current: number) {
  return value < 10 ? current.toFixed(1) : Math.round(current).toLocaleString();
}

export function StatTile({ stat }: { stat: PlatformStat }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(formatValue(stat.value, 0));

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, stat.value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (value) => setDisplay(formatValue(stat.value, value)),
    });
    return controls.stop;
  }, [isInView, stat.value]);

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <p className="text-4xl font-bold text-ink lg:text-5xl">
        {stat.prefix}
        {display}
        {stat.suffix}
      </p>
      <p className="text-sm text-ink-muted">{stat.label}</p>
    </div>
  );
}
