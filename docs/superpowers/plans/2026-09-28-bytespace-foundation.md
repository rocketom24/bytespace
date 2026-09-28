# ByteSpace Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Build ByteSpace's shared visual/structural foundation — tokens, nav, page shell, horizontal-desktop/vertical-mobile scroll engine, UI primitives, placeholder data, and minimal placeholder content on all 7 routes.

**Architecture:** Next.js 16 App Router (Turbopack, typed `PageProps`/`LayoutProps` helpers). Tailwind v4 CSS-first tokens in `app/globals.css`. Each route wraps its section list in a client `ScrollTrack` (Lenis-driven horizontal pan ≥1024px, plain vertical flow below). Small hand-written UI primitives, no component library. Static in-repo placeholder data (`data/*.ts`) with typed lookup helpers (`lib/*.ts`) feeding the two dynamic routes, which call `notFound()` on a miss.

**Tech Stack:** Next.js 16.3.6, React 19.2, Tailwind CSS v4, Framer Motion, Lenis, TypeScript 5.

**Spec:** `docs/superpowers/specs/2026-09-28-bytespace-foundation-design.md`

## Global Constraints

- Palette (exact hex, from spec): primary `#659287`, secondary `#88BDA4`, soft `#B1D3B9`, background `#E6F2DD`. Dark neutrals only where needed for readable text.
- Reference site (shinta.framer.media) is inspiration only — no copied branding, content, assets, or exact design.
- Font: `Plus Jakarta Sans` (next/font/google), single family.
- No new npm dependencies (`cn()` hand-written, no clsx/tailwind-merge).
- No code comments. No unnecessary abstractions. Work only inside `C:\Projects\bytespace`. Do not modify Git configuration.
- Page content this pass is placeholder only — no page-specific detailed UI, no real search/auth/video logic.
- `npm run build` must pass before this work is considered done.

---

### Task 1: Design tokens, font, root layout

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Interfaces:**
- Produces: Tailwind utility tokens `bg-primary`, `text-primary`, `bg-secondary`, `bg-soft`, `bg-background`, `text-ink`, `text-ink-muted`, `bg-surface`, and `font-sans` (mapped to Plus Jakarta Sans). All later tasks style with these utilities only.

- [x] **Step 1: Replace `app/globals.css` contents**

```css
@import "tailwindcss";

:root {
  --primary: #659287;
  --secondary: #88bda4;
  --soft: #b1d3b9;
  --background: #e6f2dd;
  --ink: #1c2420;
  --ink-muted: #4b5750;
  --surface: #ffffff;
}

@theme inline {
  --color-primary: var(--primary);
  --color-secondary: var(--secondary);
  --color-soft: var(--soft);
  --color-background: var(--background);
  --color-ink: var(--ink);
  --color-ink-muted: var(--ink-muted);
  --color-surface: var(--surface);
  --font-sans: var(--font-jakarta);
}

body {
  background: var(--background);
  color: var(--ink);
}
```

- [x] **Step 2: Replace `app/layout.tsx` contents**

```tsx
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ByteSpace",
  description: "Learn to build, one lesson at a time.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} h-full`}>
      <body className="min-h-full bg-background font-sans text-ink antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
```

This imports `Navbar`, created in Task 4 — expect a resolution error until then, that's fine.

- [x] **Step 3: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: add ByteSpace design tokens and root layout"
```

---

### Task 2: `cn` helper and UI primitives

**Files:**
- Create: `lib/cn.ts`
- Create: `components/ui/Button.tsx`
- Create: `components/ui/Badge.tsx`
- Create: `components/ui/Card.tsx`

**Interfaces:**
- Consumes: tokens from Task 1 (`bg-primary`, `text-ink`, etc.)
- Produces: `cn(...classes: Array<string | false | null | undefined>): string`; `Button({ children, variant?: "primary"|"outline"|"ghost", href?: string, className?, ...buttonProps })`; `Badge({ children, className? })`; `Card({ children, className? })`. All later component/page tasks import these.

