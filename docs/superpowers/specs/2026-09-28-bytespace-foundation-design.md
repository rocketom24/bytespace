# ByteSpace Foundation — Design Spec

Date: 2026-09-28

## Goal

Build the basic visual/structural foundation of ByteSpace, a course-learning
platform. Shared layout, design tokens, nav, page containers, buttons, cards,
horizontal-desktop/vertical-mobile scroll architecture. Page content is
placeholder only — no page-specific detailed UI yet.

## Visual reference

Motion/spacing/interaction principles inspired by
https://shinta.framer.media/ (pill nav, pill buttons, rounded bold display
type, marquee ribbon, section-reveal motion). Branding, content, assets, and
exact design are NOT copied. Palette is ByteSpace's own (below).

## Design tokens

Defined in `app/globals.css` via Tailwind v4 `@theme`:

- `--color-primary: #659287`
- `--color-secondary: #88BDA4`
- `--color-soft: #B1D3B9`
- `--color-background: #E6F2DD`
- `--color-ink: #1C2420` (dark neutral, body text / high-contrast surfaces)
- `--color-ink-muted: #4B5750` (secondary text)
- `--color-surface: #FFFFFF` (card surface on light bg)

Dark neutrals (`ink`) are used only where needed for readable text (body copy,
text on light surfaces, dark card variants) — no separate dark-mode theme.

Font: `Plus Jakarta Sans` (next/font/google), single family, used for both
display and UI text via weight variation.

## Horizontal scroll architecture

`components/scroll/ScrollTrack.tsx` (client component):

- `min-width: 1024px`: Lenis instantiated in horizontal mode, drives
  `translateX` on a flex-row track; each direct child (`Slide`) is
  `w-screen shrink-0 h-screen`, one wheel gesture pans across slides.
- `< 1024px`: Lenis never instantiated; track renders `flex-col`, slides use
  natural height, page scrolls vertically as normal.
- One `ScrollTrack` per route's page content. Navigation between routes stays
  plain `next/link`, unaffected by the track.

## Shared layout

- `app/layout.tsx`: fonts, global CSS, fixed `<Navbar/>`, renders `children`.
- `components/layout/Navbar.tsx`: pill-shaped fixed nav — logo, route links
  (Home/Search/Reviews), CTA button. Mobile: condensed (menu affordance can be
  a later pass; foundation just needs it not to break layout).
- `components/layout/Container.tsx`: max-width content wrapper.
- `components/layout/Slide.tsx`: single section/slide primitive — consistent
  padding + optional heading slot, used as `ScrollTrack` children.

## UI primitives (`components/ui/`)

- `Button.tsx` — variants: `primary` (filled pill), `outline`, `ghost`.
- `Card.tsx` — base card; `CourseCard`, `CreatorCard` thin wrappers over it.
- `Badge.tsx` — small pill label (category/level tags).

`lib/cn.ts` — hand-written classname joiner (no new dependency).

## Data (placeholder, real ByteSpace domain)

`data/courses.ts`, `data/creators.ts`, `data/reviews.ts` — small typed arrays.

```ts
type Course = { id, slug, title, summary, category, level, durationMinutes, lessonCount, creatorId, rating, studentCount, coverColor }
type Lesson = { id, courseId, title, order, durationMinutes }
type Creator = { id, slug, name, headline, bio }
type Review = { id, courseId, author, rating, quote }
```

`lib/courses.ts` etc. — `getCourseById`, `getCreatorById` lookup helpers used
by dynamic routes; miss → `notFound()`.

## Pages (placeholder content only)

- `/` — hero slide, featured courses slide, creators teaser slide, CTA slide.
- `/search` — filter-bar shell slide + results grid slide (static placeholder
  results, no real search logic yet).
- `/course/[id]` — course hero slide, curriculum (lesson list) slide, creator
  card slide. 404 via `notFound()` on unknown id.
- `/lesson/[id]` — lesson player shell slide, lesson list slide.
- `/reviews` — reviews grid slide(s).
- `/creator/[id]` — creator hero slide, their courses slide. 404 on unknown id.
- `/not-found` — on-brand 404, uses shared tokens/components.

## Motion

Framer Motion: one subtle fade/slide-up per slide on enter
(`initial`/`whileInView`, `viewport={{ once: true }}`). Nothing else in this
pass.

## Error handling

- Dynamic routes (`course/[id]`, `creator/[id]`) call `notFound()` from
  `next/navigation` when the lookup misses.
- No form/data-mutation logic in this pass — nothing else to handle yet.

## Testing / verification

No page logic complex enough to warrant unit tests in this pass (placeholder
content, no branching business logic). Verification is:

- `npm run build` passes (Turbopack, typed routes, ESLint flat config).
- Manual dev-server check: horizontal pan works ≥1024px, vertical stacking
  works on narrow viewport, all 7 routes render without runtime errors.

## Out of scope (explicitly deferred)

- Real search/filter logic, real auth, real video player, real lesson
  progress — placeholders only.
- Mobile nav menu interaction detail.
- `cacheComponents`/PPR — not enabled.
