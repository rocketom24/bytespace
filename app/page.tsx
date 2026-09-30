import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { ScrollTrack } from "@/components/scroll/ScrollTrack";
import { Slide, DEFAULT_PIN_SPAN } from "@/components/layout/Slide";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { PRESS_INTERACTIVE } from "@/lib/motion";
import { RibbonMarquee } from "@/components/ui/RibbonMarquee";
import { PathDeck } from "@/components/ui/PathDeck";
import { CourseList } from "@/components/ui/CourseList";
import { FeaturedCourseCluster, FEATURED_COURSES_PIN_SPAN } from "@/components/ui/FeaturedCourseCluster";
import { HeroCardStack } from "@/components/ui/HeroCardStack";
import { HeroDoodles } from "@/components/ui/HeroDoodles";
import { HeroSearchSpotlight } from "@/components/ui/HeroSearchSpotlight";
import { SectionDoodles } from "@/components/ui/SectionDoodles";
import { StatTile } from "@/components/ui/StatTile";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { courses } from "@/data/courses";
import { categories } from "@/data/categories";
import { creators } from "@/data/creators";
import { stats } from "@/data/stats";
import { testimonials } from "@/data/testimonials";

const AVATAR_TINTS = ["var(--primary)", "var(--ink)", "var(--accent)"];

const creatorBenefits = [
  "Keep 85% of every sale, no hidden fees",
  "Built-in audience of 52,000+ active learners",
  "Simple dashboard, weekly payouts",
];

const payoutBars = [40, 65, 50, 80, 95, 70, 85];