- [x] **Step 1: Create `lib/cn.ts`**

```ts
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
```

- [x] **Step 2: Create `components/ui/Button.tsx`**

```tsx
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
```

- [x] **Step 3: Create `components/ui/Badge.tsx`**

```tsx
import { cn } from "@/lib/cn";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-soft/60 px-3 py-1 text-xs font-medium text-ink",
        className
      )}
    >
      {children}
    </span>
  );
}
```

- [x] **Step 4: Create `components/ui/Card.tsx`**

```tsx
import { cn } from "@/lib/cn";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-3xl bg-surface p-6 shadow-sm shadow-ink/5", className)}>
      {children}
    </div>
  );
}
```

- [x] **Step 5: Type-check**

Run: `npx tsc --noEmit`
Expected: the only error is `Cannot find module '@/components/layout/Navbar'` from `app/layout.tsx` (Task 1 references it ahead of Task 4 creating it) — that's expected and resolves in Task 4. No errors from the four new files themselves.

- [x] **Step 6: Commit**

```bash
git add lib/cn.ts components/ui/Button.tsx components/ui/Badge.tsx components/ui/Card.tsx
git commit -m "feat: add cn helper and base UI primitives"
```

---

### Task 3: Placeholder data and lookup helpers

**Files:**
- Create: `data/courses.ts`
- Create: `data/creators.ts`
- Create: `data/lessons.ts`
- Create: `data/reviews.ts`
- Create: `lib/courses.ts`
- Create: `lib/creators.ts`
- Create: `lib/lessons.ts`

**Interfaces:**
- Produces types: `Course`, `Creator`, `Lesson`, `Review` (from `data/*.ts`).
- Produces functions: `getCourseById(id: string): Course | undefined`, `getCoursesByCreatorId(creatorId: string): Course[]`, `getCreatorById(id: string): Creator | undefined`, `getLessonById(id: string): Lesson | undefined`, `getLessonsByCourseId(courseId: string): Lesson[]`. Dynamic-route pages (Tasks 10–12) consume these.

- [x] **Step 1: Create `data/courses.ts`**

```ts
export type Course = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  durationMinutes: number;
  lessonCount: number;
  creatorId: string;
  rating: number;
  studentCount: number;
  coverColor: string;
};

export const courses: Course[] = [
  {
    id: "1",
    slug: "react-fundamentals",
    title: "React Fundamentals",
    summary: "Build modern interfaces with components, state, and hooks.",
    category: "Web Development",
    level: "Beginner",
    durationMinutes: 320,
    lessonCount: 3,
    creatorId: "amara-chen",
    rating: 4.8,
    studentCount: 12400,
    coverColor: "#88BDA4",
  },
  {
    id: "2",
    slug: "typescript-in-depth",
    title: "TypeScript In Depth",
    summary: "Type systems, generics, and safer large-scale apps.",
    category: "Programming Languages",
    level: "Intermediate",
    durationMinutes: 410,
    lessonCount: 2,
    creatorId: "dev-osei",
    rating: 4.9,
    studentCount: 8700,
    coverColor: "#659287",
  },
  {
    id: "3",
    slug: "systems-design-basics",
    title: "Systems Design Basics",
    summary: "Scalability, caching, and distributed data fundamentals.",
    category: "Computer Science",
    level: "Advanced",
    durationMinutes: 500,
    lessonCount: 1,
    creatorId: "priya-nair",
    rating: 4.7,
    studentCount: 5300,
    coverColor: "#B1D3B9",
  },
];
```

- [x] **Step 2: Create `data/creators.ts`**

