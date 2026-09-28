import Link from "next/link";
import { Search, ArrowRight, CheckCircle2 } from "lucide-react";
import { ScrollTrack } from "@/components/scroll/ScrollTrack";
import { Slide } from "@/components/layout/Slide";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Marquee } from "@/components/ui/Marquee";
import { CategoryPill } from "@/components/ui/CategoryPill";
import { CategoryTile } from "@/components/ui/CategoryTile";
import { FeaturedCourseCard } from "@/components/ui/FeaturedCourseCard";
import { HeroCourseCard } from "@/components/ui/HeroCourseCard";
import { StatTile } from "@/components/ui/StatTile";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { courses } from "@/data/courses";
import { categories } from "@/data/categories";
import { stats } from "@/data/stats";
import { testimonials } from "@/data/testimonials";
import { getCreatorById } from "@/lib/creators";

const creatorBenefits = [
  "Keep 85% of every sale, no hidden fees",
  "Built-in audience of 52,000+ active learners",
  "Simple dashboard, weekly payouts",
];

const payoutBars = [40, 65, 50, 80, 95, 70, 85];

export default function HomePage() {
  const heroCourse = courses[0];

  return (
    <ScrollTrack>
      <Slide className="items-center">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <Badge>Learning, rebuilt for builders</Badge>
            <h1 className="max-w-xl text-5xl font-bold leading-tight text-ink lg:text-7xl">
              Learn to build, one lesson at a time.
            </h1>
            <p className="max-w-md text-lg text-ink-muted">
              ByteSpace is a course-learning platform for people who want to ship real
              things, not just watch videos.
            </p>
            <Link
              href="/search"
              className="flex w-full max-w-sm items-center gap-3 rounded-full bg-surface px-5 py-3 shadow-sm shadow-ink/10 transition-shadow hover:shadow-md"
            >
              <Search className="h-4 w-4 text-ink-muted" aria-hidden />
              <span className="text-sm text-ink-muted">Search courses, topics, creators…</span>
            </Link>
            <div className="flex gap-4">
              <Button href="/search">Browse courses</Button>
              <Button href="/reviews" variant="outline">
                See reviews
              </Button>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div
              aria-hidden
              className="absolute -z-10 h-72 w-72 rounded-[40%_60%_65%_35%/40%_45%_55%_60%] bg-secondary/40 blur-2xl"
            />
            <HeroCourseCard course={heroCourse} progress={68} />
          </div>
        </Container>
      </Slide>

      <Slide>
        <Container className="flex h-full flex-col justify-center gap-8">
          <div className="flex flex-col gap-3">
            <Badge>Explore by category</Badge>
            <h2 className="max-w-xl text-3xl font-bold text-ink lg:text-4xl">
              Featured learning, organized your way
            </h2>
            <p className="max-w-xl text-ink-muted">
              Every course is grouped so you can go straight to what moves your career
              forward.
            </p>
          </div>

          <Marquee>
            {categories.map((category) => (
              <CategoryPill key={category.id} category={category} />
            ))}
          </Marquee>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <FeaturedCourseCard
                key={course.id}
                course={course}
                creator={getCreatorById(course.creatorId)}
              />
            ))}
          </div>
        </Container>
      </Slide>

      <Slide>
        <Container className="flex h-full flex-col justify-center gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-bold text-ink lg:text-4xl">
              Pick a path, keep momentum
            </h2>
            <p className="max-w-xl text-ink-muted">
              Start with a category, then move straight into courses built for the next
              step in your career.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.slice(0, 3).map((category) => (
              <CategoryTile key={category.id} category={category} />
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold text-ink">Level up your career</h3>
            <ol className="flex flex-col gap-3">
              {courses.map((course) => (
                <li key={course.id}>
                  <Link
                    href={`/course/${course.id}`}
                    className="flex items-center justify-between gap-4 rounded-2xl bg-surface px-6 py-4 transition-colors hover:bg-soft/30"
                  >
                    <span className="font-semibold text-ink">{course.title}</span>
                    <span className="hidden text-sm text-ink-muted sm:inline">
                      {course.category} · {course.level}
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-ink-muted" aria-hidden />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Slide>

      <Slide id="creators">
        <Container className="flex h-full flex-col justify-center gap-10">
          <div className="flex flex-col gap-3">
            <Badge>For creators</Badge>
            <h2 className="max-w-xl text-3xl font-bold text-ink lg:text-4xl">
              Built on a platform that keeps growing
            </h2>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <StatTile key={stat.id} stat={stat} />
                ))}
              </div>
              <div className="flex h-40 items-end gap-3 rounded-3xl bg-surface p-6">
                {payoutBars.map((height, index) => (
                  <div
                    key={index}
                    className="w-6 rounded-full bg-primary/70"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="text-lg font-semibold text-ink">Why creators choose ByteSpace</h3>
              <ul className="flex flex-col gap-4">
                {creatorBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3 text-ink">
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

      <Slide>
        <Container className="flex h-full flex-col justify-center gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-bold text-ink lg:text-4xl">
              Loved by learners and creators
            </h2>
            <p className="text-ink-muted">
              Join {stats[0].value.toLocaleString()}+ people already building real skills.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </Container>
      </Slide>

      <Slide className="justify-center">
        <Container>
          <Footer />
        </Container>
      </Slide>
    </ScrollTrack>
  );
}
