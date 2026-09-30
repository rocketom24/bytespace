import { Infinity as InfinityIcon } from "lucide-react";
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
  type LucideIcon,
} from "lucide-react";
import {
  TINT_A,
  TINT_B,
  TINT_C,
  PINE,
  FOREST,
  CORAL,
  TERRACOTTA,
  RUST,
  MarkShape,
  GRAIN_STYLE,
  VIGNETTE_STYLE,
} from "@/components/ui/decor";

type Doodle = {
  Icon: LucideIcon;
  size: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  rotate: number;
  color?: string;
  colorStyle?: string;
  opacity: string;
  strokeWidth?: number;
  fill?: boolean;
  hiddenBelow: boolean;
};

type Stroke = {
  d: string;
  width: number;
  from: string;
  to: string;
};

type StrokeLayer = {
  blur: number;
  opacity: number;
  strokes: Stroke[];
};

type Ring = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  size: number;
  color: string;
  opacity: string;
  dashed: boolean;
  filled?: boolean;
  hiddenBelow: boolean;
};

type Mark = {
  variant: "squiggle" | "scribble" | "swirl" | "burst";
  size: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  rotate: number;
  color?: string;
  colorStyle?: string;
  opacity: string;
  hiddenBelow: boolean;
};

const strokeLayers: StrokeLayer[] = [
  {
    blur: 2,
    opacity: 0.5,
    strokes: [
      { d: "M -10 16 C 16 5, 32 27, 60 14 S 98 -1, 118 9", width: 5, from: FOREST, to: "var(--primary)" },
      { d: "M 118 84 C 98 93, 80 74, 58 89", width: 4, from: TERRACOTTA, to: PINE },
      { d: "M -14 62 C -5 72, -1 84, -6 96", width: 4, from: FOREST, to: "var(--primary)" },
      { d: "M 91 16 C 100 32, 93 46, 103 58", width: 3, from: PINE, to: CORAL },
      { d: "M -16 34 C -7 44, -9 56, -1 66", width: 4, from: "var(--primary)", to: FOREST },
    ],
  },
];

