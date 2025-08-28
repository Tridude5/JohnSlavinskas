"use client";

export default function AutomationShowcase() {
  // layout constants
  const w = 520;
  const h = 260;

  // node positions
  const sap = { x: 70, y: 95, label: "SAP FI" };
  const adp = { x: 70, y: 185, label: "ADP" };
  const hub = { x: 240, y: 140, label: "Python / VBA / SQL" };
  const checks = { x: 360, y: 140, label: "Checks & Pivot" };
  const report = { x: 470, y: 140, label: "Report" };

  return (
    <div className="card card-gradient md:sticky md:top-[22vh] mx-auto w-full max-w-md">
      <h3 className="font-semibold text-lg">Automation flow</h3>
      <p className="mt-1 text-sm text-gray-400">
        From source systems to a clean, auditable report.
      </p>

      <svg
        viewBox={`0 0 ${w} ${h}`}
        width="100%"
        height="auto"
        className="mt-4"
        aria-hidden="true"
      >
        {/* gentle vignette */}
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(16,185,129,.35)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* pipes */}
        <path
          className="pipe"
          d={`M${sap.x + 18},${sap.y}
             C ${sap.x + 90},${sap.y - 10}
               ${hub.x - 70},${hub.y - 30}
               ${hub.x - 8},${hub.y - 8}`}
          stroke="rgba(34,211,238,.9)"
          fill="none"
        />
        <path
          className="pipe"
          d={`M${adp.x + 18},${adp.y}
             C ${adp.x + 90},${adp.y + 10}
               ${hub.x - 70},${hub.y + 30}
               ${hub.x - 8},${hub.y + 8}`}
          stroke="rgba(34,211,238,.9)"
          fill="none"
        />
        <line
          className="pipe straight"
          x1={hub.x + 18}
          y1={hub.y}
          x2={checks.x - 20}
          y2={checks.y}
          stroke="rgba(34,211,238,.9)"
        />
        <line
          className="pipe straight"
          x1={checks.x + 18}
          y1={checks.y}
          x2={report.x - 24}
          y2={report.y}
          stroke="rgba(34,211,238,.9)"
        />

        {/* left nodes */}
        <Node x={sap.x} y={sap.y} label={sap.label} />
        <Node x={adp.x} y={adp.y} label={adp.label} />

        {/* hub node (target icon, perfectly centered) */}
        <g transform={`translate(${hub.x}, ${hub.y})`} className="node">
          <circle r="22" fill="url(#glow)" />
          <circle r="14" fill="rgba(16,185,129,.25)" />
          <circle r="9" fill="rgba(16,185,129,.45)" />
          <g className="hub-icon">
            <circle r="7.2" fill="none" stroke="white" strokeWidth="1.5" />
            <circle r="3.2" fill="white" />
          </g>
        </g>
        <Label x={hub.x} y={hub.y + 30} text={hub.label} />

        {/* right nodes */}
        <Node x={checks.x} y={checks.y} label={checks.label} />
        <RoundedBox x={report.x} y={report.y} />
        <Label x={report.x} y={report.y + 30} text={report.label} />
      </svg>

      <p className="mt-4 text-[13px] text-gray-400">
        Typical run: import → validate → reconcile → summarize. Re-usable,
        documented, auditable.
      </p>

      <style jsx>{`
        .pipe {
          stroke-width: 3;
          stroke-dasharray: 6 8;
          animation: dash 3.4s linear infinite;
          filter: drop-shadow(0 0 6px rgba(34, 211, 238, 0.35));
        }
        .straight {
          stroke-dasharray: 10 10;
        }
        .node {
          filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.45));
        }
        .hub-icon {
          animation: hubPulse 2.4s ease-in-out infinite;
          transform-origin: 0 0;
        }

        @keyframes dash {
          to {
            stroke-dashoffset: -80;
          }
        }
        @keyframes hubPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.06);
            opacity: 0.96;
          }
        }

        /* Respect user preference */
        @media (prefers-reduced-motion: reduce) {
          .pipe,
          .hub-icon {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ---- tiny helpers ------------------------------------------------------- */

function Node({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <>
      <g transform={`translate(${x}, ${y})`} className="node">
        <circle r="18" fill="url(#glow)" />
        <circle r="12" fill="rgba(16,185,129,.35)" />
      </g>
      <Label x={x} y={y + 30} text={label} />
    </>
  );
}

function Label({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontSize="12.5"
      fill="rgba(255,255,255,.92)"
      style={{ fontWeight: 500 }}
    >
      {text}
    </text>
  );
}

function RoundedBox({ x, y }: { x: number; y: number }) {
  const w = 34,
    h = 26,
    r = 6;
  return (
    <rect
      x={x - w / 2}
      y={y - h / 2}
      width={w}
      height={h}
      rx={r}
      ry={r}
      fill="none"
      stroke="rgba(34,211,238,.85)"
      strokeWidth="3"
      className="node"
    />
  );
}