```ts
export type Creator = {
  id: string;
  slug: string;
  name: string;
  headline: string;
  bio: string;
};

export const creators: Creator[] = [
  {
    id: "amara-chen",
    slug: "amara-chen",
    name: "Amara Chen",
    headline: "Frontend Engineer & Educator",
    bio: "Ten years building interfaces at scale, now teaching what actually matters on the job.",
  },
  {
    id: "dev-osei",
    slug: "dev-osei",
    name: "Dev Osei",
    headline: "Staff Engineer",
    bio: "Focused on type-safe systems and developer tooling.",
  },
  {
    id: "priya-nair",
    slug: "priya-nair",
    name: "Priya Nair",
    headline: "Distributed Systems Lead",
    bio: "Designs backend systems for products used by millions.",
  },
];
```

- [x] **Step 3: Create `data/lessons.ts`**

```ts
export type Lesson = {
  id: string;
  courseId: string;
  title: string;
  order: number;
  durationMinutes: number;
};

export const lessons: Lesson[] = [
  { id: "1", courseId: "1", title: "Why components?", order: 1, durationMinutes: 12 },
  { id: "2", courseId: "1", title: "State and props", order: 2, durationMinutes: 18 },
  { id: "3", courseId: "1", title: "Handling events", order: 3, durationMinutes: 14 },
  { id: "4", courseId: "2", title: "Why types?", order: 1, durationMinutes: 10 },
  { id: "5", courseId: "2", title: "Generics from scratch", order: 2, durationMinutes: 22 },
  { id: "6", courseId: "3", title: "What is a distributed system?", order: 1, durationMinutes: 16 },
];
```

- [x] **Step 4: Create `data/reviews.ts`**

```ts
export type Review = {
  id: string;
  courseId: string;
  author: string;
  rating: number;
  quote: string;
};

export const reviews: Review[] = [
  {
    id: "r1",
    courseId: "1",
    author: "Jonas M.",
    rating: 5,
    quote: "Finally a React course that explains the why, not just the how.",
  },
  {
    id: "r2",
    courseId: "2",
    author: "Sara K.",
    rating: 5,
    quote: "The generics section alone was worth the price.",
  },
  {
    id: "r3",
    courseId: "3",
    author: "Malik T.",
    rating: 4,
    quote: "Dense but thorough — took my system design interviews seriously.",
  },
];
```

- [x] **Step 5: Create `lib/courses.ts`**

```ts
import { courses, type Course } from "@/data/courses";

export function getCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}

export function getCoursesByCreatorId(creatorId: string): Course[] {
  return courses.filter((course) => course.creatorId === creatorId);
}
```

- [x] **Step 6: Create `lib/creators.ts`**

```ts
import { creators, type Creator } from "@/data/creators";

export function getCreatorById(id: string): Creator | undefined {
  return creators.find((creator) => creator.id === id);
}
```

- [x] **Step 7: Create `lib/lessons.ts`**

```ts
import { lessons, type Lesson } from "@/data/lessons";

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}

export function getLessonsByCourseId(courseId: string): Lesson[] {
  return lessons
    .filter((lesson) => lesson.courseId === courseId)
    .sort((a, b) => a.order - b.order);
}
```

- [x] **Step 8: Type-check**

Run: `npx tsc --noEmit`
Expected: still only the known `Cannot find module '@/components/layout/Navbar'` error from Task 1 (resolves in Task 4). No errors from the new `data/` and `lib/` files.

- [x] **Step 9: Commit**

```bash
git add data/courses.ts data/creators.ts data/lessons.ts data/reviews.ts lib/courses.ts lib/creators.ts lib/lessons.ts
git commit -m "feat: add placeholder course data and lookup helpers"
```

---

### Task 4: Layout shell — Container, Slide, Navbar

**Files:**
- Create: `components/layout/Container.tsx`
- Create: `components/layout/Slide.tsx`
- Create: `components/layout/Navbar.tsx`