const doodles: Doodle[] = [
  // top-left corner cluster (kept clear of the headline at cramped lg widths)
  { Icon: GraduationCap, size: 68, top: "1%", left: "2%", rotate: -12, color: "text-primary", opacity: "opacity-[0.16]", hiddenBelow: false },
  { Icon: Notebook, size: 24, top: "3%", left: "16%", rotate: 10, color: "text-soft", opacity: "opacity-[0.24]", hiddenBelow: false },
  { Icon: PenLine, size: 30, top: "13%", left: "11%", rotate: -20, color: "text-ink", opacity: "opacity-[0.11]", hiddenBelow: false },
  { Icon: Compass, size: 20, top: "15%", left: "5%", rotate: 16, color: "text-primary", opacity: "opacity-[0.22]", hiddenBelow: false },
  { Icon: Sparkle, size: 16, top: "8%", left: "22%", rotate: 4, color: "text-secondary", opacity: "opacity-[0.26]", fill: true, hiddenBelow: false },
  { Icon: Feather, size: 34, top: "20%", left: "1%", rotate: -30, color: "text-ink-muted", opacity: "opacity-[0.1]", hiddenBelow: false },
  { Icon: Highlighter, size: 22, top: "6%", left: "9%", rotate: 24, colorStyle: TINT_A, opacity: "opacity-[0.3]", strokeWidth: 1.75, hiddenBelow: false },
  { Icon: Hash, size: 18, top: "18%", left: "19%", rotate: -6, color: "text-ink-muted", opacity: "opacity-[0.14]", strokeWidth: 2, hiddenBelow: false },

  // top-right corner cluster (kept clear of the new-course card at cramped lg widths)
  { Icon: BarChart3, size: 48, top: "4%", right: "3%", rotate: 9, color: "text-ink", opacity: "opacity-[0.11]", hiddenBelow: false },
  { Icon: Target, size: 26, top: "7%", right: "15%", rotate: -11, color: "text-secondary", opacity: "opacity-[0.2]", hiddenBelow: false },
  { Icon: LineChart, size: 22, top: "9%", right: "11%", rotate: -7, color: "text-secondary", opacity: "opacity-[0.2]", hiddenBelow: false },
  { Icon: Puzzle, size: 16, top: "10%", right: "5%", rotate: 18, color: "text-primary", opacity: "opacity-[0.24]", fill: true, hiddenBelow: false },
  { Icon: Star, size: 14, top: "2%", right: "22%", rotate: -8, color: "text-ink-muted", opacity: "opacity-[0.18]", hiddenBelow: false },
  { Icon: Orbit, size: 38, top: "18%", right: "1%", rotate: 12, color: "text-soft", opacity: "opacity-[0.22]", hiddenBelow: false },
  { Icon: Calculator, size: 24, top: "1%", right: "10%", rotate: -14, colorStyle: TINT_B, opacity: "opacity-[0.28]", strokeWidth: 1.75, hiddenBelow: false },
  { Icon: Glasses, size: 20, top: "16%", right: "20%", rotate: 8, color: "text-ink-muted", opacity: "opacity-[0.13]", hiddenBelow: false },

  // bottom-left corner cluster (kept clear of the category list at cramped lg widths)
  { Icon: BookOpen, size: 56, bottom: "4%", left: "4%", rotate: -6, color: "text-ink", opacity: "opacity-[0.11]", hiddenBelow: false },
  { Icon: Award, size: 26, bottom: "7%", left: "16%", rotate: 8, color: "text-soft", opacity: "opacity-[0.24]", hiddenBelow: false },
  { Icon: Book, size: 24, bottom: "6%", left: "11%", rotate: 13, color: "text-primary", opacity: "opacity-[0.18]", hiddenBelow: false },
  { Icon: PenTool, size: 18, bottom: "9%", left: "5%", rotate: -16, color: "text-secondary", opacity: "opacity-[0.22]", hiddenBelow: false },
  { Icon: Sigma, size: 20, bottom: "17%", left: "20%", rotate: 6, color: "text-ink-muted", opacity: "opacity-[0.14]", hiddenBelow: false },
  { Icon: Palette, size: 42, bottom: "1%", left: "22%", rotate: -9, color: "text-secondary", opacity: "opacity-[0.14]", hiddenBelow: false },
  { Icon: Paperclip, size: 20, bottom: "12%", left: "1%", rotate: 30, colorStyle: TINT_A, opacity: "opacity-[0.3]", strokeWidth: 1.75, hiddenBelow: false },
  { Icon: Beaker, size: 22, bottom: "2%", left: "13%", rotate: -18, color: "text-ink-muted", opacity: "opacity-[0.12]", hiddenBelow: false },

  // bottom-right corner cluster (kept clear of the buttons row at cramped lg widths)
  { Icon: Lightbulb, size: 44, bottom: "1%", right: "4%", rotate: 7, color: "text-primary", opacity: "opacity-[0.17]", hiddenBelow: false },
  { Icon: Rocket, size: 24, bottom: "3%", right: "16%", rotate: 18, color: "text-secondary", opacity: "opacity-[0.2]", hiddenBelow: false },
  { Icon: StickyNote, size: 20, bottom: "2%", right: "11%", rotate: -10, color: "text-ink", opacity: "opacity-[0.1]", hiddenBelow: false },
  { Icon: CheckCircle2, size: 16, bottom: "4%", right: "5%", rotate: -13, color: "text-primary", opacity: "opacity-[0.22]", fill: true, hiddenBelow: false },
  { Icon: Zap, size: 18, bottom: "14%", right: "20%", rotate: 22, color: "text-soft", opacity: "opacity-[0.26]", hiddenBelow: false },
  { Icon: Trophy, size: 30, bottom: "18%", right: "2%", rotate: -6, color: "text-ink-muted", opacity: "opacity-[0.12]", hiddenBelow: false },
  { Icon: InfinityIcon, size: 22, bottom: "10%", right: "13%", rotate: -8, colorStyle: TINT_B, opacity: "opacity-[0.28]", strokeWidth: 1.75, hiddenBelow: false },
  { Icon: FlaskConical, size: 18, bottom: "1%", right: "24%", rotate: 12, color: "text-ink-muted", opacity: "opacity-[0.12]", hiddenBelow: false },

  // wide-screen left gutter (xl+ only, where the container leaves real margin beside the text column)
  { Icon: Code2, size: 78, top: "29%", left: "1%", rotate: -6, color: "text-secondary", opacity: "opacity-[0.16]", hiddenBelow: true },
  { Icon: Brain, size: 28, top: "37%", left: "7%", rotate: 10, color: "text-primary", opacity: "opacity-[0.19]", hiddenBelow: true },
  { Icon: MousePointer2, size: 38, top: "60%", left: "3%", rotate: 9, color: "text-ink", opacity: "opacity-[0.11]", hiddenBelow: true },
  { Icon: Ruler, size: 24, top: "69%", left: "8%", rotate: -13, color: "text-soft", opacity: "opacity-[0.24]", hiddenBelow: true },
  { Icon: Telescope, size: 30, top: "48%", left: "1%", rotate: 15, color: "text-ink-muted", opacity: "opacity-[0.13]", hiddenBelow: true },
  { Icon: GraduationCap, size: 128, top: "44%", left: "-4%", rotate: -8, color: "text-primary", opacity: "opacity-[0.06]", hiddenBelow: true },
  { Icon: Award, size: 26, top: "8%", left: "6%", rotate: 20, colorStyle: TINT_A, opacity: "opacity-[0.24]", hiddenBelow: true },
  { Icon: Music, size: 22, top: "78%", left: "5%", rotate: -10, color: "text-secondary", opacity: "opacity-[0.16]", hiddenBelow: true },

  // wide-screen right gutter (xl+ only, where the container leaves real margin beside the card column)
  { Icon: PlayCircle, size: 64, top: "30%", right: "2%", rotate: 5, color: "text-secondary", opacity: "opacity-[0.16]", hiddenBelow: true },
  { Icon: FlaskConical, size: 26, top: "39%", right: "8%", rotate: -8, color: "text-primary", opacity: "opacity-[0.19]", hiddenBelow: true },
  { Icon: FileText, size: 32, top: "60%", right: "3%", rotate: 8, color: "text-ink", opacity: "opacity-[0.11]", hiddenBelow: true },
  { Icon: Bookmark, size: 22, top: "70%", right: "9%", rotate: -12, color: "text-soft", opacity: "opacity-[0.24]", hiddenBelow: true },
  { Icon: Atom, size: 30, top: "48%", right: "1%", rotate: -18, color: "text-ink-muted", opacity: "opacity-[0.13]", hiddenBelow: true },
  { Icon: Sparkles, size: 110, top: "44%", right: "-4%", rotate: 10, color: "text-secondary", opacity: "opacity-[0.06]", hiddenBelow: true },
  { Icon: Trophy, size: 24, top: "10%", right: "7%", rotate: -18, colorStyle: TINT_B, opacity: "opacity-[0.24]", hiddenBelow: true },
  { Icon: Compass, size: 22, top: "78%", right: "6%", rotate: 14, color: "text-primary", opacity: "opacity-[0.16]", hiddenBelow: true },

  // small confetti accents sprinkled through the safe margins for extra rhythm
  { Icon: NotebookPen, size: 20, top: "24%", left: "13%", rotate: -14, color: "text-primary", opacity: "opacity-[0.1]", hiddenBelow: true },
  { Icon: ClipboardList, size: 22, top: "24%", right: "13%", rotate: 11, color: "text-secondary", opacity: "opacity-[0.1]", hiddenBelow: true },
  { Icon: Timer, size: 18, bottom: "24%", left: "14%", rotate: 9, color: "text-ink-muted", opacity: "opacity-[0.1]", hiddenBelow: true },
  { Icon: Binary, size: 18, bottom: "24%", right: "14%", rotate: -10, color: "text-ink-muted", opacity: "opacity-[0.1]", hiddenBelow: true },
  { Icon: Pencil, size: 26, top: "1%", left: "33%", rotate: -24, color: "text-soft", opacity: "opacity-[0.13]", hiddenBelow: true },
  { Icon: Music, size: 22, bottom: "1%", right: "30%", rotate: 16, color: "text-primary", opacity: "opacity-[0.1]", hiddenBelow: true },
  { Icon: Shapes, size: 24, top: "1%", right: "34%", rotate: 8, color: "text-ink-muted", opacity: "opacity-[0.1]", hiddenBelow: true },
  { Icon: Star, size: 12, top: "27%", left: "17%", rotate: 20, colorStyle: TINT_C, opacity: "opacity-[0.4]", fill: true, hiddenBelow: true },
  { Icon: Star, size: 12, bottom: "27%", right: "17%", rotate: -20, colorStyle: TINT_C, opacity: "opacity-[0.4]", fill: true, hiddenBelow: true },
  { Icon: Sparkle, size: 14, top: "34%", right: "16%", rotate: -6, color: "text-secondary", opacity: "opacity-[0.18]", fill: true, hiddenBelow: true },

  // extra color-mix pass: coral + terracotta worked through the same green family, more density overall
  { Icon: Rocket, size: 22, top: "31%", left: "16%", rotate: -16, colorStyle: TERRACOTTA, opacity: "opacity-[0.22]", hiddenBelow: true },
  { Icon: Lightbulb, size: 20, top: "42%", left: "10%", rotate: 10, color: "text-accent", opacity: "opacity-[0.2]", hiddenBelow: true },
  { Icon: Star, size: 14, top: "52%", left: "6%", rotate: -12, colorStyle: CORAL, opacity: "opacity-[0.26]", fill: true, hiddenBelow: true },
  { Icon: Zap, size: 20, top: "65%", left: "12%", rotate: 18, colorStyle: RUST, opacity: "opacity-[0.2]", hiddenBelow: true },
  { Icon: Sparkles, size: 18, top: "75%", left: "18%", rotate: -8, color: "text-accent", opacity: "opacity-[0.16]", hiddenBelow: true },
  { Icon: Puzzle, size: 22, top: "36%", right: "17%", rotate: 14, colorStyle: TERRACOTTA, opacity: "opacity-[0.22]", fill: true, hiddenBelow: true },
  { Icon: Target, size: 18, top: "44%", right: "10%", rotate: -9, color: "text-accent", opacity: "opacity-[0.2]", hiddenBelow: true },
  { Icon: CheckCircle2, size: 16, top: "56%", right: "6%", rotate: 12, colorStyle: CORAL, opacity: "opacity-[0.24]", hiddenBelow: true },
  { Icon: Award, size: 20, top: "66%", right: "13%", rotate: -14, colorStyle: RUST, opacity: "opacity-[0.2]", hiddenBelow: true },
  { Icon: Sigma, size: 18, top: "76%", right: "19%", rotate: 9, color: "text-primary", opacity: "opacity-[0.18]", hiddenBelow: true },
  { Icon: Compass, size: 18, top: "5%", left: "26%", rotate: -10, color: "text-secondary", opacity: "opacity-[0.2]", hiddenBelow: false },
  { Icon: Feather, size: 16, bottom: "6%", right: "27%", rotate: 16, colorStyle: TERRACOTTA, opacity: "opacity-[0.22]", hiddenBelow: false },
  { Icon: Atom, size: 20, bottom: "30%", left: "9%", rotate: 8, colorStyle: CORAL, opacity: "opacity-[0.18]", hiddenBelow: true },
  { Icon: Beaker, size: 20, bottom: "34%", right: "8%", rotate: -11, color: "text-accent", opacity: "opacity-[0.18]", hiddenBelow: true },
  { Icon: Hash, size: 14, top: "48%", left: "23%", rotate: 20, colorStyle: RUST, opacity: "opacity-[0.16]", hiddenBelow: true },
  { Icon: Binary, size: 14, top: "58%", right: "24%", rotate: -18, color: "text-primary", opacity: "opacity-[0.16]", hiddenBelow: true },
  { Icon: PenTool, size: 18, bottom: "44%", left: "16%", rotate: -6, colorStyle: TERRACOTTA, opacity: "opacity-[0.18]", hiddenBelow: true },
  { Icon: Bookmark, size: 18, bottom: "48%", right: "17%", rotate: 12, color: "text-accent", opacity: "opacity-[0.18]", hiddenBelow: true },
];

