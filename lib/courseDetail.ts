import { mulberry32 } from "@/components/ui/decor";
import type { Course } from "@/data/courses";
import { reviews as realReviews, type Review } from "@/data/reviews";

export type PlaylistLesson = {
  id: string;
  order: number;
  title: string;
  durationMinutes: number;
  locked: boolean;
  completed: boolean;
};

export type PlaylistSection = {
  id: string;
  title: string;
  lessons: PlaylistLesson[];
};

const LESSON_TOPIC_POOL = [
  "Setting up your workspace",
  "Core concepts explained",
  "Hands-on walkthrough",
  "Common mistakes to avoid",
  "Building the first feature",
  "Debugging like a pro",
  "Structuring real projects",
  "Performance considerations",
  "Testing your work",
  "Refactoring for clarity",
  "Working with real data",
  "Deploying to production",
  "Q&A and troubleshooting",
  "Advanced patterns",
  "Putting it all together",
];

/** Seeded, deterministic-per-course fake curriculum (fake/demo data — Lesson has no sections/lock/complete fields). */
export function buildCurriculum(course: Course): PlaylistSection[] {
  const rand = mulberry32(Number(course.id) * 97 + course.lessonCount);
  const sectionDefs = [
    { title: "Getting started", count: 2 + Math.floor(rand() * 2) },
    { title: "Core concepts", count: 3 + Math.floor(rand() * 2) },
    { title: `Building with ${course.category}`, count: 3 + Math.floor(rand() * 2) },
    { title: "Finishing strong", count: 1 + Math.floor(rand() * 2) },
  ];

  const pool = [...LESSON_TOPIC_POOL];
  const nextTopic = () => pool.splice(Math.floor(rand() * pool.length), 1)[0] ?? "Lesson";

  let order = 0;
  let flatIndex = 0;
  const unlockedCount = course.price === 0 ? Infinity : 2;

  return sectionDefs.map((section, sectionIndex) => ({
    id: `section-${sectionIndex}`,
    title: section.title,
    lessons: Array.from({ length: section.count }, () => {
      order += 1;
      const index = flatIndex++;
      return {
        id: `${course.id}-lesson-${order}`,
        order,
        title: nextTopic(),
        durationMinutes: 4 + Math.floor(rand() * 19),
        locked: index >= unlockedCount,
        completed: index === 0,
      };
    }),
  }));
}

const FAKE_REVIEW_POOL: { author: string; role: string; rating: number; quote: string; timeAgo: string }[] = [
  {
    author: "Priya S.",
    role: "Frontend Developer",
    rating: 5,
    quote: "Clear, well-paced, and the projects actually resemble real work. No filler.",
    timeAgo: "2 weeks ago",
  },
  {
    author: "Tomás R.",
    role: "Bootcamp grad",
    rating: 5,
    quote: "Best explanation of this topic I've found anywhere. Rewatched a couple sections just to take notes.",
    timeAgo: "1 month ago",
  },
  {
    author: "Grace N.",
    role: "Product Manager",
    rating: 4,
    quote: "Solid course. A couple of the later lessons move fast, but the instructor answers questions quickly.",
    timeAgo: "1 month ago",
  },
  {
    author: "Ben O.",
    role: "Self-taught developer",
    rating: 5,
    quote: "Exactly the depth I needed — practical, not academic. Already using what I learned at work.",
    timeAgo: "6 weeks ago",
  },
  {
    author: "Wei L.",
    role: "Career switcher",
    rating: 4,
    quote: "Great structure. Wish there were a couple more exercises, but the core material is excellent.",
    timeAgo: "2 months ago",
  },
  {
    author: "Ana F.",
    role: "Junior Engineer",
    rating: 5,
    quote: "Finished this in a weekend and immediately felt more confident shipping real features.",
    timeAgo: "3 months ago",
  },
];

export type CourseReview = {
  id: string;
  author: string;
  role?: string;
  rating: number;
  quote: string;
  timeAgo: string;
};

/** Merges any real per-course reviews with page-scoped fake ones so every course shows a full, realistic set. */
export function buildReviews(course: Course): { reviews: CourseReview[]; breakdown: number[]; average: number } {
  const own: CourseReview[] = realReviews
    .filter((review: Review) => review.courseId === course.id)
    .map((review) => ({ id: review.id, author: review.author, rating: review.rating, quote: review.quote, timeAgo: "3 weeks ago" }));

  const rand = mulberry32(Number(course.id) * 53 + 7);
  const fakePool = [...FAKE_REVIEW_POOL];
  const fill: CourseReview[] = [];
  while (own.length + fill.length < 6 && fakePool.length > 0) {
    const picked = fakePool.splice(Math.floor(rand() * fakePool.length), 1)[0];
    fill.push({ id: `${course.id}-fake-review-${fill.length}`, ...picked });
  }

  const reviews = [...own, ...fill];
  const breakdown = [0, 0, 0, 0, 0]; // index 0 = 5 stars ... index 4 = 1 star
  reviews.forEach((review) => {
    const bucket = Math.min(5, Math.max(1, Math.round(review.rating)));
    breakdown[5 - bucket] += 1;
  });
  const average = reviews.length
    ? Math.round((reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length) * 10) / 10
    : course.rating;

  return { reviews, breakdown, average };
}

export function buildFAQ(course: Course, creatorName?: string): { question: string; answer: string }[] {
  return [
    {
      question: "Do I need any prior experience for this course?",
      answer:
        course.level === "Beginner"
          ? "No experience needed — this course starts from the fundamentals and builds up step by step."
          : `This is a ${course.level.toLowerCase()}-level course, so you should already be comfortable with the basics of ${course.category.toLowerCase()}.`,
    },
    {
      question: "Will I get a certificate when I finish?",
      answer: "Yes. A completion certificate is added to your profile automatically once you finish every lesson.",
    },
    {
      question: "How long do I have access to the course?",
      answer: "Lifetime access, including all future updates to this course at no extra cost.",
    },
    {
      question: "What if the course isn't right for me?",
      answer: "You're covered by a 30-day money-back guarantee — no questions asked.",
    },
    {
      question: "Can I ask the instructor questions?",
      answer: creatorName
        ? `Yes — ${creatorName} personally answers student questions in the course Q&A.`
        : "Yes — the instructor personally answers student questions in the course Q&A.",
    },
    {
      question: "Is this course kept up to date?",
      answer: `Yes, this course is actively maintained and was last updated ${fakeLastUpdated(course)}.`,
    },
  ];
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September"];

/** Deterministic fake "last updated" label — Course has no timestamp field. */
export function fakeLastUpdated(course: Course): string {
  const monthIndex = (Number(course.id) * 3 + course.lessonCount) % MONTHS.length;
  return `${MONTHS[monthIndex]} 2026`;
}

/** Deterministic fake original price/discount for display — Course has no discount field. */
export function fakePricing(course: Course): { originalPrice: number | null; discountPct: number | null } {
  if (course.price === 0) return { originalPrice: null, discountPct: null };
  const originalPrice = Math.round(course.price * 1.55);
  const discountPct = Math.round((1 - course.price / originalPrice) * 100);
  return { originalPrice, discountPct };
}

export function pickRelatedCourses(course: Course, allCourses: Course[]): Course[] {
  const sameCategory = allCourses.filter((item) => item.id !== course.id && item.category === course.category);
  const rest = allCourses.filter((item) => item.id !== course.id && item.category !== course.category);
  return [...sameCategory, ...rest].slice(0, 3);
}
