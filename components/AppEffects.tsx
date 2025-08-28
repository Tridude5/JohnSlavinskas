"use client";

/** Injects global micro-effects (shimmer CTA + hairline gradient borders). */
export default function AppEffects() {
  return (
    <style jsx global>{`
      /* Shimmer-on-hover for primary buttons */
      .btn-shimmer {
        position: relative;
        overflow: hidden;
      }
      .btn-shimmer::after {
        content: "";
        position: absolute;
        inset: -200% -30%;
        background: linear-gradient(
          115deg,
          transparent,
          rgba(255, 255, 255, 0.28),
          transparent
        );
        transform: translateX(-60%) rotate(8deg);
        transition: transform 0.6s ease;
        pointer-events: none;
      }
      .btn-shimmer:hover::after {
        transform: translateX(60%) rotate(8deg);
      }

      /* Hairline gradient border for premium-looking cards */
      .card-gradient {
        position: relative;
        background-clip: padding-box;
        border: 1px solid transparent; /* keeps layout consistent */
      }
      .card-gradient::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: -1;
        border-radius: inherit;
        padding: 1px; /* hairline */
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.25),
          rgba(16, 185, 129, 0.35)
        );
        -webkit-mask: linear-gradient(#000 0 0) content-box,
          linear-gradient(#000 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
      }
    `}</style>
  );
}
