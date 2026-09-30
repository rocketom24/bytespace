import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
  width = "default",
}: {
  children: React.ReactNode;
  className?: string;
  width?: "default" | "wide" | "narrow";
}) {
  const widths = {
    narrow: "max-w-[min(100%,clamp(40rem,56vw,60rem))]",
    default: "max-w-[min(100%,clamp(48rem,72vw,84rem))]",
    wide: "max-w-[min(100%,clamp(56rem,86vw,104rem))]",
  };

  return (
    <div className={cn("mx-auto w-full min-h-0", widths[width], className)}>{children}</div>
  );
}
