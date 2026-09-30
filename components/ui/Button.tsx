import Link from "next/link";
import { cn } from "@/lib/cn";
import { PRESS_INTERACTIVE } from "@/lib/motion";

type ButtonVariant = "primary" | "outline" | "ghost";

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-accent text-background hover:bg-ink",
  outline: "border border-ink/20 text-ink hover:border-ink",
  ghost: "text-ink hover:bg-soft/40",
};

export function Button({
  children,
  variant = "primary",
  href,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-[clamp(1.15rem,1.3vw,1.75rem)] py-[clamp(0.6rem,1.2vh,0.85rem)] text-meta font-semibold",
    PRESS_INTERACTIVE,
    variantClasses[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
