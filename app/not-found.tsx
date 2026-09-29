import { Button } from "@/components/ui/Button";
import { SectionDoodles } from "@/components/ui/SectionDoodles";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-6 overflow-hidden px-6 text-center">
      <SectionDoodles seed={17} density="light" />
      <p className="relative z-10 text-sm font-semibold uppercase tracking-wide text-ink-muted">404</p>
      <h1 className="relative z-10 max-w-md text-4xl font-bold text-ink">
        This page hasn&apos;t been built yet.
      </h1>
      <Button href="/" className="relative z-10">
        Back home
      </Button>
    </div>
  );
}
