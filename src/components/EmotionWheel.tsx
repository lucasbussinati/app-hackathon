import { useMemo } from "react";
import {
  EMOTION_FAMILY_COLORS,
  FAMILY_LABELS,
  FAMILY_ORDER,
  findEmotion,
  getPrimary,
  getSecondaries,
  getTertiaries,
} from "../data/emotions";

interface Props {
  selected: string[];
  onToggle: (id: string) => void;
}

// Wheel geometry — tuned for mobile readability.
const SIZE = 360;
const CENTER = SIZE / 2;
const R0 = 38; // inner core (label)
const R1 = 88; // primary ring outer
const R2 = 130; // secondary ring outer
const R3 = 176; // tertiary ring outer

const PRIMARY_SWEEP = 360 / 6; // 60°
const SECONDARY_SWEEP = PRIMARY_SWEEP / 2; // 30°
const TERTIARY_SWEEP = SECONDARY_SWEEP / 2; // 15°

export default function EmotionWheel({ selected, onToggle }: Props) {
  // Compute, for each wedge, whether it's directly selected and whether
  // one of its descendants is selected (for the soft "lit-up" effect).
  const sel = useMemo(() => new Set(selected), [selected]);
  /** Set of family ids that have ANY selection at any depth — used to "light" the family. */
  const familiesLit = useMemo(() => {
    const set = new Set<string>();
    for (const id of selected) {
      const e = findEmotion(id);
      if (e) set.add(e.family);
    }
    return set;
  }, [selected]);

  return (
    <div className="relative mx-auto" style={{ width: SIZE, maxWidth: "100%" }}>
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full h-auto touch-manipulation"
        aria-label="Wheel of emotions"
      >
        <defs>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" />
            <feOffset dy="1" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.25" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {FAMILY_ORDER.map((family, i) => {
          const primaryStart = i * PRIMARY_SWEEP - 90;
          const primaryEnd = primaryStart + PRIMARY_SWEEP;
          const c = EMOTION_FAMILY_COLORS[family];
          const primary = getPrimary(family);
          const isPrimarySelected = sel.has(primary.id);
          const familyLit = isPrimarySelected || familiesLit.has(family);

          return (
            <g key={family}>
              {/* ---------- Tertiary ring (outermost, selectable) ---------- */}
              {getSecondaries(family).map((secondary, s) => {
                const secStart = primaryStart + s * SECONDARY_SWEEP;
                return getTertiaries(secondary.id).map((tertiary, t) => {
                  const a0 = secStart + t * TERTIARY_SWEEP;
                  const a1 = a0 + TERTIARY_SWEEP;
                  const isSelected = sel.has(tertiary.id);
                  const path = arcPath(CENTER, CENTER, R2, R3, a0, a1);
                  const label = polar(CENTER, CENTER, (R2 + R3) / 2, (a0 + a1) / 2);
                  return (
                    <g
                      key={tertiary.id}
                      onClick={() => onToggle(tertiary.id)}
                      className="cursor-pointer transition-all"
                      role="button"
                      tabIndex={0}
                      aria-pressed={isSelected}
                      aria-label={tertiary.label}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onToggle(tertiary.id);
                        }
                      }}
                    >
                      <path
                        d={path}
                        fill={isSelected ? c.ringStrong : c.l3}
                        stroke="#fbf8f3"
                        strokeWidth={1.2}
                        style={{ transition: "fill 0.2s ease" }}
                      />
                      <text
                        x={label.x}
                        y={label.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize={8.5}
                        fontWeight={isSelected ? 700 : 500}
                        fill={isSelected ? c.textStrong : c.text}
                        style={{ pointerEvents: "none" }}
                      >
                        {tertiary.label}
                      </text>
                    </g>
                  );
                });
              })}

              {/* ---------- Secondary ring (cluster) ---------- */}
              {getSecondaries(family).map((secondary, s) => {
                const a0 = primaryStart + s * SECONDARY_SWEEP;
                const a1 = a0 + SECONDARY_SWEEP;
                const isSelected = sel.has(secondary.id);
                const childSelected = getTertiaries(secondary.id).some((t) => sel.has(t.id));
                const path = arcPath(CENTER, CENTER, R1, R2, a0, a1);
                const label = polar(CENTER, CENTER, (R1 + R2) / 2, (a0 + a1) / 2);
                const fill = isSelected ? c.ringStrong : childSelected ? c.l1 : c.l2;
                const text = isSelected || childSelected ? c.textStrong : c.text;
                return (
                  <g
                    key={secondary.id}
                    onClick={() => onToggle(secondary.id)}
                    className="cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                    aria-label={secondary.label}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onToggle(secondary.id);
                      }
                    }}
                  >
                    <path
                      d={path}
                      fill={fill}
                      stroke="#fbf8f3"
                      strokeWidth={1.2}
                      style={{ transition: "fill 0.2s ease" }}
                    />
                    <text
                      x={label.x}
                      y={label.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={10}
                      fontWeight={600}
                      fill={text}
                      style={{ pointerEvents: "none" }}
                    >
                      {secondary.label}
                    </text>
                  </g>
                );
              })}

              {/* ---------- Primary ring (family) ---------- */}
              <PrimaryWedge
                family={family}
                startAngle={primaryStart}
                endAngle={primaryEnd}
                selected={isPrimarySelected}
                lit={familyLit}
                onToggle={() => onToggle(primary.id)}
              />
            </g>
          );
        })}

        {/* ---------- Center core ---------- */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={R0}
          fill="#fbf8f3"
          stroke="#cddccb"
          strokeWidth={1.5}
          filter="url(#softShadow)"
        />
        <text
          x={CENTER}
          y={CENTER - 5}
          textAnchor="middle"
          fontSize={11}
          fontWeight={700}
          fill="#3b5538"
        >
          You
        </text>
        <text
          x={CENTER}
          y={CENTER + 10}
          textAnchor="middle"
          fontSize={9.5}
          fill="#5e8358"
        >
          {selected.length === 0 ? "tap any wedge" : `${selected.length} picked`}
        </text>
      </svg>
    </div>
  );
}