**Interfaces:**
- Consumes: `cn` (Task 2), `Button` (Task 2).
- Produces: `Container({ children, className? })`, `Slide({ children, className? })` (client, motion-wrapped section — every route wraps its content units in this), `Navbar()` (rendered once from `app/layout.tsx`, Task 1).

- [x] **Step 1: Create `components/layout/Container.tsx`**

```tsx
import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("mx-auto w-full max-w-5xl", className)}>{children}</div>;
}
```

- [x] **Step 2: Create `components/layout/Slide.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export function Slide({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "flex w-screen shrink-0 flex-col justify-center px-6 py-24 lg:h-screen lg:px-16",
        className
      )}
    >
      {children}
    </motion.section>
  );
}
```

- [x] **Step 3: Create `components/layout/Navbar.tsx`**

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const links = [
  { href: "/search", label: "Search" },
  { href: "/reviews", label: "Reviews" },
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
        <Button href="/search" variant="primary" className="px-5 py-2 text-xs">
          Start learning
        </Button>
      </nav>
    </header>
  );
}
```

- [x] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors from the three new files. `app/layout.tsx`'s `Navbar` import (Task 1) now resolves.

- [x] **Step 5: Commit**

```bash
git add components/layout/Container.tsx components/layout/Slide.tsx components/layout/Navbar.tsx
git commit -m "feat: add layout shell (Container, Slide, Navbar)"
```

---

### Task 5: ScrollTrack — horizontal desktop / vertical mobile engine

**Files:**
- Create: `components/scroll/ScrollTrack.tsx`

**Interfaces:**
- Consumes: `lenis` package default export (`new Lenis({ wrapper, content, orientation, gestureOrientation })`, `.raf(time)`, `.destroy()`).
- Produces: `ScrollTrack({ children })` — every page's top-level wrapper (Tasks 7–13).

- [x] **Step 1: Create `components/scroll/ScrollTrack.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";

export function ScrollTrack({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(query.matches);
    const onChange = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    const lenis = new Lenis({
      wrapper,
      content,
      orientation: "horizontal",
      gestureOrientation: "both",
    });

    let frame: number;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [isDesktop]);

  return (
    <div ref={wrapperRef} className={isDesktop ? "h-screen w-screen overflow-hidden" : ""}>
      <div
        ref={contentRef}
        className={isDesktop ? "flex h-screen w-max flex-row" : "flex flex-col"}
      >
        {children}
      </div>
    </div>
  );
}
```

- [x] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors (the `lenis` package ships its own types, already installed per `package.json`).

- [x] **Step 3: Commit**

```bash
git add components/scroll/ScrollTrack.tsx
git commit -m "feat: add Lenis-driven horizontal/vertical ScrollTrack"
```

---

### Task 6: CourseCard and CreatorCard

**Files:**
- Create: `components/ui/CourseCard.tsx`
- Create: `components/ui/CreatorCard.tsx`

**Interfaces:**
- Consumes: `Card`, `Badge` (Task 2), `Course` type (Task 3, `@/data/courses`), `Creator` type (Task 3, `@/data/creators`).
- Produces: `CourseCard({ course: Course })`, `CreatorCard({ creator: Creator })` — used by Tasks 7–12.

- [x] **Step 1: Create `components/ui/CourseCard.tsx`**

```tsx
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Course } from "@/data/courses";

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/course/${course.id}`}>
      <Card className="flex h-full flex-col gap-4">
        <div className="h-32 rounded-2xl" style={{ backgroundColor: course.coverColor }} />
        <div className="flex flex-wrap gap-2">
          <Badge>{course.category}</Badge>
          <Badge>{course.level}</Badge>
        </div>
        <h3 className="text-lg font-semibold text-ink">{course.title}</h3>
        <p className="text-sm text-ink-muted">{course.summary}</p>
        <p className="text-xs text-ink-muted">
          {course.lessonCount} lessons · {Math.round(course.durationMinutes / 60)}h
        </p>
      </Card>
    </Link>
  );
}
```