const rings: Ring[] = [
  { top: "11%", left: "24%", size: 22, color: "border-primary", opacity: "opacity-[0.26]", dashed: true, hiddenBelow: false },
  { bottom: "13%", right: "23%", size: 18, color: "border-secondary", opacity: "opacity-[0.3]", dashed: true, hiddenBelow: false },
  { top: "34%", left: "5%", size: 30, color: "border-ink-muted", opacity: "opacity-[0.16]", dashed: false, hiddenBelow: true },
  { top: "56%", right: "6%", size: 26, color: "border-soft", opacity: "opacity-[0.32]", dashed: true, hiddenBelow: true },
  { top: "5%", right: "28%", size: 10, color: "border-primary", opacity: "opacity-[0.4]", dashed: false, filled: true, hiddenBelow: false },
  { bottom: "20%", left: "26%", size: 12, color: "border-secondary", opacity: "opacity-[0.36]", dashed: false, filled: true, hiddenBelow: false },
  { top: "64%", left: "13%", size: 16, color: "border-primary", opacity: "opacity-[0.2]", dashed: false, hiddenBelow: true },
  { bottom: "62%", right: "12%", size: 14, color: "border-soft", opacity: "opacity-[0.26]", dashed: true, hiddenBelow: true },
  { top: "39%", left: "20%", size: 14, color: "border-accent", opacity: "opacity-[0.22]", dashed: false, hiddenBelow: true },
  { bottom: "36%", right: "21%", size: 16, color: "border-accent", opacity: "opacity-[0.2]", dashed: true, hiddenBelow: true },
];

