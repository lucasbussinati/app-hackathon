import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useAssessment } from "../store/assessment";
import { recommend } from "../data/recommender";
import { findEmotion } from "../data/emotions";
import { BODY_REGIONS, DISCOMFORT_TYPES } from "../data/bodyRegions";
import ReflexDiagram from "../components/ReflexDiagram";
import { saveSession } from "../data/storage";
import type { Session } from "../data/types";

export default function Results() {
  const navigate = useNavigate();
  const { physical, emotions, emotionalPresence, emotionalNote, reset } = useAssessment();
  const [saved, setSaved] = useState(false);

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
        <p className="text-sage-700 mb-4">
          Nothing to recommend yet — let's start a session first.
        </p>
        <Link to="/body" className="btn-primary">
          Begin assessment
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-xs uppercase tracking-widest text-sage-500 font-semibold">
          Step 3 of 3
        </p>
        <h1 className="text-2xl mt-1">Your reflexology plan</h1>
        <p className="text-sm text-sage-700 mt-1">
          {results.length} points tailored to how you're feeling right now.
        </p>
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
            What you noted
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
              <ReflexDiagram zone={point.zone} point={point} size={120} />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg leading-tight">{point.name}</h3>
                  <span className="chip whitespace-nowrap">{point.zone}</span>
                </div>
                <div className="mt-1 flex flex-wrap gap-1">
                  <span className="chip">Pressure: {point.pressure}</span>
                  <span className="chip">{point.durationSec}s</span>
                </div>
                {matches.length > 0 && matches[0] !== "grounding" && (
                  <p className="text-[11px] mt-2 text-sage-600">
                    Suggested for: <span className="font-medium">{matches.slice(0, 4).join(", ")}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="mt-3 space-y-2">
              <Section title="How to do it">{point.technique}</Section>
              <Section title="Why it helps">{point.rationale}</Section>
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
          Done
        </button>
        <Link to="/body" className="btn-primary flex-1" onClick={reset}>
          New session
        </Link>
      </div>
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

function SignalSummary({
  regions,
  discomfortTypes,
  emotions,
  emotionalPresence,
}: {
  regions: string[];
  discomfortTypes: string[];
  emotions: string[];
  emotionalPresence: string;
}) {
  if (!regions.length && !discomfortTypes.length && !emotions.length) return null;
  return (
    <section className="card p-4">
      <p className="text-[11px] uppercase tracking-widest font-semibold text-sage-500 mb-2">
        Based on
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
            {emotionalPresence} presence
          </span>
        )}
      </div>
    </section>
  );
}