- [x] **Step 2: Create `components/ui/CreatorCard.tsx`**

```tsx
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { Creator } from "@/data/creators";

export function CreatorCard({ creator }: { creator: Creator }) {
  return (
    <Link href={`/creator/${creator.id}`}>
      <Card className="flex h-full flex-col gap-3">
        <div className="h-16 w-16 rounded-full bg-soft" />
        <h3 className="text-lg font-semibold text-ink">{creator.name}</h3>
        <p className="text-sm text-ink-muted">{creator.headline}</p>
      </Card>
    </Link>
  );
}
```

- [x] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors from the two new files.

- [x] **Step 4: Commit**

```bash
git add components/ui/CourseCard.tsx components/ui/CreatorCard.tsx
git commit -m "feat: add CourseCard and CreatorCard"
```

---

### Task 7: Home page (`/`)

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `ScrollTrack` (Task 5), `Slide`, `Container` (Task 4), `Button`, `Badge` (Task 2), `CourseCard`, `CreatorCard` (Task 6), `courses` (Task 3), `creators` (Task 3).

- [x] **Step 1: Replace `app/page.tsx` contents**

```tsx
import { ScrollTrack } from "@/components/scroll/ScrollTrack";
import { Slide } from "@/components/layout/Slide";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CourseCard } from "@/components/ui/CourseCard";
import { CreatorCard } from "@/components/ui/CreatorCard";
import { courses } from "@/data/courses";
import { creators } from "@/data/creators";

export default function HomePage() {
  return (
    <ScrollTrack>
      <Slide>
        <Container className="flex flex-col gap-6">
          <Badge>Learning, rebuilt for builders</Badge>
          <h1 className="max-w-2xl text-5xl font-bold leading-tight text-ink lg:text-7xl">
            Learn to build, one lesson at a time.
          </h1>
          <p className="max-w-xl text-lg text-ink-muted">
            ByteSpace is a course-learning platform for people who want to ship real
            things, not just watch videos.
          </p>
          <div className="flex gap-4">
            <Button href="/search">Browse courses</Button>
            <Button href="/reviews" variant="outline">
              See reviews
            </Button>
          </div>
        </Container>
      </Slide>

      <Slide>
        <Container className="flex flex-col gap-8">
          <h2 className="text-3xl font-bold text-ink">Featured courses</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </Container>
      </Slide>

      <Slide>
        <Container className="flex flex-col gap-8">
          <h2 className="text-3xl font-bold text-ink">Learn from people who ship</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {creators.map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
          </div>
        </Container>
      </Slide>

      <Slide>
        <Container className="flex flex-col items-start gap-6">
          <h2 className="max-w-xl text-4xl font-bold text-ink">
            Ready to start your next course?
          </h2>
          <Button href="/search">Explore the catalog</Button>
        </Container>
      </Slide>
    </ScrollTrack>
  );
}
```

- [x] **Step 2: Verify render**

Run: `npm run dev` (if not already running), open `http://localhost:3000/`.
Expected: hero, featured courses, creators, CTA sections render with no console errors; ≥1024px width wheel-scrolls horizontally, narrow width stacks vertically.

- [x] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: build ByteSpace home page foundation"
```

---

### Task 8: Search page (`/search`)

**Files:**
- Modify: `app/search/page.tsx`

**Interfaces:**
- Consumes: same as Task 7 minus `CreatorCard`.

- [x] **Step 1: Replace `app/search/page.tsx` contents**

```tsx
import { ScrollTrack } from "@/components/scroll/ScrollTrack";
import { Slide } from "@/components/layout/Slide";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { CourseCard } from "@/components/ui/CourseCard";
import { courses } from "@/data/courses";

const categories = Array.from(new Set(courses.map((course) => course.category)));

