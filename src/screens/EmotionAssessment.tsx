import { Link, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useAssessment } from "../store/assessment";
import EmotionWheel from "../components/EmotionWheel";
import { matchBodyMind } from "../data/recommender";
import type { EmotionalPresence } from "../data/types";
import { t } from "../i18n";

const PRESENCE_OPTIONS: Array<{ id: EmotionalPresence; emoji: string }> = [
  { id: "subtle", emoji: "🌬️" },
  { id: "present", emoji: "🪷" },
  { id: "intense", emoji: "🌊" },
];

const NOTE_MAX = 240;

export default function EmotionAssessment() {
  const navigate = useNavigate();
  const {
    physical,
    emotions,
    toggleEmotion,
    emotionalPresence,
    setEmotionalPresence,
    emotionalNote,
    setEmotionalNote,
  } = useAssessment();

  // Whether step 3 (insights) has anything to show. When it doesn't, we skip it
  // entirely and the button leads straight to the reflexology plan.
  const hasInsights = useMemo(
    () => matchBodyMind(physical, emotions).length > 0,
    [physical, emotions],
  );

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-xs uppercase tracking-widest text-sage-500 font-semibold">
          {t.emotions.step}
        </p>
        <h1 className="text-2xl mt-1">{t.emotions.title}</h1>
        <p className="text-sm text-sage-700 mt-1">{t.emotions.subtitle}</p>
      </header>

      <section className="card p-3 sm:p-4">
        <EmotionWheel selected={emotions} onToggle={toggleEmotion} />
      </section>

      <section className="card p-4">
        <h2 className="text-sm font-semibold text-sage-800 mb-3">{t.emotions.strength}</h2>
        <div className="grid grid-cols-3 gap-2">
          {PRESENCE_OPTIONS.map((opt) => {
            const active = emotionalPresence === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setEmotionalPresence(opt.id)}
                className={`rounded-2xl py-3 px-2 text-sm font-medium border transition-all text-center ${
                  active
                    ? "bg-sage-100 border-sage-400 text-sage-800 shadow-soft"
                    : "bg-white/60 border-sage-200 text-sage-600 hover:border-sage-300"
                }`}
                aria-pressed={active}
              >
                <div className="text-xl leading-none mb-1">{opt.emoji}</div>
                <div>{t.emotions.presence[opt.id].label}</div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="card p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-sage-800">{t.emotions.ackTitle}</h2>
          <span className="text-[10px] text-sage-500 font-medium">{t.emotions.optional}</span>
        </div>
        <textarea
          value={emotionalNote}
          onChange={(e) => setEmotionalNote(e.target.value.slice(0, NOTE_MAX))}
          rows={3}
          placeholder={t.emotions.notePlaceholder}
          className="w-full resize-none rounded-2xl border border-sage-200 bg-white/70 px-3 py-2.5 text-sm text-sage-800 placeholder:text-sage-400 focus:outline-none focus:border-sage-400 focus:bg-white transition-colors"
        />
        <div className="mt-1 flex items-center justify-end">
          <span className="text-[10px] text-sage-500">
            {emotionalNote.length}/{NOTE_MAX}
          </span>
        </div>
      </section>

      <div className="flex items-center justify-between gap-3">
        <Link to="/body" className="btn-ghost">
          {t.emotions.back}
        </Link>
        <button
          className="btn-primary flex-1"
          onClick={() => navigate(hasInsights ? "/insights" : "/results")}
          disabled={emotions.length === 0}
        >
          {hasInsights ? t.emotions.next : t.insights.next}
        </button>
      </div>
    </div>
  );
}
