import { useId, useState } from "react";
import { BODY_REGIONS } from "../data/bodyRegions";
import type { BodyRegion, BodyView } from "../data/types";
import { t } from "../i18n";

interface Props {
  selected: BodyRegion[];
  onToggle: (r: BodyRegion) => void;
}

/** Rectangular hit zones (x, y, w, h) in viewBox 0 0 240 560, masked to the silhouette. */
type Zone = { id: BodyRegion; rects: Array<[number, number, number, number]> };

/** Zones tile the body without overlapping, so every border drawn is a real boundary. */
const FRONT_ZONES: Zone[] = [
  { id: "head", rects: [[88, 12, 64, 30]] },
  { id: "ears", rects: [[82, 42, 14, 24], [144, 42, 14, 24]] },
  { id: "face", rects: [[96, 42, 48, 30]] },
  { id: "neck", rects: [[100, 72, 40, 26]] },
  { id: "shoulders", rects: [[64, 98, 112, 22]] },
  {
    id: "arms",
    rects: [
      [34, 120, 44, 62],
      [162, 120, 44, 62],
      [34, 216, 44, 44],
      [162, 216, 44, 44],
    ],
  },
  { id: "elbows", rects: [[34, 182, 44, 34], [162, 182, 44, 34]] },
  { id: "hands", rects: [[30, 260, 48, 40], [162, 260, 48, 40]] },
  { id: "trunk", rects: [[78, 120, 14, 146], [148, 120, 14, 146]] },
  { id: "chest", rects: [[92, 120, 56, 56]] },
  { id: "stomach", rects: [[92, 176, 56, 44]] },
  { id: "intestine", rects: [[92, 220, 56, 46]] },
  { id: "hips", rects: [[74, 266, 20, 34], [146, 266, 20, 34]] },
  { id: "pelvis", rects: [[94, 266, 52, 34]] },
  { id: "legs", rects: [[84, 300, 72, 76], [84, 412, 72, 48]] },
  { id: "knees", rects: [[86, 376, 32, 36], [122, 376, 32, 36]] },
  { id: "feet", rects: [[80, 460, 80, 46]] },
];

const BACK_ZONES: Zone[] = [
  { id: "head", rects: [[88, 12, 64, 30], [96, 42, 48, 24]] },
  { id: "ears", rects: [[82, 42, 14, 24], [144, 42, 14, 24]] },
  { id: "neck", rects: [[100, 66, 40, 32]] },
  { id: "shoulders", rects: [[64, 98, 112, 22]] },
  {
    id: "arms",
    rects: [
      [34, 120, 44, 62],
      [162, 120, 44, 62],
      [34, 216, 44, 44],
      [162, 216, 44, 44],
    ],
  },
  { id: "elbows", rects: [[34, 182, 44, 34], [162, 182, 44, 34]] },
  { id: "hands", rects: [[30, 260, 48, 40], [162, 260, 48, 40]] },
  { id: "upperBack", rects: [[78, 120, 84, 80]] },
  { id: "lowerBack", rects: [[78, 200, 84, 66]] },
  { id: "hips", rects: [[74, 266, 92, 34]] },
  { id: "legs", rects: [[84, 300, 72, 76], [84, 412, 72, 48]] },
  { id: "knees", rects: [[86, 376, 32, 36], [122, 376, 32, 36]] },
  { id: "feet", rects: [[80, 460, 80, 46]] },
];

/** The silhouette itself — reused for the visible figure and for the mask. */
function Figure({ paint }: { paint: string }) {
  return (
    <g>
      <circle cx="120" cy="48" r="27" fill={paint} />
      <ellipse cx="91" cy="52" rx="5.5" ry="8.5" fill={paint} />
      <ellipse cx="149" cy="52" rx="5.5" ry="8.5" fill={paint} />
      <rect x="107" y="64" width="26" height="48" rx="13" fill={paint} />
      <circle cx="86" cy="114" r="15" fill={paint} />
      <circle cx="154" cy="114" r="15" fill={paint} />
      <path
        d="M86 106 C100 98 140 98 154 106 C162 130 164 160 160 190 C157 220 150 250 148 274 C146 288 144 296 142 302 L98 302 C96 296 94 288 92 274 C90 250 83 220 80 190 C76 160 78 130 86 106 Z"
        fill={paint}
      />
      <path
        d="M80 118 C67 158 59 206 53 252"
        fill="none"
        stroke={paint}
        strokeWidth="21"
        strokeLinecap="round"
      />
      <path
        d="M160 118 C173 158 181 206 187 252"
        fill="none"
        stroke={paint}
        strokeWidth="21"
        strokeLinecap="round"
      />
      <circle cx="51" cy="270" r="14" fill={paint} />
      <circle cx="189" cy="270" r="14" fill={paint} />
      <path
        d="M106 300 C101 350 101 402 104 462"
        fill="none"
        stroke={paint}
        strokeWidth="30"
        strokeLinecap="round"
      />
      <path
        d="M134 300 C139 350 139 402 136 462"
        fill="none"
        stroke={paint}
        strokeWidth="30"
        strokeLinecap="round"
      />
      <ellipse cx="100" cy="486" rx="17" ry="11" fill={paint} />
      <ellipse cx="140" cy="486" rx="17" ry="11" fill={paint} />
    </g>
  );
}

