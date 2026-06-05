import { Link, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useAssessment } from "../store/assessment";
import EmotionWheel from "../components/EmotionWheel";
import { EMOTION_FAMILY_COLORS, FAMILY_LABELS, findEmotion } from "../data/emotions";
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
    emotions,
    toggleEmotion,
    emotionalPresence,
    setEmotionalPresence,
    emotionalNote,
    setEmotionalNote,
  } = useAssessment();

  const grouped = useMemo(() => groupByFamily(emotions), [emotions]);

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
        <p className="mt-2 text-center text-[11px] text-sage-500">{t.emotions.wheelHint}</p>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-sage-800 mb-2">{t.emotions.selected}</h2>
        {emotions.length === 0 ? (
          <div className="card p-4 text-center">
            <p className="text-xs text-sage-500">{t.emotions.nothingYet}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {Object.entries(grouped).map(([family, ids]) => (
              <FamilyGroup
                key={family}
                family={family as keyof typeof EMOTION_FAMILY_COLORS}
                ids={ids}
                onRemove={toggleEmotion}
              />
            ))}
          </div>
        )}
      </section>

      <section className="card p-4">
        <h2 className="text-sm font-semibold text-sage-800 mb-1">{t.emotions.strength}</h2>
        <p className="text-xs text-sage-600 mb-3">{t.emotions.strengthHint}</p>
        <div className="grid grid-cols-3 gap-2">
          {PRESENCE_OPTIONS.map((opt) => {
            const active = emotionalPresence === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setEmotionalPresence(opt.id)}
                className={`rounded-2xl py-3 px-2 text-sm font-medium border transition-all ${
                  active
                    ? "bg-sage-100 border-sage-400 text-sage-800 shadow-soft"
                    : "bg-white/60 border-sage-200 text-sage-600 hover:border-sage-300"
                }`}
                aria-pressed={active}
              >
                <div className="text-xl leading-none mb-1">{opt.emoji}</div>
                <div>{t.emotions.presence[opt.id].label}</div>
                <div className="text-[10px] font-normal text-sage-500 mt-0.5">
                  {t.emotions.presence[opt.id].hint}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="card p-4">
        <div className="flex items-center justify-between mb-1.5">
          <h2 className="text-sm font-semibold text-sage-800">{t.emotions.ackTitle}</h2>
          <span className="text-[10px] text-sage-500 font-medium">{t.emotions.optional}</span>
        </div>
        <p className="text-xs text-sage-600 mb-3">{t.emotions.ackHint}</p>
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
          onClick={() => navigate("/insights")}
          disabled={emotions.length === 0}
        >
          {t.emotions.next}
        </button>
      </div>
    </div>
  );
}

function FamilyGroup({
  family,
  ids,
  onRemove,
}: {
  family: keyof typeof EMOTION_FAMILY_COLORS;
  ids: string[];
  onRemove: (id: string) => void;
}) {
  const c = EMOTION_FAMILY_COLORS[family];
  return (
    <div
      className="rounded-2xl border p-3"
      style={{ background: `${c.l3}66`, borderColor: c.l2 }}
    >
      <p
        className="text-[10px] uppercase tracking-widest font-semibold mb-1.5"
        style={{ color: c.text }}
      >
        {FAMILY_LABELS[family]}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {ids.map((id) => {
          const emotion = findEmotion(id);
          if (!emotion) return null;
          const isPrimary = emotion.level === 1;
          const isSecondary = emotion.level === 2;
          return (
            <button
              key={id}
              onClick={() => onRemove(id)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-all hover:opacity-80"
              style={{
                background: isPrimary ? c.ringStrong : isSecondary ? c.l1 : c.l2,
                borderColor: c.ringStrong,
                color: isPrimary || isSecondary ? c.textStrong : c.text,
              }}
              aria-label={`${t.emotions.remove} ${emotion.label}`}
            >
              {isPrimary && <span className="text-[10px] opacity-80">{t.emotions.familyTag}</span>}
              {isSecondary && (
                <span className="text-[10px] opacity-80">{t.emotions.clusterTag}</span>
              )}
              {emotion.label}
              <span className="opacity-70">×</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function groupByFamily(ids: string[]): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const id of ids) {
    const e = findEmotion(id);
    if (!e) continue;
    if (!out[e.family]) out[e.family] = [];
    out[e.family].push(id);
  }
  return out;
}
