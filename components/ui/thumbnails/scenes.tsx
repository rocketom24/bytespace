export const CREAM = "#FDF6EF";
export const INK = "#16211B";

export function ReactBlocksScene() {
  return (
    <g fill="none" stroke={CREAM} strokeWidth={3}>
      <ellipse cx={200} cy={133} rx={80} ry={30} />
      <ellipse cx={200} cy={133} rx={80} ry={30} transform="rotate(60 200 133)" />
      <ellipse cx={200} cy={133} rx={80} ry={30} transform="rotate(120 200 133)" />
      <circle cx={200} cy={133} r={12} fill={CREAM} stroke="none" />
      <rect x={70} y={40} width={44} height={44} rx={10} fill={CREAM} opacity={0.85} />
      <rect x={286} y={182} width={44} height={44} rx={10} fill={CREAM} opacity={0.85} />
    </g>
  );
}

export function TypeScriptScene() {
  return (
    <g stroke={CREAM} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M150 80 L100 133 L150 186" />
      <path d="M250 80 L300 133 L250 186" />
      <path d="M212 70 L188 196" />
      <rect x={64} y={210} width={40} height={24} rx={6} fill={CREAM} stroke="none" opacity={0.85} />
      <rect x={296} y={210} width={40} height={24} rx={6} fill={CREAM} stroke="none" opacity={0.85} />
    </g>
  );
}

export function SystemsNetworkScene() {
  const nodes = [
    [90, 90],
    [310, 90],
    [200, 133],
    [90, 190],
    [310, 190],
  ] as const;
  return (
    <g>
      <g stroke={CREAM} strokeWidth={2.5} opacity={0.8}>
        <line x1={90} y1={90} x2={200} y2={133} />
        <line x1={310} y1={90} x2={200} y2={133} />
        <line x1={90} y1={190} x2={200} y2={133} />
        <line x1={310} y1={190} x2={200} y2={133} />
        <line x1={90} y1={90} x2={90} y2={190} />
        <line x1={310} y1={90} x2={310} y2={190} />
      </g>
      {nodes.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={i === 2 ? 16 : 11} fill={CREAM} opacity={i === 2 ? 1 : 0.85} />
      ))}
    </g>
  );
}

export function WireframeScene() {
  return (
    <g fill="none" stroke={CREAM} strokeWidth={3}>
      <rect x={80} y={54} width={240} height={160} rx={12} />
      <line x1={80} y1={92} x2={320} y2={92} />
      <circle cx={100} cy={73} r={4} fill={CREAM} stroke="none" />
      <circle cx={116} cy={73} r={4} fill={CREAM} stroke="none" />
      <rect x={98} y={110} width={90} height={80} rx={6} opacity={0.85} />
      <line x1={206} y1={116} x2={302} y2={116} strokeWidth={5} strokeLinecap="round" />
      <line x1={206} y1={140} x2={280} y2={140} strokeWidth={5} strokeLinecap="round" opacity={0.7} />
      <line x1={206} y1={164} x2={290} y2={164} strokeWidth={5} strokeLinecap="round" opacity={0.7} />
      <path d="M270 176 L300 206 L290 176 Z" fill={CREAM} stroke="none" />
    </g>
  );
}

export function DataScienceScene() {
  const bars = [40, 70, 50, 90, 65];
  return (
    <g>
      <g fill={CREAM} opacity={0.85}>
        {bars.map((h, i) => (
          <rect key={i} x={100 + i * 38} y={196 - h} width={20} height={h} rx={4} />
        ))}
      </g>
      <polyline
        points="100,150 138,120 176,160 214,90 252,110 290,70"
        fill="none"
        stroke={CREAM}
        strokeWidth={3}
        opacity={0.9}
      />
      {[
        [100, 150],
        [176, 160],
        [252, 110],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={5} fill={CREAM} />
      ))}
    </g>
  );
}