export default function HomePage() {
  return (
    <ScrollTrack>
      <Slide
        label="Home"
        depth={0.6}
        pinSpan={DEFAULT_PIN_SPAN}
        className="items-center"
        backdrop={
          <>
            <div aria-hidden className="absolute inset-0 bg-background/95" />
            <HeroDoodles />
            <RibbonMarquee
              items={categories.map((category) => category.name)}
              className="pointer-events-none absolute inset-x-0 bottom-16 z-0 hidden h-[calc(3rem+4vw)] w-full lg:block"
              rotateClassName="-rotate-2"
            />
          </>
        }
      >
        <Container className="relative z-10 grid items-center gap-[clamp(1.5rem,3.2vw,3.5rem)] lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-stretch">
          <div className="relative flex flex-col gap-[clamp(1.5rem,4vh,3rem)] lg:z-20 lg:h-full lg:justify-center lg:py-[clamp(1rem,6vh,4rem)] lg:pr-4">
            <div className="flex flex-col gap-[clamp(0.9rem,2vh,1.5rem)]">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-ink/10 bg-surface px-3.5 py-1.5 text-micro font-semibold uppercase tracking-wide text-ink shadow-sm shadow-ink/5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                New season · Six learning tracks
              </span>
              <h1 className="whitespace-nowrap text-[clamp(2.4rem,3.8vw,4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-ink">
                Get access to
                <br />
                <span className="text-accent underline decoration-wavy decoration-[3px] underline-offset-[7px]">
                  hundreds
                </span>{" "}
                of
                <br />
                courses
              </h1>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {creators.slice(0, 3).map((creator, index) => (
                    <span
                      key={creator.id}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background text-micro font-bold text-background"
                      style={{ backgroundColor: AVATAR_TINTS[index % AVATAR_TINTS.length] }}
                      aria-hidden
                    >
                      {creator.name.charAt(0)}
                    </span>
                  ))}
                </div>
                <span className="rounded-full bg-surface px-3 py-1.5 text-micro font-semibold text-ink shadow-sm shadow-ink/5">
                  {(courses[0].studentCount / 1000).toFixed(1)}k live
                </span>
              </div>
            </div>

            <RibbonMarquee
              items={categories.map((category) => category.name)}
              className="pointer-events-none -mx-[var(--gutter)] h-16 w-[calc(100%+2*var(--gutter))] sm:h-20 lg:hidden"
            />

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-micro font-semibold uppercase tracking-wide text-ink-muted">
                  Start where you are
                </span>
                <Link
                  href="/courses"
                  className="text-micro font-semibold text-accent transition-colors hover:text-ink"
                >
                  +{categories.length - 3} more →
                </Link>
              </div>
              <ul className="flex flex-col">
                {categories.slice(0, 3).map((category) => (
                  <li
                    key={category.id}
                    className="flex items-center justify-between gap-3 border-t border-ink/10 py-2.5 text-ink first:border-t-0"
                  >
                    <span className="text-meta font-semibold">
                      {category.name.charAt(0) + category.name.slice(1).toLowerCase()}
                    </span>
                    <span className="text-meta text-ink-muted">{category.courseCount}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative order-3 mx-auto self-center lg:order-0">
            <Link
              href={`/course/${courses[0].id}`}
              className="group relative z-30 mb-4 flex w-fit items-center gap-3 rounded-2xl bg-surface p-3 pr-10 shadow-lg shadow-ink/10 transition-shadow hover:shadow-xl lg:absolute lg:-top-12 lg:-right-5 lg:mb-0"
            >
              <span
                className="h-[clamp(2.25rem,5vh,3rem)] w-[clamp(2.25rem,5vh,3rem)] shrink-0 rounded-xl"
                style={{ backgroundColor: courses[0].coverColor }}
                aria-hidden
              />
              <span className="flex flex-col">
                <span className="text-micro font-semibold uppercase tracking-wide text-accent">
                  New course
                </span>
                <span className="text-meta font-bold text-ink">{courses[0].title}</span>
              </span>
              <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-soft/60 text-ink transition-transform group-hover:rotate-45">
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </Link>
            <HeroCardStack />
          </div>

          <div className="order-2 flex h-full flex-col justify-center gap-[var(--block)] lg:order-0 lg:justify-center lg:py-[clamp(1rem,6vh,4rem)] lg:pl-4">
            <div className="flex flex-col gap-[clamp(0.75rem,2vh,1.25rem)]">
              <p className="max-w-[34ch] text-lead text-ink-muted">
                Stream, learn, and level up with hundreds of expert-led courses across
                design, code, and business.
              </p>
              <div className="relative w-full max-w-md">
                <HeroSearchSpotlight />
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-1.5 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-background shadow-md shadow-accent/30"
                >
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/courses"
                  className={cn(
                    "inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-7 pr-2 text-lead font-bold text-background shadow-lg shadow-ink/20 hover:bg-ink/90",
                    PRESS_INTERACTIVE
                  )}
                >
                  Browse courses
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-background">
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </Link>
                <Link
                  href="/#creators"
                  className="group inline-flex items-center gap-1.5 text-meta font-semibold text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-ink"
                >
                  Meet the creators
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-micro font-semibold uppercase tracking-wide text-ink-muted">
                <span>{stats[1].value.toLocaleString()}+ courses</span>
                <span className="h-1 w-1 rounded-full bg-ink-muted/50" aria-hidden />
                <span>{stats[2].value.toLocaleString()}+ creators</span>
                <span className="h-1 w-1 rounded-full bg-ink-muted/50" aria-hidden />
                <span>{categories.length} tracks</span>
              </div>
            </div>
          </div>
        </Container>
      </Slide>

      <Slide
        label="Featured courses"
        depth={1.1}
        pinSpan={FEATURED_COURSES_PIN_SPAN}
        backdrop={<SectionDoodles seed={2} density="medium" />}
      >
        <Container width="wide" className="relative z-10 flex h-full flex-col">
          <FeaturedCourseCluster courses={courses} />
        </Container>
      </Slide>

      <Slide
        label="Learning paths"
        depth={0.9}
        pinSpan={DEFAULT_PIN_SPAN}
        backdrop={<SectionDoodles seed={3} density="rich" />}
      >
        <Container width="wide" className="relative z-10 flex flex-col gap-[var(--block)]">
          <div className="flex flex-col gap-3">
            <h2 className="text-title font-bold text-ink">Pick a path, keep momentum</h2>
            <p className="max-w-[60ch] text-lead text-ink-muted">
              Start with a category, then move straight into courses built for the next
              step in your career.
            </p>
          </div>

          <PathDeck categories={categories} />

          <div className="flex flex-col gap-3">
            <h3 className="text-subtitle font-semibold text-ink">Level up your career</h3>
            <CourseList courses={courses} />
          </div>
        </Container>
      </Slide>

      <Slide
        id="creators"
        label="For creators"
        depth={1}
        pinSpan={DEFAULT_PIN_SPAN}
        backdrop={<SectionDoodles seed={4} density="rich" />}
      >
        <Container className="relative z-10 flex flex-col gap-[var(--block)]">
          <div className="flex flex-col gap-3">
            <h2 className="max-w-[24ch] text-title font-bold text-ink">
              Built on a platform that keeps growing
            </h2>
          </div>

          <div className="grid gap-[clamp(1rem,2.4vw,2.5rem)] lg:grid-cols-2">
            <div className="flex flex-col gap-[var(--block)]">
              <div className="grid grid-cols-2 gap-[clamp(0.75rem,1.6vw,1.5rem)]">
                {stats.map((stat) => (
                  <StatTile key={stat.id} stat={stat} />
                ))}
              </div>
              <div className="flex h-[clamp(6rem,18vh,10rem)] items-end gap-[clamp(0.4rem,0.8vw,0.75rem)] rounded-3xl bg-surface p-[clamp(1rem,1.6vh+0.6vw,1.5rem)]">
                {payoutBars.map((height, index) => (
                  <div
                    key={index}
                    className="w-full max-w-6 rounded-full bg-primary/70"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-[clamp(0.75rem,2vh,1.5rem)]">
              <h3 className="text-subtitle font-semibold text-ink">
                Why creators choose ByteSpace
              </h3>
              <ul className="flex flex-col gap-[clamp(0.6rem,1.6vh,1rem)]">
                {creatorBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3 text-lead text-ink">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                    {benefit}
                  </li>
                ))}
              </ul>
              <Button className="w-fit">Join as a creator</Button>
            </div>
          </div>
        </Container>
      </Slide>

      <Slide
        label="Learner stories"
        depth={1.1}
        pinSpan={DEFAULT_PIN_SPAN}
        backdrop={<SectionDoodles seed={5} density="rich" />}
      >
        <Container width="wide" className="relative z-10 flex flex-col gap-[var(--block)]">
          <div className="flex flex-col gap-3">
            <h2 className="text-title font-bold text-ink">Loved by learners and creators</h2>
            <p className="text-lead text-ink-muted">
              Join {stats[0].value.toLocaleString()}+ people already building real skills.
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,17rem),1fr))] max-w-[min(100%,68rem)] gap-[clamp(0.75rem,1.6vw,1.5rem)]">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </Container>
      </Slide>

      <Slide
        label="Stay in the loop"
        depth={0.7}
        backdrop={<SectionDoodles seed={6} density="medium" />}
      >
        <Container width="wide" className="relative z-10">
          <Footer />
        </Container>
      </Slide>
    </ScrollTrack>
  );
}
