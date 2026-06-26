import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useAssessment } from "../store/assessment";
import { recommend } from "../data/recommender";
import { findEmotion } from "../data/emotions";
import { BODY_REGIONS, DISCOMFORT_TYPES } from "../data/bodyRegions";
import ReflexDiagram from "../components/ReflexDiagram";
import { saveSession } from "../data/storage";
import type { EmotionalPresence, ReflexPoint, Session } from "../data/types";
import { t, tagLabel } from "../i18n";

export default function Results() {
  const navigate = useNavigate();
  const { physical, emotions, emotionalPresence, emotionalNote, reset } = useAssessment();
  const [saved, setSaved] = useState(false);
  const [zoomed, setZoomed] = useState<ReflexPoint | null>(null);

  const results = useMemo(
    () => recommend(physical, emotions, emotionalPresence, 5),
    [physical, emotions, emotionalPresence],
  );

  const hasAnyInput =
    physical.regions.length > 0 ||
    physical.discomfortTypes.length > 0 ||
    emotions.length > 0;

  useEffect(() => {
    if (!hasAnyInput || saved) return;
    const session: Session = {
      id: `s_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      createdAt: Date.now(),
      physical,
      emotions,
      emotionalPresence,
      emotionalNote: emotionalNote.trim() || undefined,
      recommendedPointIds: results.map((r) => r.point.id),
    };
    saveSession(session);
    setSaved(true);
  }, [hasAnyInput, physical, emotions, emotionalPresence, emotionalNote, results, saved]);

  if (!hasAnyInput) {
    return (
      <div className="card p-6 text-center">
        <p className="text-sage-700 mb-4">{t.results.emptyText}</p>
        <Link to="/body" className="btn-primary">
          {t.results.beginAssessment}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-xs uppercase tracking-widest text-sage-500 font-semibold">
          {t.results.step}
        </p>
        <h1 className="text-2xl mt-1">{t.results.title}</h1>
        <p className="text-sm text-sage-700 mt-1">{t.results.subtitle(results.length)}</p>
      </header>

      <SignalSummary
        regions={physical.regions}
        discomfortTypes={physical.discomfortTypes}
        emotions={emotions}
        emotionalPresence={emotionalPresence}
      />

      {emotionalNote.trim() && (
        <section className="card p-4 border-l-4 border-sage-400">
          <p className="text-[10px] uppercase tracking-widest font-semibold text-sage-500 mb-1">
            {t.results.whatYouNoted}
          </p>
          <p className="text-sm text-sage-800 leading-relaxed italic">
            "{emotionalNote.trim()}"
          </p>
        </section>
      )}

      <ol className="flex flex-col gap-4">
        {results.map(({ point, matches }, idx) => (
          <li key={point.id} className="card p-4 animate-fade-in" style={{ animationDelay: `${idx * 70}ms` }}>
            <div className="flex gap-4">
              {point.image ? (
                <button
                  type="button"
                  onClick={() => setZoomed(point)}
                  aria-label={t.results.enlargeAria(point.name)}
                  className="group relative shrink-0 self-start rounded-2xl outline-none transition-transform hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-sage-500"
                >
                  <ReflexDiagram zone={point.zone} point={point} size={120} />
                  <span className="absolute bottom-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-sage-700/85 text-white shadow-soft transition-colors group-hover:bg-sage-700">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="11" cy="11" r="7" />
                      <line x1="16.5" y1="16.5" x2="21" y2="21" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </span>
                </button>
              ) : (
                <ReflexDiagram zone={point.zone} point={point} size={120} />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg leading-tight">{point.name}</h3>
                  <span className="chip whitespace-nowrap">{t.enums.zone[point.zone]}</span>
                </div>
                <div className="mt-1 flex flex-wrap gap-1">
                  <span className="chip">
                    {t.results.pressure} {t.enums.pressure[point.pressure]}
                  </span>
                  <span className="chip">{point.durationSec}s</span>
                </div>
                {matches.length > 0 && matches[0] !== "grounding" && (
                  <p className="text-[11px] mt-2 text-sage-600">
                    {t.results.suggestedFor}{" "}
                    <span className="font-medium">
                      {matches.slice(0, 4).map(tagLabel).join(", ")}
                    </span>
                  </p>
                )}
              </div>
            </div>

            <div className="mt-3 space-y-2">
              <Section title={t.results.howTo}>{point.technique}</Section>
              <Section title={t.results.whyHelps}>{point.rationale}</Section>
            </div>
          </li>
        ))}
      </ol>

      <div className="flex items-center justify-between gap-3">
        <button
          className="btn-ghost"
          onClick={() => {
            reset();
            navigate("/");
          }}
        >
          {t.results.done}
        </button>
        <Link to="/body" className="btn-primary flex-1" onClick={reset}>
          {t.results.newSession}
        </Link>
      </div>

      {zoomed && <Lightbox point={zoomed} onClose={() => setZoomed(null)} />}
    </div>
  );
}

function Lightbox({ point, onClose }: { point: ReflexPoint; onClose: () => void }) {
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
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-widest font-semibold text-sage-500">{title}</p>
      <p className="text-sm text-sage-800 leading-relaxed mt-0.5">{children}</p>
    </div>
  );
}

function SignalSummary({
  regions,
  discomfortTypes,
  emotions,
  emotionalPresence,
}: {
  regions: string[];
  discomfortTypes: string[];
  emotions: string[];
  emotionalPresence: EmotionalPresence;
}) {
  if (!regions.length && !discomfortTypes.length && !emotions.length) return null;
  return (
    <section className="card p-4">
      <p className="text-[11px] uppercase tracking-widest font-semibold text-sage-500 mb-2">
        {t.results.basedOn}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {regions.map((id) => (
          <span key={id} className="chip">
            {BODY_REGIONS.find((r) => r.id === id)?.label ?? id}
          </span>
        ))}
        {discomfortTypes.map((id) => (
          <span key={id} className="chip">
            {DISCOMFORT_TYPES.find((d) => d.id === id)?.label ?? id}
          </span>
        ))}
        {emotions.map((id) => (
          <span key={id} className="chip">
            {findEmotion(id)?.label ?? id}
          </span>
        ))}
        {emotions.length > 0 && (
          <span className="chip bg-sage-100 border-sage-300 text-sage-800">
            {t.enums.presencePhrase[emotionalPresence]}
          </span>
        )}
      </div>
    </section>
  );
}
