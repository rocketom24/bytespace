import {
  Book,
  BookOpen,
  GraduationCap,
  PenLine,
  PenTool,
  Code2,
  MousePointer2,
  Lightbulb,
  PlayCircle,
  BarChart3,
  LineChart,
  StickyNote,
  Notebook,
  Compass,
  Target,
  Puzzle,
  Award,
  Rocket,
  CheckCircle2,
  Brain,
  Ruler,
  FlaskConical,
  FileText,
  Bookmark,
  Sparkle,
  Sparkles,
  Star,
  Pencil,
  Telescope,
  Music,
  Palette,
  Orbit,
  Shapes,
  NotebookPen,
  ClipboardList,
  Timer,
  Trophy,
  Sigma,
  Binary,
  Zap,
  Feather,
  Atom,
  Highlighter,
  Paperclip,
  Calculator,
  Beaker,
  Glasses,
  Hash,
  Laptop,
  School,
  Library,
  ScrollText,
  BookMarked,
  ClipboardCheck,
  PencilRuler,
  Medal,
  BadgeCheck,
  Presentation,
  MonitorPlay,
  Video,
  Headphones,
  Backpack,
  ListChecks,
  type LucideIcon,
} from "lucide-react";

export const TINT_A = "color-mix(in srgb, var(--primary) 55%, white)";
export const TINT_B = "color-mix(in srgb, var(--secondary) 45%, white)";
export const TINT_C = "color-mix(in srgb, var(--soft) 70%, white)";
export const TINT_D = "color-mix(in srgb, var(--primary) 30%, var(--secondary))";

export const PINE = "color-mix(in srgb, var(--primary) 56%, var(--ink))";
export const FOREST = "color-mix(in srgb, var(--primary) 78%, var(--ink))";
export const JADE = "color-mix(in srgb, var(--secondary) 70%, var(--primary))";
export const MINT = "color-mix(in srgb, var(--soft) 50%, var(--surface))";
export const LIME = "color-mix(in srgb, var(--secondary) 58%, var(--background))";
export const HAZE = "color-mix(in srgb, var(--soft) 34%, var(--surface))";

export const CORAL = "color-mix(in srgb, var(--accent) 55%, white)";
export const TERRACOTTA = "color-mix(in srgb, var(--accent) 70%, var(--ink))";
export const RUST = "color-mix(in srgb, var(--accent) 45%, var(--ink-muted))";

export const PALETTE = [PINE, FOREST, JADE, MINT, LIME, HAZE, TINT_A, TINT_B, TINT_C, TINT_D, CORAL, TERRACOTTA, RUST];

export const ICON_POOL: LucideIcon[] = [
  Book,
  BookOpen,
  GraduationCap,
  PenLine,
  PenTool,
  Code2,
  MousePointer2,
  Lightbulb,
  PlayCircle,
  BarChart3,
  LineChart,
  StickyNote,
  Notebook,
  Compass,
  Target,
  Puzzle,
  Award,
  Rocket,
  CheckCircle2,
  Brain,
  Ruler,
  FlaskConical,
  FileText,
  Bookmark,
  Sparkle,
  Sparkles,
  Star,
  Pencil,
  Telescope,
  Music,
  Palette,
  Orbit,
  Shapes,
  NotebookPen,
  ClipboardList,
  Timer,
  Trophy,
  Sigma,
  Binary,
  Zap,
  Feather,
  Atom,
  Highlighter,
  Paperclip,
  Calculator,
  Beaker,
  Glasses,
  Hash,
  Laptop,
  School,
  Library,
  ScrollText,
  BookMarked,
  ClipboardCheck,
  PencilRuler,
  Medal,
  BadgeCheck,
  Presentation,
  MonitorPlay,
  Video,
  Headphones,
  Backpack,
  ListChecks,
];

export const TEXT_COLOR_CLASSES = ["text-primary", "text-secondary", "text-soft", "text-ink", "text-ink-muted"];

export type MarkVariant = "squiggle" | "scribble" | "swirl" | "burst" | "dots" | "arc";

export function MarkShape({ variant }: { variant: MarkVariant }) {
  switch (variant) {
    case "dots":
      return (
        <g fill="currentColor">
          <circle cx="8" cy="10" r="3" />
          <circle cx="21" cy="6" r="2.2" />
          <circle cx="30" cy="18" r="3.4" />
          <circle cx="14" cy="27" r="2.4" />
        </g>
      );
    case "arc":
      return (
        <path
          d="M4 30C4 15 15 4 30 4"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray="1 7"
        />
      );
    case "squiggle":
      return (
        <path
          d="M2 20 Q 11 6, 20 20 T 38 20"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
        />
      );
    case "scribble":
      return (
        <path
          d="M20 4C11 4 4 11 5 20C6 29 13 35 22 34C31 33 34 24 30 16C27 10 19 7 12 10"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
      );
    case "swirl":
      return (
        <path
          d="M4 24C4 12 15 4 26 8C35 11 37 22 30 27C24 31 17 27 18 20"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
      );
    case "burst":
      return (
        <g stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
          <path d="M13 1v24" />
          <path d="M1 13h24" />
          <path d="M4.5 4.5l17 17" />
          <path d="M21.5 4.5l-17 17" />
        </g>
      );
  }
}

export const GRAIN_STYLE: React.CSSProperties = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
};

export const VIGNETTE_STYLE: React.CSSProperties = {
  background:
    "radial-gradient(ellipse 54% 46% at 50% 50%, color-mix(in srgb, var(--background) 80%, transparent), transparent 74%)",
};

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function rand() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function pickIcons(rand: () => number, count: number): LucideIcon[] {
  const pool = [...ICON_POOL];
  const picked: LucideIcon[] = [];
  for (let i = 0; i < count && pool.length > 0; i++) {
    const index = Math.floor(rand() * pool.length);
    picked.push(pool.splice(index, 1)[0]);
  }
  return picked;
}
