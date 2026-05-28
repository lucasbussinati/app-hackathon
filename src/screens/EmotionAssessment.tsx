import { Link, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useAssessment } from "../store/assessment";
import EmotionWheel from "../components/EmotionWheel";
import { EMOTION_FAMILY_COLORS, FAMILY_LABELS, findEmotion } from "../data/emotions";
import type { EmotionalPresence } from "../data/types";

const PRESENCE_OPTIONS: Array<{ id: EmotionalPresence; label: string; emoji: string; hint: string }> = [
  { id: "subtle", label: "Subtle", emoji: "🌬️", hint: "in the background" },
  { id: "present", label: "Present", emoji: "🪷", hint: "clearly here" },
  { id: "intense", label: "Intense", emoji: "🌊", hint: "feels loud" },
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
          Step 2 of 3
        </p>
        <h1 className="text-2xl mt-1">How are you feeling?</h1>
        <p className="text-sm text-sage-700 mt-1">
          Start broad in the middle, or get specific on the edges. Feelings often come in layers
          — pick as many as resonate.
        </p>
      </header>

      <section className="card p-3 sm:p-4">
        <EmotionWheel selected={emotions} onToggle={toggleEmotion} />
        <p className="mt-2 text-center text-[11px] text-sage-500">
          Tap a family, a cluster, or a specific feeling — at any level.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-sage-800 mb-2">Selected</h2>
        {emotions.length === 0 ? (
          <div className="card p-4 text-center">
            <p className="text-xs text-sage-500">
              Nothing yet — tap a wedge above. You can pick more than one.
            </p>
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
        <h2 className="text-sm font-semibold text-sage-800 mb-1">
          How strongly are these showing up?
        </h2>
        <p className="text-xs text-sage-600 mb-3">
          A gentle gauge — it helps shape your recommendations.
        </p>
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
                <div>{opt.label}</div>
                <div className="text-[10px] font-normal text-sage-500 mt-0.5">{opt.hint}</div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="card p-4">
        <div className="flex items-center justify-between mb-1.5">
          <h2 className="text-sm font-semibold text-sage-800">
            Anything you'd like to acknowledge?
          </h2>
          <span className="text-[10px] text-sage-500 font-medium">optional</span>
        </div>
        <p className="text-xs text-sage-600 mb-3">
          A line or two for yourself — what's brought this on. Saved with your session.
        </p>
        <textarea
          value={emotionalNote}
          onChange={(e) => setEmotionalNote(e.target.value.slice(0, NOTE_MAX))}
          rows={3}
          placeholder="e.g. Sleep was rough last night, and that presentation tomorrow…"
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
          Back
        </Link>
        <button
          className="btn-primary flex-1"
          onClick={() => navigate("/results")}
          disabled={emotions.length === 0}
        >
          See my recommendations
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
              aria-label={`Remove ${emotion.label}`}
            >
              {isPrimary && <span className="text-[10px] opacity-80">family ·</span>}
              {isSecondary && <span className="text-[10px] opacity-80">cluster ·</span>}
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
