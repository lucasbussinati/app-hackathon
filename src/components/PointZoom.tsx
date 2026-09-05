import { useEffect } from "react";
import { createPortal } from "react-dom";
import ReflexDiagram from "./ReflexDiagram";
import type { ReflexPoint } from "../data/types";
import { t } from "../i18n";

/**
 * A point's chart, tappable to open it full screen. Shared by the live plan
 * (step 4) and the saved sessions in History, so both behave identically.
 * Points without a photo fall back to the plain diagram.
 */
export function PointThumbnail({
  point,
  size,
  onZoom,
}: {
  point: ReflexPoint;
  size: number;
  onZoom: (point: ReflexPoint) => void;
}) {
  if (!point.image) {
    return <ReflexDiagram zone={point.zone} point={point} size={size} />;
  }

  return (
    <button
      type="button"
      onClick={() => onZoom(point)}
      aria-label={t.results.enlargeAria(point.name)}
      className="group relative shrink-0 self-start rounded-2xl outline-none transition-transform hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-sage-500"
    >
      <ReflexDiagram zone={point.zone} point={point} size={size} />
      <span className="absolute bottom-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-sage-700/85 text-white shadow-soft transition-colors group-hover:bg-sage-700">
        <svg
          viewBox="0 0 24 24"
          width="13"
          height="13"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" />
          <line x1="11" y1="8" x2="11" y2="14" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      </span>
    </button>
  );
}

export function PointLightbox({
  point,
  onClose,
}: {
  point: ReflexPoint;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={point.name}
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-sage-900/70 px-4 pb-10 pt-20 backdrop-blur-sm animate-fade-in"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={t.results.closeImage}
        className="fixed right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-sage-800 shadow-soft transition-colors hover:bg-white"
      >
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="mx-auto flex w-full max-w-md flex-col items-center gap-3 animate-scale-in"
      >
        <img
          src={point.image}
          alt={t.results.diagram(point.name)}
          className="w-full rounded-3xl bg-white object-contain shadow-soft"
        />
        <p className="text-center text-white font-medium drop-shadow">{point.name}</p>
      </div>
    </div>,
    document.body,
  );
}
