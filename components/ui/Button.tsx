import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "outline" | "ghost";

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-background hover:bg-ink",
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
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors",
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
