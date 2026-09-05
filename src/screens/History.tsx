import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { clearAllSessions, deleteSession, loadSessions } from "../data/storage";
import { findEmotion } from "../data/emotions";
import { BODY_REGIONS, discomfortLabel } from "../data/bodyRegions";
import { recommend } from "../data/recommender";
import { PointLightbox, PointThumbnail } from "../components/PointZoom";
import type { ReflexPoint, Session } from "../data/types";
import { LANG, t } from "../i18n";

export default function History() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [zoomed, setZoomed] = useState<ReflexPoint | null>(null);

  useEffect(() => {
    setSessions(loadSessions());
  }, []);

  if (sessions.length === 0) {
    return (
      <div className="card p-6 text-center flex flex-col items-center gap-3">
        <span className="text-3xl">🌱</span>
        <h1 className="text-xl">{t.history.emptyTitle}</h1>
        <p className="text-sm text-sage-700">{t.history.emptyText}</p>
        <Link to="/body" className="btn-primary mt-2">
          {t.history.startNow}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl">{t.history.title}</h1>
        <button
          onClick={() => {
            if (confirm(t.history.clearConfirm)) {
              clearAllSessions();
              setSessions([]);
            }
          }}
          className="text-xs text-sage-600 hover:text-sage-800 underline"
        >
          {t.history.clearAll}
        </button>
      </header>

      <ol className="flex flex-col gap-3">
        {sessions.map((s) => {
          const isExpanded = expandedId === s.id;
          const recommendations = isExpanded
            ? recommend(s.physical, s.emotions, s.emotionalPresence ?? "present", 5)
            : [];

          return (
            <li key={s.id} className="card overflow-hidden">
              <div className="flex items-center justify-between px-4 pt-4">
                <p className="text-sm font-semibold text-sage-800">{formatDate(s.createdAt)}</p>
                <button
                  type="button"
                  onClick={() => {
                    deleteSession(s.id);
                    setSessions(loadSessions());
                    if (isExpanded) setExpandedId(null);
                  }}
                  className="text-xs text-sage-500 hover:text-red-600"
                  aria-label={t.history.deleteAria}
                >
                  {t.history.delete}
                </button>
              </div>

              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? null : s.id)}
                className="w-full px-4 pb-4 text-left"
                aria-expanded={isExpanded}
              >
                <Group label={t.history.body}>
                  {s.physical.regions.map((id) => (
                    <span key={id} className="chip">
                      {BODY_REGIONS.find((r) => r.id === id)?.label ?? id}
                    </span>
                  ))}
                  {s.physical.discomfortTypes.map((id) => (
                    <span key={id} className="chip">
                      {discomfortLabel(id)}
                    </span>
                  ))}
                  <span className="chip">{t.enums.intensity[s.physical.intensity]}</span>
                  <span className="chip">{t.enums.duration[s.physical.duration]}</span>
                </Group>

                <Group label={t.history.emotions}>
                  {s.emotions.map((id) => (
                    <span key={id} className="chip">
                      {findEmotion(id)?.label ?? id}
                    </span>
                  ))}
                  {s.emotions.length > 0 && s.emotionalPresence && (
                    <span className="chip bg-sage-100 border-sage-300 text-sage-800">
                      {t.enums.presencePhrase[s.emotionalPresence]}
                    </span>
                  )}
                  {s.emotions.length === 0 && (
                    <span className="text-[11px] text-sage-500">—</span>
                  )}
                </Group>

                {s.emotionalNote && (
                  <div className="mt-2">
                    <p className="text-[10px] uppercase tracking-widest text-sage-500 font-semibold mb-1">
                      {t.history.note}
                    </p>
                    <p className="text-xs italic text-sage-700 leading-relaxed">
                      "{s.emotionalNote}"
                    </p>
                  </div>
                )}

                <span className="mt-3 flex items-center justify-between text-sm font-semibold text-sage-700">
                  {isExpanded ? t.history.hidePlan : t.history.viewPlan}
                  <ChevronIcon expanded={isExpanded} />
                </span>
              </button>

              {isExpanded && (
                <section className="border-t border-sage-100 bg-sage-50/50 px-4 py-4">
                  <h2 className="text-sm font-semibold text-sage-900">
                    {t.history.recommended}
                  </h2>
                  <p className="mt-0.5 text-[11px] text-sage-600">
                    {t.history.regeneratedPlan}
                  </p>

                  <ol className="mt-3 flex flex-col gap-3">
                    {recommendations.map(({ point }) => (
                      <li key={point.id} className="rounded-2xl border border-sage-100 bg-white p-3">
                        <div className="flex items-start gap-3">
                          <PointThumbnail point={point} size={88} onZoom={setZoomed} />
                          <div className="min-w-0 flex-1">
                            <h3 className="text-base leading-tight text-sage-900">{point.name}</h3>
                            <div className="mt-1 flex flex-wrap gap-1">
                              <span className="chip">
                                {t.results.pressure} {t.enums.pressure[point.pressure]}
                              </span>
                              <span className="chip">{point.durationSec}s</span>
                            </div>
                          </div>
                        </div>
                        <RecommendationText title={t.history.howTo}>
                          {point.technique}
                        </RecommendationText>
                        <RecommendationText title={t.history.whyHelps}>
                          {point.rationale}
                        </RecommendationText>
                      </li>
                    ))}
                  </ol>
                </section>
              )}
            </li>
          );
        })}
      </ol>

      {zoomed && <PointLightbox point={zoomed} onClose={() => setZoomed(null)} />}
    </div>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-2">
      <p className="text-[10px] uppercase tracking-widest text-sage-500 font-semibold mb-1">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function RecommendationText({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-2">
      <p className="text-[10px] uppercase tracking-widest text-sage-500 font-semibold">
        {title}
      </p>
      <p className="mt-0.5 text-xs leading-relaxed text-sage-800">{children}</p>
    </div>
  );
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform ${expanded ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function formatDate(ts: number) {
  const d = new Date(ts);
  return d.toLocaleString(LANG === "pt" ? "pt-BR" : undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
