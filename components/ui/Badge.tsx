import { cn } from "@/lib/cn";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full bg-soft/60 px-3 py-1 text-micro font-medium text-ink",
        className
      )}
    >
      {children}
    </span>
  );
}
