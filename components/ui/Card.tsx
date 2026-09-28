import { cn } from "@/lib/cn";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-3xl bg-surface p-6 shadow-sm shadow-ink/5", className)}>
      {children}
    </div>
  );
}
