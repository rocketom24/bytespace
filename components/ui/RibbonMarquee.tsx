const PATH_ID = "ribbon-path";
const WAVE_D =
  "M0 120C180 85 360 85 500 120C700 150 820 150 960 120C1140 85 1300 85 1440 105";

export function RibbonMarquee({
  items,
  className,
  rotateClassName,
}: {
  items: string[];
  className?: string;
  rotateClassName?: string;
}) {
  const text = `${items.join(" · ")} · `.repeat(8);

  // Mask + overflow live on this unrotated wrapper so the fade always lines up
  // with the real (screen-aligned) edges, even though the ribbon inside is
  // rotated - masking a rotated element directly rotates the fade with it,
  // which is what let the wave get hard-clipped instead of fading out.
  return (
    <div
      className={className}
      style={{
        overflow: "hidden",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        maskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
      role="presentation"
    >
      <svg
        viewBox="0 0 1440 170"
        preserveAspectRatio="xMidYMid slice"
        className={`h-full w-full ${rotateClassName ?? ""}`}
      >
        <defs>
          <path id={PATH_ID} d={WAVE_D} />
        </defs>
        <path d={WAVE_D} fill="none" stroke="var(--secondary)" strokeWidth={13} strokeLinecap="round" />
        <text
          fill="var(--ink)"
          className="font-sans text-[13px] font-bold uppercase tracking-[0.08em]"
        >
          <textPath href={`#${PATH_ID}`} startOffset="0%">
            <animate
              attributeName="startOffset"
              from="0%"
              to="-100%"
              dur="40s"
              repeatCount="indefinite"
            />
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
