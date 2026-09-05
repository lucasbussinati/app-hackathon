import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useAssessment } from "../store/assessment";
import { recommend } from "../data/recommender";
import { PointLightbox, PointThumbnail } from "../components/PointZoom";
import { saveSession } from "../data/storage";
import type { ReflexPoint, Session } from "../data/types";
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
              <PointThumbnail point={point} size={120} onZoom={setZoomed} />
              <div className="flex-1 min-w-0">
                <h3 className="text-lg leading-tight">{point.name}</h3>
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

      {zoomed && <PointLightbox point={zoomed} onClose={() => setZoomed(null)} />}
    </div>
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
