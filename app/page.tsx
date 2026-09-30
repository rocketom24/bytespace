import Link from "next/link";
import { ArrowRight, ArrowUpRight, Asterisk, CheckCircle2 } from "lucide-react";
import { ScrollTrack } from "@/components/scroll/ScrollTrack";
import { Slide } from "@/components/layout/Slide";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { RibbonMarquee } from "@/components/ui/RibbonMarquee";
import { CategoryTile } from "@/components/ui/CategoryTile";
import { FeaturedCourseCluster } from "@/components/ui/FeaturedCourseCluster";
import { HeroCardStack } from "@/components/ui/HeroCardStack";
import { HeroDoodles } from "@/components/ui/HeroDoodles";
import { HeroSearchSpotlight } from "@/components/ui/HeroSearchSpotlight";
import { SectionDoodles } from "@/components/ui/SectionDoodles";
import { StatTile } from "@/components/ui/StatTile";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { courses } from "@/data/courses";
import { categories } from "@/data/categories";
import { stats } from "@/data/stats";
import { testimonials } from "@/data/testimonials";

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
        className="items-center"
        backdrop={
          <>
            <HeroDoodles />
            <RibbonMarquee
              items={categories.map((category) => category.name)}
              className="pointer-events-none absolute inset-x-0 top-1/2 z-0 hidden h-[22dvh] max-h-40 min-h-24 w-full -translate-y-1/2 lg:block"
              rotateClassName="-rotate-6 scale-125"
            />
          </>
        }
      >
        <Container className="relative z-10 grid items-center gap-[var(--block)] lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
          <div className="flex flex-col gap-[var(--block)] lg:h-full lg:justify-between lg:py-[clamp(1rem,6vh,4rem)]">
            <h1 className="max-w-[20ch] text-display font-bold text-ink">
              Get Access to Hundreds of Courses Available
            </h1>
            <RibbonMarquee
              items={categories.map((category) => category.name)}
              className="pointer-events-none -mx-[var(--gutter)] h-16 w-[calc(100%+2*var(--gutter))] sm:h-20 lg:hidden"
            />
            <ul className="flex flex-col gap-2">
              {categories.slice(0, 3).map((category) => (
                <li
                  key={category.id}
                  className="flex items-center gap-2 text-micro font-semibold uppercase tracking-wide text-ink-muted"
                >
                  <Asterisk className="h-3.5 w-3.5 text-primary" aria-hidden />
                  {category.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative order-3 mx-auto self-center lg:order-0">
            <div
              aria-hidden
              className="absolute -z-10 h-[clamp(14rem,34vh,20rem)] w-[clamp(14rem,34vh,20rem)] rounded-[40%_60%_65%_35%/40%_45%_55%_60%] bg-secondary/40 blur-2xl"
            />
            <HeroCardStack />
          </div>

          <div className="order-2 flex h-full flex-col justify-between gap-[var(--block)] lg:order-0 lg:py-[clamp(1rem,6vh,4rem)]">
            <Link
              href={`/course/${courses[0].id}`}
              className="group relative flex w-fit items-center gap-3 self-start rounded-2xl bg-surface p-3 pr-10 shadow-lg shadow-ink/10 transition-shadow hover:shadow-xl lg:self-end"
            >
              <span
                className="h-[clamp(2.25rem,5vh,3rem)] w-[clamp(2.25rem,5vh,3rem)] shrink-0 rounded-xl"
                style={{ backgroundColor: courses[0].coverColor }}
                aria-hidden
              />
              <span className="flex flex-col">
                <span className="text-micro font-semibold uppercase tracking-wide text-primary">
                  New course
                </span>
                <span className="text-meta font-bold text-ink">{courses[0].title}</span>
              </span>
              <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-soft/60 text-ink transition-transform group-hover:rotate-45">
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </Link>

            <div className="flex flex-col gap-[clamp(0.75rem,2vh,1.25rem)] lg:mt-[max(14rem,32vh)]">
              <p className="max-w-[34ch] text-lead text-ink-muted">
                Stream, learn, and level up with hundreds of expert-led courses across
                design, code, and business.
              </p>
              <HeroSearchSpotlight />
              <div className="flex flex-wrap items-center gap-3">
                <Button href="/courses">Browse courses</Button>
                <Link
                  href="/reviews"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-ink shadow-sm transition-transform hover:scale-105"
                  aria-label="See reviews"
                >
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Slide>

      <Slide
        label="Featured courses"
        depth={1.1}
        backdrop={<SectionDoodles seed={2} density="medium" />}
      >
        <Container width="wide" className="relative z-10 flex h-full flex-col">
          <FeaturedCourseCluster courses={courses} />
        </Container>
      </Slide>

      <Slide
        label="Learning paths"
        depth={0.9}
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

          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,14rem),1fr))] max-w-[min(100%,68rem)] gap-[clamp(0.75rem,1.6vw,1.25rem)]">
            {categories.slice(0, 3).map((category) => (
              <CategoryTile key={category.id} category={category} />
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-subtitle font-semibold text-ink">Level up your career</h3>
            <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <li key={course.id}>
                  <Link
                    href={`/course/${course.id}`}
                    className="flex h-full items-center justify-between gap-3 rounded-2xl bg-surface px-[clamp(1rem,1.4vw,1.5rem)] py-[clamp(0.6rem,1.4vh,1rem)] transition-colors duration-300 hover:bg-soft/30"
                  >
                    <span className="text-meta font-semibold text-ink">{course.title}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-ink-muted" aria-hidden />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Slide>

      <Slide
        id="creators"
        label="For creators"
        depth={1}
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
