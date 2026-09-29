import { cn } from "@/lib/cn";

export function Marquee({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("group overflow-hidden", className)}>
      <div className="flex w-max animate-marquee gap-[clamp(0.5rem,1vw,1rem)] group-hover:[animation-play-state:paused]">
        <div className="flex shrink-0 gap-[clamp(0.5rem,1vw,1rem)]">{children}</div>
        <div className="flex shrink-0 gap-[clamp(0.5rem,1vw,1rem)]" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
