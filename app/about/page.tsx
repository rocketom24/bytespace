import { SimplePage } from "@/components/layout/SimplePage";

export default function AboutPage() {
  return (
    <SimplePage
      eyebrow="About"
      title="Built so anyone can teach, and anyone can learn"
      lede="ByteSpace connects people who know something worth teaching with people who want to learn it, without the overhead of running a school."
      seed={30}
    >
      <p>
        We started ByteSpace because most course platforms make creators choose between
        reach and ownership. Ours keeps both: creators set their own pace and pricing,
        and learners get a catalog that stays current because the people teaching it are
        still working in the field.
      </p>
      <p>
        Every course on ByteSpace is reviewed for clarity before it goes live, and every
        creator keeps 85% of what they earn. No lecture halls, no waitlists &mdash; just a
        straight line from &ldquo;I want to learn this&rdquo; to doing it.
      </p>
    </SimplePage>
  );
}