const marks: Mark[] = [
  { variant: "squiggle", size: 46, top: "11%", left: "31%", rotate: -8, color: "text-primary", opacity: "opacity-[0.22]", hiddenBelow: false },
  { variant: "squiggle", size: 40, bottom: "9%", right: "29%", rotate: 6, color: "text-secondary", opacity: "opacity-[0.22]", hiddenBelow: false },
  { variant: "scribble", size: 44, top: "22%", right: "22%", rotate: 10, colorStyle: TINT_A, opacity: "opacity-[0.3]", hiddenBelow: true },
  { variant: "scribble", size: 40, bottom: "23%", left: "18%", rotate: -14, colorStyle: TINT_B, opacity: "opacity-[0.28]", hiddenBelow: true },
  { variant: "swirl", size: 36, top: "40%", left: "4%", rotate: 0, color: "text-ink-muted", opacity: "opacity-[0.16]", hiddenBelow: true },
  { variant: "swirl", size: 32, bottom: "40%", right: "5%", rotate: 180, color: "text-primary", opacity: "opacity-[0.16]", hiddenBelow: true },
  { variant: "burst", size: 26, top: "6%", left: "27%", rotate: 12, color: "text-secondary", opacity: "opacity-[0.28]", hiddenBelow: false },
  { variant: "burst", size: 24, bottom: "5%", right: "33%", rotate: -10, color: "text-primary", opacity: "opacity-[0.26]", hiddenBelow: false },
  { variant: "squiggle", size: 30, top: "50%", left: "20%", rotate: 4, colorStyle: TERRACOTTA, opacity: "opacity-[0.2]", hiddenBelow: true },
  { variant: "scribble", size: 32, bottom: "50%", right: "20%", rotate: -6, colorStyle: CORAL, opacity: "opacity-[0.2]", hiddenBelow: true },
];

