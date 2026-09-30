import Link from "next/link";
import { SimplePage } from "@/components/layout/SimplePage";

const faqs = [
  {
    q: "How do I start a course?",
    a: "Open any course page and hit Enroll. Video courses start playing immediately; live cohorts show you the next start date.",
  },
  {
    q: "Can I get a refund?",
    a: "Yes, within 14 days of enrolling if you've completed less than 20% of the course. Reach out through the contact page and we'll sort it out.",
  },
  {
    q: "How do creator payouts work?",
    a: "Creators keep 85% of every sale, paid out weekly once their balance clears $25.",
  },
  {
    q: "I forgot my password.",
    a: "Use the \"Forgot password?\" link on the sign in page to get a reset email.",
  },
];

export default function HelpPage() {
  return (
    <SimplePage
      eyebrow="Help center"
      title="Common questions, answered"
      lede="Can't find what you need here? Reach out and a real person will get back to you."
      seed={31}
    >
      <div className="flex flex-col gap-6">
        {faqs.map((item) => (
          <div key={item.q} className="flex flex-col gap-1.5">
            <h2 className="text-subtitle! font-semibold text-ink">{item.q}</h2>
            <p>{item.a}</p>
          </div>
        ))}
      </div>
      <p>
        Still stuck?{" "}
        <Link href="/contact" className="font-semibold text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
          Contact us
        </Link>{" "}
        and we&apos;ll help you out.
      </p>
    </SimplePage>
  );
}
