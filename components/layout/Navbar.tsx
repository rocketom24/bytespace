import Link from "next/link";
import { Button } from "@/components/ui/Button";

const links = [
  { href: "/", label: "Home" },
  { href: "/search", label: "Courses" },
  { href: "/#creators", label: "Creators" },
];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-6 z-50 flex justify-center px-4">
      <nav className="flex w-full max-w-3xl items-center justify-between gap-4 rounded-full bg-surface/90 px-4 py-2 shadow-sm shadow-ink/10 backdrop-blur">
        <Link href="/" className="text-lg font-bold text-ink">
          ByteSpace
        </Link>
        <div className="hidden items-center gap-6 text-sm font-medium text-ink-muted md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-ink">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="hidden text-sm font-semibold text-ink hover:text-primary sm:inline-flex">
            Sign In
          </button>
          <Button variant="primary" className="px-5 py-2 text-xs">
            Join Us
          </Button>
        </div>
      </nav>
    </header>
  );
}
