"use client";

type Variant = "subtle" | "medium" | "bold";
type Props = { variant?: Variant; fullBleed?: boolean };

export default function BlueprintFX({ variant = "bold", fullBleed = true }: Props) {
  // presets to control visibility
  const presets: Record<Variant, { fine: number; coarse: number; outer: string; mask: string; vignette: string }> = {
    subtle: {
      fine: 0.10,   // small grid line alpha
      coarse: 0.14, // large grid line alpha (emerald tint)
      outer: "opacity-60 dark:opacity-45",
      mask: "linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0.35) 45%, transparent)",
      vignette: "inset 0 0 60px rgba(0,0,0,.18), inset 0 -40px 80px rgba(0,0,0,.22)",
    },
    medium: {
      fine: 0.16,
      coarse: 0.20,
      outer: "opacity-85 dark:opacity-70",
      mask: "linear-gradient(to bottom, rgba(0,0,0,0.90), rgba(0,0,0,0.50) 55%, rgba(0,0,0,0.15))",
      vignette: "inset 0 0 80px rgba(0,0,0,.22), inset 0 -50px 90px rgba(0,0,0,.28)",
    },
    bold: {
      fine: 0.22,
      coarse: 0.26,
      outer: "opacity-100 dark:opacity-90",
      mask: "linear-gradient(to bottom, rgba(0,0,0,0.92), rgba(0,0,0,0.58) 60%, rgba(0,0,0,0.22))",
      vignette: "inset 0 0 95px rgba(0,0,0,.26), inset 0 -60px 110px rgba(0,0,0,.32)",
    },
  };

  const cfg = presets[variant];
  const pos = fullBleed
    ? "absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen h-full"
    : "absolute inset-0";

  return (
    <div
      aria-hidden
      className={`${pos} -z-10 pointer-events-none ${cfg.outer}`}
      style={{
        background: `
          /* fine gray grid */
          linear-gradient(rgba(180,190,200,${cfg.fine}) 1px, transparent 1px),
          linear-gradient(90deg, rgba(180,190,200,${cfg.fine}) 1px, transparent 1px),
          /* coarse emerald grid */
          linear-gradient(rgba(16,185,129,${cfg.coarse}) 1px, transparent 1px),
          linear-gradient(90deg, rgba(16,185,129,${cfg.coarse}) 1px, transparent 1px)
        `,
        backgroundSize: "24px 24px, 24px 24px, 120px 120px, 120px 120px",
        WebkitMaskImage: cfg.mask,
        maskImage: cfg.mask,
        boxShadow: cfg.vignette,
      }}
    />
  );
}
