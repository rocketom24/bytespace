import { SimplePage } from "@/components/layout/SimplePage";

export default function PrivacyPage() {
  return (
    <SimplePage
      eyebrow="Legal"
      title="Privacy policy"
      lede="Last updated January 2026. This is a summary of what we collect and why."
      seed={33}
    >
      <div>
        <h2>What we collect</h2>
        <p>
          Account details (name, email), course progress, and payment information handled
          by our payment processor &mdash; we never store full card numbers ourselves.
        </p>
      </div>
      <div>
        <h2>How we use it</h2>
        <ul>
          <li>To run your account and track course progress</li>
          <li>To pay creators for the courses you complete</li>
          <li>To send course updates you&apos;ve opted into</li>
        </ul>
      </div>
      <div>
        <h2>Your choices</h2>
        <p>
          You can export or delete your account data from account settings at any time.
          We don&apos;t sell learner data to third parties.
        </p>
      </div>
    </SimplePage>
  );
}