function PrimaryWedge({
  family,
  startAngle,
  endAngle,
  selected,
  lit,
  onToggle,
}: {
  family: keyof typeof EMOTION_FAMILY_COLORS;
  startAngle: number;
  endAngle: number;
  selected: boolean;
  lit: boolean;
  onToggle: () => void;
}) {
  const c = EMOTION_FAMILY_COLORS[family];
  const path = arcPath(CENTER, CENTER, R0, R1, startAngle, endAngle);
  const label = polar(CENTER, CENTER, (R0 + R1) / 2, (startAngle + endAngle) / 2);
  const fill = selected ? c.ringStrong : lit ? c.l1 : c.l2;
  return (
    <g
      onClick={onToggle}
      className="cursor-pointer"
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-label={FAMILY_LABELS[family]}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      <path
        d={path}
        fill={fill}
        stroke="#fbf8f3"
        strokeWidth={1.5}
        style={{ transition: "fill 0.25s ease" }}
      />
      <text
        x={label.x}
        y={label.y}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={11}
        fontWeight={800}
        fill={selected || lit ? c.textStrong : c.text}
        style={{ pointerEvents: "none", letterSpacing: 0.3 }}
      >
        {FAMILY_LABELS[family]}
      </text>
    </g>
  );
}

// ---------- Geometry helpers ----------

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(
  cx: number,
  cy: number,
  rInner: number,
  rOuter: number,
  startAngle: number,
  endAngle: number,
) {
  const p1 = polar(cx, cy, rOuter, startAngle);
  const p2 = polar(cx, cy, rOuter, endAngle);
  const p3 = polar(cx, cy, rInner, endAngle);
  const p4 = polar(cx, cy, rInner, startAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return [
    `M ${p1.x} ${p1.y}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${p2.x} ${p2.y}`,
    `L ${p3.x} ${p3.y}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 0 ${p4.x} ${p4.y}`,
    "Z",
  ].join(" ");
}