export function HeroDoodles() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
    >
      {strokeLayers.map((layer, layerIndex) => (
        <svg
          key={layerIndex}
          viewBox="-15 -15 130 130"
          preserveAspectRatio="none"
          className={`absolute -left-[15%] -top-[15%] h-[130%] w-[130%] [--hero-stroke-scale:0.5] [--hero-stroke-alpha:0.5] sm:[--hero-stroke-scale:0.62] sm:[--hero-stroke-alpha:0.8] lg:[--hero-stroke-scale:1] lg:[--hero-stroke-alpha:1] ${
            layerIndex > 0 ? "hidden sm:block" : ""
          }`}
          style={{
            filter: `blur(calc(${layer.blur}px * var(--hero-stroke-scale)))`,
            opacity: `calc(${layer.opacity} * var(--hero-stroke-alpha))`,
          }}
        >
          <defs>
            {layer.strokes.map((stroke, i) => (
              <linearGradient key={i} id={`hero-stroke-${layerIndex}-${i}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" style={{ stopColor: stroke.from }} />
                <stop offset="100%" style={{ stopColor: stroke.to }} />
              </linearGradient>
            ))}
          </defs>
          {layer.strokes.map((stroke, i) => (
            <path
              key={i}
              d={stroke.d}
              fill="none"
              stroke={`url(#hero-stroke-${layerIndex}-${i})`}
              style={{ strokeWidth: `calc(${stroke.width}px * var(--hero-stroke-scale))` }}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      ))}

      <div className="absolute inset-0" style={VIGNETTE_STYLE} />

      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={GRAIN_STYLE} />


      <div className="hidden sm:contents">
        {doodles.map(
          ({ Icon, size, top, bottom, left, right, rotate, color, colorStyle, opacity, strokeWidth, fill, hiddenBelow }, i) => (
            <Icon
              key={i}
              strokeWidth={strokeWidth ?? 1.25}
              fill={fill ? "currentColor" : "none"}
              className={`absolute ${color ?? ""} ${opacity} ${hiddenBelow ? "hidden xl:block" : ""}`}
              style={{
                width: size,
                height: size,
                top,
                bottom,
                left,
                right,
                color: colorStyle,
                transform: `rotate(${rotate}deg)`,
              }}
            />
          ),
        )}

        {rings.map(({ top, bottom, left, right, size, color, opacity, dashed, filled, hiddenBelow }, i) => (
          <span
            key={i}
            className={`absolute rounded-full border-2 ${dashed ? "border-dashed" : ""} ${color} ${filled ? color.replace("border-", "bg-") : ""} ${opacity} ${hiddenBelow ? "hidden xl:block" : ""}`}
            style={{ width: size, height: size, top, bottom, left, right }}
          />
        ))}

        {marks.map(({ variant, size, top, bottom, left, right, rotate, color, colorStyle, opacity, hiddenBelow }, i) => (
          <svg
            key={i}
            viewBox="0 0 40 40"
            className={`absolute ${color ?? ""} ${opacity} ${hiddenBelow ? "hidden xl:block" : ""}`}
            style={{
              width: size,
              height: size,
              top,
              bottom,
              left,
              right,
              color: colorStyle,
              transform: `rotate(${rotate}deg)`,
            }}
          >
            <MarkShape variant={variant} />
          </svg>
        ))}
      </div>
    </div>
  );
}