export function CloudDevOpsScene() {
  return (
    <g fill="none" stroke={CREAM} strokeWidth={3}>
      <path
        d="M140 120 a30 30 0 0 1 58 -14 a24 24 0 0 1 6 47 h-84 a24 24 0 0 1 -6 -47 a24 24 0 0 1 26 14 Z"
        fill={CREAM}
        opacity={0.85}
        stroke="none"
      />
      <rect x={90} y={190} width={36} height={30} rx={6} />
      <rect x={146} y={190} width={36} height={30} rx={6} />
      <rect x={202} y={190} width={36} height={30} rx={6} />
      <path d="M108 190 V172 H164 V190 M164 190 V172 H220 V190" strokeLinejoin="round" />
      <circle cx={280} cy={90} r={20} opacity={0.85} />
      <path d="M280 78 v-8 M280 110 v-8 M268 90 h-8 M300 90 h-8" strokeLinecap="round" />
    </g>
  );
}

export function ProductivityScene() {
  return (
    <g>
      <rect x={90} y={56} width={220} height={160} rx={12} fill="none" stroke={CREAM} strokeWidth={3} />
      <line x1={90} y1={94} x2={310} y2={94} stroke={CREAM} strokeWidth={3} />
      {[0, 1, 2].map((row) => (
        <g key={row}>
          <rect
            x={112}
            y={112 + row * 34}
            width={18}
            height={18}
            rx={5}
            fill={row < 2 ? CREAM : "none"}
            stroke={CREAM}
            strokeWidth={3}
          />
          {row < 2 && (
            <path
              d={`M116 ${121 + row * 34} l4 5 l8 -9`}
              fill="none"
              stroke={INK}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
          <line
            x1={144}
            y1={121 + row * 34}
            x2={280}
            y2={121 + row * 34}
            stroke={CREAM}
            strokeWidth={4}
            strokeLinecap="round"
            opacity={row < 2 ? 0.5 : 0.85}
          />
        </g>
      ))}
    </g>
  );
}

/** Per-course-id scene lookup (courses 1-7). */
export const SCENES_BY_COURSE_ID: Record<string, () => React.JSX.Element> = {
  "1": ReactBlocksScene,
  "2": TypeScriptScene,
  "3": SystemsNetworkScene,
  "4": WireframeScene,
  "5": DataScienceScene,
  "6": CloudDevOpsScene,
  "7": ProductivityScene,
};

/** Per-category-icon scene lookup - same illustration family, keyed by CategoryIcon. */
export const SCENES_BY_ICON: Record<string, () => React.JSX.Element> = {
  code: ReactBlocksScene,
  language: TypeScriptScene,
  systems: SystemsNetworkScene,
  design: WireframeScene,
  data: DataScienceScene,
  cloud: CloudDevOpsScene,
};

/**
 * Warm terracotta/orange gradient stops - keeps the illustrated grid varied
 * while staying inside one family (kept apart from the app's cool sage/cream
 * design tokens, which this system deliberately contrasts).
 */
export const GRADIENTS_BY_COURSE_ID: Record<string, [string, string]> = {
  "1": ["#FF9A6B", "#C1440E"],
  "2": ["#FFB088", "#D2571C"],
  "3": ["#F2895A", "#9C3A17"],
  "4": ["#FFA36C", "#C6531F"],
  "5": ["#F0824F", "#B5451F"],
  "6": ["#FFC199", "#D96A2C"],
  "7": ["#F79766", "#C14A1E"],
};

export const GRADIENTS_BY_ICON: Record<string, [string, string]> = {
  code: GRADIENTS_BY_COURSE_ID["1"],
  language: GRADIENTS_BY_COURSE_ID["2"],
  systems: GRADIENTS_BY_COURSE_ID["3"],
  design: GRADIENTS_BY_COURSE_ID["4"],
  data: GRADIENTS_BY_COURSE_ID["5"],
  cloud: GRADIENTS_BY_COURSE_ID["6"],
};

export const FALLBACK_GRADIENT: [string, string] = ["#FF9A6B", "#C1440E"];
