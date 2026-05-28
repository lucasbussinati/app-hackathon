import { BODY_REGIONS } from "../data/bodyRegions";
import type { BodyRegion } from "../data/types";
import { t } from "../i18n";

interface Props {
  selected: BodyRegion[];
  onToggle: (r: BodyRegion) => void;
}

export default function BodyMap({ selected, onToggle }: Props) {
  return (
    <div className="relative mx-auto w-full max-w-[220px] select-none">
      <svg viewBox="0 0 200 480" className="w-full h-auto" aria-label={t.bodyMap.aria}>
        <defs>
          <linearGradient id="body-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e6ede5" />
            <stop offset="100%" stopColor="#cddccb" />
          </linearGradient>
        </defs>

        {/* Silhouette */}
        <g fill="url(#body-grad)" stroke="#7ea077" strokeWidth="1.2">
          <circle cx="100" cy="38" r="26" />
          <path d="M86 64 q14 10 28 0 l6 22 q-20 8 -40 0 z" />
          <path d="M64 92 q36 -16 72 0 l8 60 q-44 14 -88 0 z" />
          <path d="M70 152 q30 14 60 0 l-2 90 q-28 10 -56 0 z" />
          <path d="M74 240 q26 10 52 0 l-2 36 q-24 10 -48 0 z" />
          <path d="M76 276 q24 10 48 0 l-6 86 q-18 6 -36 0 z" />
          <path d="M82 360 q18 8 36 0 l-2 74 q-16 6 -32 0 z" />
          <path d="M82 434 q18 6 36 0 l-2 24 q-16 4 -32 0 z" />
          {/* Arms */}
          <path d="M64 96 q-18 50 -16 100 q4 50 12 70 q4 -2 6 -8 q-4 -60 -2 -100 q2 -32 12 -54 z" />
          <path d="M136 96 q18 50 16 100 q-4 50 -12 70 q-4 -2 -6 -8 q4 -60 2 -100 q-2 -32 -12 -54 z" />
        </g>

        {/* Region hotspots */}
        {BODY_REGIONS.map((region) => {
          const isSelected = selected.includes(region.id);
          return (
            <g
              key={region.id}
              onClick={() => onToggle(region.id)}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onToggle(region.id);
                }
              }}
              aria-label={region.label}
              aria-pressed={isSelected}
            >
              <circle
                cx={region.cx}
                cy={region.cy}
                r={region.r}
                fill={isSelected ? "rgba(94, 131, 88, 0.45)" : "transparent"}
                stroke={isSelected ? "#3b5538" : "transparent"}
                strokeWidth={isSelected ? 2 : 0}
                className="transition-all"
              />
              {isSelected && (
                <circle
                  cx={region.cx}
                  cy={region.cy}
                  r={4}
                  fill="#3b5538"
                  className="animate-scale-in"
                />
              )}
            </g>
          );
        })}
      </svg>

      <div className="mt-3 flex flex-wrap justify-center gap-1.5">
        {selected.length === 0 ? (
          <p className="text-xs text-sage-600">{t.bodyMap.hint}</p>
        ) : (
          selected.map((id) => {
            const region = BODY_REGIONS.find((r) => r.id === id)!;
            return (
              <button
                key={id}
                onClick={() => onToggle(id)}
                className="chip bg-sage-100 border-sage-300"
              >
                {region.label} ×
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
