import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-ink-muted">404</p>
      <h1 className="max-w-md text-4xl font-bold text-ink">
        This page hasn&apos;t been built yet.
      </h1>
      <Button href="/">Back home</Button>
    </div>
  );
}