export default function SearchPage() {
  return (
    <ScrollTrack>
      <Slide>
        <Container className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-ink">Find your next course</h1>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge key={category}>{category}</Badge>
            ))}
          </div>
        </Container>
      </Slide>

      <Slide>
        <Container className="flex flex-col gap-8">
          <h2 className="text-2xl font-bold text-ink">All courses</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </Container>
      </Slide>
    </ScrollTrack>
  );
}
```

- [x] **Step 2: Verify render**

Open `http://localhost:3000/search`. Expected: filter-bar shell and course grid render, no console errors.

- [x] **Step 3: Commit**

```bash
git add app/search/page.tsx
git commit -m "feat: build ByteSpace search page foundation"
```

---

### Task 9: Reviews page (`/reviews`)

**Files:**
- Modify: `app/reviews/page.tsx`

**Interfaces:**
- Consumes: `ScrollTrack`, `Slide`, `Container`, `Card`, `reviews` (Task 3, `@/data/reviews`), `courses` (Task 3, `@/data/courses`).

- [x] **Step 1: Replace `app/reviews/page.tsx` contents**

```tsx
import { ScrollTrack } from "@/components/scroll/ScrollTrack";
import { Slide } from "@/components/layout/Slide";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { reviews } from "@/data/reviews";
import { courses } from "@/data/courses";

export default function ReviewsPage() {
  return (
    <ScrollTrack>
      <Slide>
        <Container className="flex flex-col gap-8">
          <h1 className="text-4xl font-bold text-ink">What learners say</h1>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => {
              const course = courses.find((item) => item.id === review.courseId);
              return (
                <Card key={review.id} className="flex flex-col gap-3">
                  <p className="text-sm text-ink-muted">Rating: {review.rating}/5</p>
                  <p className="text-ink">&ldquo;{review.quote}&rdquo;</p>
                  <p className="text-sm font-semibold text-ink">{review.author}</p>
                  {course && <p className="text-xs text-ink-muted">on {course.title}</p>}
                </Card>
              );
            })}
          </div>
        </Container>
      </Slide>
    </ScrollTrack>
  );
}
```

- [x] **Step 2: Verify render**

Open `http://localhost:3000/reviews`. Expected: review cards render with course attribution, no console errors.

- [x] **Step 3: Commit**

```bash
git add app/reviews/page.tsx
git commit -m "feat: build ByteSpace reviews page foundation"
```

---

### Task 10: Course detail page (`/course/[id]`)

**Files:**
- Modify: `app/course/[id]/page.tsx`

**Interfaces:**
- Consumes: `ScrollTrack`, `Slide`, `Container`, `Badge`, `CreatorCard`, `getCourseById`, `getCreatorById`, `getLessonsByCourseId` (Tasks 2–6), `notFound` from `next/navigation`, global `PageProps<"/course/[id]">` type helper.

- [x] **Step 1: Replace `app/course/[id]/page.tsx` contents**

