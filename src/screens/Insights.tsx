import { Link, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useAssessment } from "../store/assessment";
import { matchBodyMind, type ScoredInsight } from "../data/recommender";
import { BODY_REGIONS } from "../data/bodyRegions";
import { findEmotion, FAMILY_LABELS } from "../data/emotions";
import { findPointById } from "../data/reflexPoints";
import type { EmotionFamily } from "../data/types";
import { t, tagLabel } from "../i18n";

export default function Insights() {
  const navigate = useNavigate();
  const { physical, emotions } = useAssessment();

  const insights = useMemo(
    () => matchBodyMind(physical, emotions, 5),
    [physical, emotions],
  );

  const hasAnyInput =
    physical.regions.length > 0 ||
    physical.discomfortTypes.length > 0 ||
    emotions.length > 0;

  if (!hasAnyInput || insights.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <header>
          <p className="text-xs uppercase tracking-widest text-sage-500 font-semibold">
            {t.insights.step}
          </p>
          <h1 className="text-2xl mt-1">{t.insights.title}</h1>
        </header>
        <div className="card p-6 text-center">
          <p className="text-sage-700 mb-4">{t.insights.emptyText}</p>
          <Link to="/body" className="btn-primary">
            {t.insights.beginAssessment}
          </Link>
        </div>
        {hasAnyInput && (
          <div className="flex items-center justify-between gap-3">
            <Link to="/emotions" className="btn-ghost">
              {t.insights.back}
            </Link>
            <button className="btn-primary flex-1" onClick={() => navigate("/results")}>
              {t.insights.next}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-xs uppercase tracking-widest text-sage-500 font-semibold">
          {t.insights.step}
        </p>
        <h1 className="text-2xl mt-1">{t.insights.title}</h1>
        <p className="text-sm text-sage-700 mt-1">{t.insights.subtitle}</p>
      </header>

      <section className="card p-4 bg-sage-50/60 border-sage-200">
        <p className="text-sm text-sage-700 leading-relaxed">{t.insights.intro}</p>
      </section>

      <ol className="flex flex-col gap-4">
        {insights.map((insight, idx) => (
          <InsightCard key={insight.entry.id} insight={insight} idx={idx} />
        ))}
      </ol>

      <section className="card p-3 border-l-4 border-sand-300 bg-sand-50/70">
        <p className="text-[11px] text-sage-600 leading-relaxed">
          <span aria-hidden>⚠️ </span>
          {t.insights.disclaimer}
        </p>
      </section>

      <div className="flex items-center justify-between gap-3">
        <Link to="/emotions" className="btn-ghost">
          {t.insights.back}
        </Link>
        <button className="btn-primary flex-1" onClick={() => navigate("/results")}>
          {t.insights.next}
        </button>
      </div>
    </div>
  );
}

function InsightCard({ insight, idx }: { insight: ScoredInsight; idx: number }) {
  const { entry, matchedRegions, matchedEmotions } = insight;

  const matchedLabels = [
    ...matchedRegions.map((id) => BODY_REGIONS.find((r) => r.id === id)?.label ?? id),
    ...matchedEmotions.map(resolveSignalLabel),
  ];
  // De-duplicate while keeping order (a family + its child can both match).
  const uniqueMatched = Array.from(new Set(matchedLabels));

  const relatedPoints = entry.relatedPointIds
    .map((id) => findPointById(id)?.name)
    .filter((name): name is string => Boolean(name));

  return (
    <li className="card p-4 animate-fade-in" style={{ animationDelay: `${idx * 70}ms` }}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-lg leading-tight">{entry.name}</h3>
          <p className="text-sm font-medium text-sage-700 mt-0.5">{entry.theme}</p>
        </div>
        <span className="chip whitespace-nowrap shrink-0">{t.insights.categories[entry.category]}</span>
      </div>

      {uniqueMatched.length > 0 && (
        <p className="text-[11px] mt-2 text-sage-600">
          {t.insights.matchedFor}{" "}
          <span className="font-medium">{uniqueMatched.join(", ")}</span>
        </p>
      )}

      <div className="mt-3 space-y-3">
        <Block title={t.insights.meaning}>
          <p className="text-sm text-sage-800 leading-relaxed">{entry.meaning}</p>
        </Block>

        <Block title={t.insights.physicalFunction}>
          <ul className="text-sm text-sage-700 leading-relaxed list-disc pl-4 space-y-0.5">
            {entry.physicalFunction.map((fn, i) => (
              <li key={i}>{fn}</li>
            ))}
          </ul>
        </Block>

        {entry.patterns && entry.patterns.length > 0 && (
          <Block title={t.insights.patterns}>
            <div className="flex flex-col gap-1.5">
              {entry.patterns.map((p, i) => (
                <div key={i} className="text-sm text-sage-700 leading-relaxed">
                  <span className="font-semibold text-sage-800">{p.label}:</span> {p.description}
                </div>
              ))}
            </div>
          </Block>
        )}

        {entry.reflections.length > 0 && (
          <div className="rounded-2xl bg-sage-50 border border-sage-100 p-3">
            <p className="text-[11px] uppercase tracking-widest font-semibold text-sage-500 mb-1">
              {t.insights.reflections}
            </p>
            {entry.reflections.map((r, i) => (
              <p key={i} className="text-sm text-sage-800 leading-relaxed italic">
                “{r}”
              </p>
            ))}
          </div>
        )}

        {entry.questions.length > 0 && (
          <Block title={t.insights.questions}>
            <ul className="text-sm text-sage-800 leading-relaxed space-y-1">
              {entry.questions.map((q, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-sage-400" aria-hidden>
                    ›
                  </span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </Block>
        )}

        {relatedPoints.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] text-sage-500 font-medium">
              {t.insights.relatedPoints}
            </span>
            {relatedPoints.map((name) => (
              <span key={name} className="chip">
                {name}
              </span>
            ))}
          </div>
        )}

        {entry.note && (
          <p className="text-[11px] text-sage-500 leading-relaxed border-t border-sage-100 pt-2">
            {entry.note}
          </p>
        )}
      </div>
    </li>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-widest font-semibold text-sage-500 mb-1">
        {title}
      </p>
      {children}
    </div>
  );
}

/**
 * Resolve an emotion tag to a readable label: a specific emotion name, a
 * family name, or the localized recommender tag as a fallback.
 */
function resolveSignalLabel(tag: string): string {
  const emotion = findEmotion(tag);
  if (emotion) return emotion.label;
  if (tag in FAMILY_LABELS) return FAMILY_LABELS[tag as EmotionFamily];
  return tagLabel(tag);
}
