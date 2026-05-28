import type { ReflexPoint, ReflexZone } from "../data/types";
import { t } from "../i18n";

interface Props {
  zone: ReflexZone;
  point: ReflexPoint;
  size?: number;
}

export default function ReflexDiagram({ zone, point, size = 140 }: Props) {
  return (
    <svg
      viewBox="0 0 100 100"
      style={{ width: size, height: size }}
      className="rounded-2xl bg-sand-100/50"
      aria-label={t.results.diagram(point.name)}
    >
      <defs>
        <radialGradient id="hl" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c4893f" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#c4893f" stopOpacity="0" />
        </radialGradient>
      </defs>
      {zone === "foot" && <FootShape />}
      {zone === "hand" && <HandShape />}
      {zone === "ear" && <EarShape />}

      {/* Highlight */}
      <circle cx={point.position.x} cy={point.position.y} r={10} fill="url(#hl)" />
      <circle
        cx={point.position.x}
        cy={point.position.y}
        r={3}
        fill="#c4893f"
        stroke="#fff"
        strokeWidth="1.2"
      />
      <circle
        cx={point.position.x}
        cy={point.position.y}
        r={5}
        fill="none"
        stroke="#c4893f"
        strokeWidth="1"
        opacity="0.5"
      >
        <animate attributeName="r" from="5" to="11" dur="1.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.6" to="0" dur="1.6s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function FootShape() {
  return (
    <g fill="#fbe7c6" stroke="#c4893f" strokeWidth="0.8">
      {/* Foot sole */}
      <path d="M50 5 C 30 6 22 25 22 50 C 22 70 28 88 50 95 C 72 88 78 70 78 50 C 78 25 70 6 50 5 Z" />
      {/* Toes */}
      <ellipse cx="50" cy="8" rx="6" ry="5" />
      <ellipse cx="62" cy="11" rx="4" ry="4" />
      <ellipse cx="70" cy="15" rx="3.5" ry="3.5" />
      <ellipse cx="76" cy="20" rx="3" ry="3" />
      <ellipse cx="80" cy="26" rx="2.8" ry="2.8" />
      {/* Arch indicator */}
      <path
        d="M30 40 Q 40 55 30 70"
        fill="none"
        stroke="#c4893f"
        strokeWidth="0.5"
        strokeDasharray="2 2"
      />
    </g>
  );
}

function HandShape() {
  return (
    <g fill="#fbe7c6" stroke="#c4893f" strokeWidth="0.8">
      {/* Palm */}
      <path d="M30 45 C 28 30 32 25 40 25 L 60 25 C 68 25 72 30 70 45 L 72 80 C 72 90 65 95 50 95 C 35 95 28 90 28 80 Z" />
      {/* Thumb */}
      <path d="M28 45 C 18 38 14 28 22 22 C 30 18 36 25 36 35" />
      {/* Fingers */}
      <path d="M36 25 L 36 8 C 36 5 42 5 42 8 L 42 25" />
      <path d="M46 25 L 46 4 C 46 1 52 1 52 4 L 52 25" />
      <path d="M56 25 L 56 6 C 56 3 62 3 62 6 L 62 25" />
      <path d="M64 28 L 66 14 C 66 11 70 11 70 14 L 70 28" />
    </g>
  );
}

function EarShape() {
  return (
    <g fill="#fbe7c6" stroke="#c4893f" strokeWidth="0.8">
      <path d="M50 8 C 28 8 22 30 28 55 C 30 70 38 86 48 92 C 56 95 62 88 60 78 C 58 70 64 64 70 60 C 78 54 80 40 76 28 C 72 14 62 8 50 8 Z" />
      <path
        d="M50 22 C 38 22 36 34 40 48 C 42 56 48 62 52 60 C 58 56 56 48 58 42 C 60 34 58 22 50 22 Z"
        fill="#f5d8a1"
      />
      <path d="M48 70 C 44 70 42 76 46 80 C 50 84 56 80 56 75 C 56 72 52 70 48 70 Z" />
    </g>
  );
}