export default function BodyMap({ selected, onToggle }: Props) {
  const [view, setView] = useState<BodyView>("front");
  const [hover, setHover] = useState<BodyRegion | null>(null);
  const uid = useId().replace(/:/g, "");

  const zones = view === "front" ? FRONT_ZONES : BACK_ZONES;
  const maskId = `body-mask-${uid}-${view}`;
  const gradId = `body-grad-${uid}`;
  const hoverLabel = hover ? BODY_REGIONS.find((r) => r.id === hover)?.label : null;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-center">
        <div className="inline-flex rounded-full border border-sage-200 bg-white/70 p-0.5">
          {(["front", "back"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                view === v ? "bg-sage-600 text-white shadow-soft" : "text-sage-700 hover:bg-sage-50"
              }`}
            >
              {t.bodyMap[v]}
            </button>
          ))}
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[240px] select-none">
        <svg viewBox="0 0 240 560" className="w-full h-auto" aria-label={t.bodyMap.aria}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e6ede5" />
              <stop offset="100%" stopColor="#cddccb" />
            </linearGradient>
            <mask id={maskId}>
              <Figure paint="#ffffff" />
            </mask>
          </defs>

          {/* Slightly scaled copy behind the figure gives a single clean contour
              instead of the seams you get from stroking each limb. */}
          <g transform="translate(120 280) scale(1.022) translate(-120 -280)" opacity="0.9">
            <Figure paint="#a8c2a4" />
          </g>
          <Figure paint={`url(#${gradId})`} />

          {view === "back" && (
            <path
              d="M120 116 L120 262"
              fill="none"
              stroke="#a8c2a4"
              strokeWidth="1.5"
              strokeDasharray="4 5"
              mask={`url(#${maskId})`}
              pointerEvents="none"
            />
          )}

          <g mask={`url(#${maskId})`}>
            {zones.map(({ id, rects }) => {
              const region = BODY_REGIONS.find((r) => r.id === id);
              if (!region) return null;
              const isSelected = selected.includes(id);
              const isHover = hover === id;
              return (
                <g
                  key={`${view}-${id}`}
                  onClick={() => onToggle(id)}
                  onMouseEnter={() => setHover(id)}
                  onMouseLeave={() => setHover((h) => (h === id ? null : h))}
                  className="cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onToggle(id);
                    }
                  }}
                  aria-label={region.label}
                  aria-pressed={isSelected}
                >
                  {rects.map(([x, y, w, h], i) => (
                    <rect
                      key={i}
                      x={x}
                      y={y}
                      width={w}
                      height={h}
                      rx="5"
                      className="transition-all"
                      fill={
                        isSelected
                          ? "rgba(73, 105, 68, 0.62)"
                          : isHover
                            ? "rgba(126, 160, 119, 0.35)"
                            : "transparent"
                      }
                      stroke={isSelected ? "#3b5538" : isHover ? "#5e8358" : "#7ea077"}
                      strokeWidth={isSelected ? 2 : isHover ? 1.6 : 1}
                      strokeOpacity={isSelected || isHover ? 1 : 0.5}
                    />
                  ))}
                </g>
              );
            })}
          </g>
        </svg>

        <p className="text-center text-xs text-sage-600 h-4 mt-1">
          {hoverLabel ?? ""}
        </p>
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-widest text-sage-500 font-semibold mb-2">
          {t.bodyMap.areas}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {BODY_REGIONS.map((region) => {
            const isSelected = selected.includes(region.id);
            return (
              <button
                key={region.id}
                type="button"
                onClick={() => {
                  if (!region.views.includes(view) && region.views[0]) setView(region.views[0]);
                  onToggle(region.id);
                }}
                onMouseEnter={() => setHover(region.id)}
                onMouseLeave={() => setHover((h) => (h === region.id ? null : h))}
                className={`px-2.5 py-1 rounded-full text-xs border transition-all ${
                  isSelected
                    ? "bg-sage-600 text-white border-sage-700"
                    : "bg-white/70 text-sage-700 border-sage-200 hover:border-sage-400"
                }`}
                aria-pressed={isSelected}
              >
                {region.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
