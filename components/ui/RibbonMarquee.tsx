import { cn } from "@/lib/cn";

export function RibbonMarquee({
  items,
  className,
  rotateClassName,
}: {
  items: string[];
  className?: string;
  rotateClassName?: string;
}) {
  const text = `${items.join("   ·   ")}   ·   `.repeat(4);

  return (
    <div className={className} role="presentation">
      <div className="relative h-full w-full">
        <div
          className={cn(
            "absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center overflow-hidden bg-secondary py-[0.4em]",
            rotateClassName
          )}
        >
          <div className="flex w-max shrink-0 animate-marquee items-center">
            <span className="whitespace-nowrap px-1.5 font-sans text-[clamp(1rem,2.2vw,1.75rem)] font-bold uppercase leading-none tracking-[0.03em] text-ink">
              {text}
            </span>
            <span
              className="whitespace-nowrap px-1.5 font-sans text-[clamp(1rem,2.2vw,1.75rem)] font-bold uppercase leading-none tracking-[0.03em] text-ink"
              aria-hidden="true"
            >
              {text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
