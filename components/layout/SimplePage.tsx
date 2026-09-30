import { Container } from "@/components/layout/Container";
import { SectionDoodles } from "@/components/ui/SectionDoodles";

export function SimplePage({
  eyebrow,
  title,
  lede,
  seed = 30,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  seed?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex w-full flex-col overflow-hidden px-[var(--gutter)] py-[var(--nav-space)]">
      <div aria-hidden className="absolute inset-0 z-0">
        <SectionDoodles seed={seed} density="light" accentWeight={0.2} />
      </div>

      <Container width="narrow" className="relative z-10 flex flex-col gap-[var(--block)]">
        <div className="flex flex-col gap-3">
          <span className="text-micro font-semibold uppercase tracking-wide text-accent">
            {eyebrow}
          </span>
          <h1 className="text-display font-bold text-ink">{title}</h1>
          {lede && <p className="max-w-[60ch] text-lead text-ink-muted">{lede}</p>}
        </div>

        <div className="flex flex-col gap-[clamp(1.25rem,2.4vh,2rem)] text-meta text-ink-muted [&_h2]:text-title [&_h2]:font-bold [&_h2]:text-ink [&_p]:max-w-[68ch] [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_li]:list-disc [&_li]:ml-5">
          {children}
        </div>
      </Container>
    </div>
  );
}
