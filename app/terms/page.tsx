import { SimplePage } from "@/components/layout/SimplePage";

export default function TermsPage() {
  return (
    <SimplePage
      eyebrow="Legal"
      title="Terms of service"
      lede="Last updated January 2026. The short version: be honest, be respectful, and course access is for you alone."
      seed={34}
    >
      <div>
        <h2>Using ByteSpace</h2>
        <p>
          Courses you purchase are licensed for your personal use. Sharing an account or
          redistributing course content isn&apos;t allowed and may get your account suspended.
        </p>
      </div>
      <div>
        <h2>Creators</h2>
        <p>
          Creators keep ownership of the courses they publish and are responsible for the
          accuracy of what they teach. ByteSpace reviews new courses before launch but
          doesn&apos;t guarantee outcomes.
        </p>
      </div>
      <div>
        <h2>Changes</h2>
        <p>
          We&apos;ll update these terms as the product evolves, and we&apos;ll flag anything
          material on the site before it takes effect.
        </p>
      </div>
    </SimplePage>
  );
}