```tsx
import { notFound } from "next/navigation";
import { ScrollTrack } from "@/components/scroll/ScrollTrack";
import { Slide } from "@/components/layout/Slide";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { CreatorCard } from "@/components/ui/CreatorCard";
import { getCourseById } from "@/lib/courses";
import { getCreatorById } from "@/lib/creators";
import { getLessonsByCourseId } from "@/lib/lessons";

export default async function CoursePage(props: PageProps<"/course/[id]">) {
  const { id } = await props.params;
  const course = getCourseById(id);

  if (!course) {
    notFound();
  }

  const creator = getCreatorById(course.creatorId);
  const lessons = getLessonsByCourseId(course.id);

  return (
    <ScrollTrack>
      <Slide>
        <Container className="flex flex-col gap-6">
          <div className="flex gap-2">
            <Badge>{course.category}</Badge>
            <Badge>{course.level}</Badge>
          </div>
          <h1 className="max-w-2xl text-4xl font-bold text-ink lg:text-5xl">
            {course.title}
          </h1>
          <p className="max-w-xl text-lg text-ink-muted">{course.summary}</p>
          <p className="text-sm text-ink-muted">
            {course.lessonCount} lessons · {Math.round(course.durationMinutes / 60)}h ·{" "}
            {course.studentCount.toLocaleString()} students · {course.rating}/5
          </p>
        </Container>
      </Slide>

      <Slide>
        <Container className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-ink">Curriculum</h2>
          <ol className="flex flex-col gap-3">
            {lessons.map((lesson) => (
              <li
                key={lesson.id}
                className="flex items-center justify-between rounded-2xl bg-surface px-5 py-4 text-sm text-ink"
              >
                <span>
                  {lesson.order}. {lesson.title}
                </span>
                <span className="text-ink-muted">{lesson.durationMinutes} min</span>
              </li>
            ))}
          </ol>
        </Container>
      </Slide>

      {creator && (
        <Slide>
          <Container className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-ink">Your instructor</h2>
            <div className="max-w-sm">
              <CreatorCard creator={creator} />
            </div>
          </Container>
        </Slide>
      )}
    </ScrollTrack>
  );
}
```

- [x] **Step 2: Verify render and 404**

Open `http://localhost:3000/course/1`. Expected: course hero, curriculum, instructor sections render.
Open `http://localhost:3000/course/does-not-exist`. Expected: renders `app/not-found.tsx` (Task 13).

- [x] **Step 3: Commit**

```bash
git add app/course/\[id\]/page.tsx
git commit -m "feat: build ByteSpace course detail page foundation"
```

---

### Task 11: Lesson detail page (`/lesson/[id]`)

**Files:**
- Modify: `app/lesson/[id]/page.tsx`

**Interfaces:**
- Consumes: `ScrollTrack`, `Slide`, `Container`, `getLessonById`, `getLessonsByCourseId`, `getCourseById`, `notFound`, global `PageProps<"/lesson/[id]">`.

- [x] **Step 1: Replace `app/lesson/[id]/page.tsx` contents**

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { ScrollTrack } from "@/components/scroll/ScrollTrack";
import { Slide } from "@/components/layout/Slide";
import { Container } from "@/components/layout/Container";
import { getLessonById, getLessonsByCourseId } from "@/lib/lessons";
import { getCourseById } from "@/lib/courses";

