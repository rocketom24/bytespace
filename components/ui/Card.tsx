import { cn } from "@/lib/cn";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-3xl bg-surface p-[clamp(1rem,0.9vw+0.9vh,1.6rem)] shadow-sm shadow-ink/5", className)}>
      {children}
    </div>
  );
}