export default async function LessonPage(props: PageProps<"/lesson/[id]">) {
  const { id } = await props.params;
  const lesson = getLessonById(id);

  if (!lesson) {
    notFound();
  }

  const course = getCourseById(lesson.courseId);
  const lessons = getLessonsByCourseId(lesson.courseId);

  return (
    <ScrollTrack>
      <Slide>
        <Container className="flex flex-col gap-4">
          {course && (
            <Link
              href={`/course/${course.id}`}
              className="text-sm text-ink-muted hover:text-ink"
            >
              Back to {course.title}
            </Link>
          )}
          <h1 className="max-w-2xl text-4xl font-bold text-ink">{lesson.title}</h1>
          <div className="flex h-64 items-center justify-center rounded-3xl bg-ink text-background">
            Lesson player placeholder
          </div>
          <p className="text-sm text-ink-muted">{lesson.durationMinutes} min</p>
        </Container>
      </Slide>

      <Slide>
        <Container className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-ink">Course lessons</h2>
          <ol className="flex flex-col gap-3">
            {lessons.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/lesson/${item.id}`}
                  className="flex items-center justify-between rounded-2xl bg-surface px-5 py-4 text-sm text-ink hover:bg-soft/40"
                >
                  <span>
                    {item.order}. {item.title}
                  </span>
                  <span className="text-ink-muted">{item.durationMinutes} min</span>
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </Slide>
    </ScrollTrack>
  );
}
```

- [x] **Step 2: Verify render and 404**

Open `http://localhost:3000/lesson/1`. Expected: lesson shell + course lesson list render.
Open `http://localhost:3000/lesson/does-not-exist`. Expected: renders `app/not-found.tsx`.

- [x] **Step 3: Commit**

```bash
git add app/lesson/\[id\]/page.tsx
git commit -m "feat: build ByteSpace lesson detail page foundation"
```

---

### Task 12: Creator detail page (`/creator/[id]`)

**Files:**
- Modify: `app/creator/[id]/page.tsx`

**Interfaces:**
- Consumes: `ScrollTrack`, `Slide`, `Container`, `CourseCard`, `getCreatorById`, `getCoursesByCreatorId`, `notFound`, global `PageProps<"/creator/[id]">`.

- [x] **Step 1: Replace `app/creator/[id]/page.tsx` contents**

```tsx
import { notFound } from "next/navigation";
import { ScrollTrack } from "@/components/scroll/ScrollTrack";
import { Slide } from "@/components/layout/Slide";
import { Container } from "@/components/layout/Container";
import { CourseCard } from "@/components/ui/CourseCard";
import { getCreatorById } from "@/lib/creators";
import { getCoursesByCreatorId } from "@/lib/courses";

export default async function CreatorPage(props: PageProps<"/creator/[id]">) {
  const { id } = await props.params;
  const creator = getCreatorById(id);

  if (!creator) {
    notFound();
  }

  const creatorCourses = getCoursesByCreatorId(creator.id);

  return (
    <ScrollTrack>
      <Slide>
        <Container className="flex flex-col gap-4">
          <div className="h-20 w-20 rounded-full bg-soft" />
          <h1 className="text-4xl font-bold text-ink">{creator.name}</h1>
          <p className="text-lg text-ink-muted">{creator.headline}</p>
          <p className="max-w-xl text-ink-muted">{creator.bio}</p>
        </Container>
      </Slide>

      <Slide>
        <Container className="flex flex-col gap-8">
          <h2 className="text-2xl font-bold text-ink">Courses by {creator.name}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {creatorCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </Container>
      </Slide>
    </ScrollTrack>
  );
}
```

- [x] **Step 2: Verify render and 404**

Open `http://localhost:3000/creator/amara-chen`. Expected: creator hero + course grid render.
Open `http://localhost:3000/creator/does-not-exist`. Expected: renders `app/not-found.tsx`.

- [x] **Step 3: Commit**

```bash
git add app/creator/\[id\]/page.tsx
git commit -m "feat: build ByteSpace creator detail page foundation"
```

---

### Task 13: Not-found page

**Files:**
- Modify: `app/not-found.tsx`

**Interfaces:**
- Consumes: `Button` (Task 2).

- [x] **Step 1: Replace `app/not-found.tsx` contents**

```tsx
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
```

- [x] **Step 2: Verify render**

Open `http://localhost:3000/course/does-not-exist` (or any unmatched route). Expected: on-brand 404 renders, "Back home" button links to `/`.

- [x] **Step 3: Commit**

```bash
git add app/not-found.tsx
git commit -m "feat: build ByteSpace not-found page"
```

---

### Task 14: Full build verification

**Files:** none (verification only)

- [x] **Step 1: Run the production build**

Run: `npm run build`
Expected: build succeeds (Turbopack compiles, typegen resolves `PageProps`/`LayoutProps`, ESLint passes) with no errors. If it fails, fix the reported file and re-run before proceeding.

- [x] **Step 2: Spot-check all 7 routes in dev**

Run: `npm run dev`, visit `/`, `/search`, `/reviews`, `/course/1`, `/lesson/1`, `/creator/amara-chen`, and an unmatched dynamic id.
Expected: all render without console/runtime errors; ≥1024px width pans horizontally per section; <1024px width stacks vertically.

- [x] **Step 3: Final commit (if the build step required fixes)**

```bash
git add -A
git commit -m "fix: resolve build issues in ByteSpace foundation"
```

Skip this step if Task 14 required no changes.
