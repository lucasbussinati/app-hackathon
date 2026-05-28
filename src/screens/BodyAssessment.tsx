import { Link, useNavigate } from "react-router-dom";
import { useAssessment } from "../store/assessment";
import BodyMap from "../components/BodyMap";
import { DISCOMFORT_TYPES } from "../data/bodyRegions";
import { t } from "../i18n";

const INTENSITIES = [
  { id: "mild", label: t.body.intensities.mild, emoji: "🌱" },
  { id: "moderate", label: t.body.intensities.moderate, emoji: "🌿" },
  { id: "intense", label: t.body.intensities.intense, emoji: "🌶️" },
] as const;

const DURATIONS = [
  { id: "acute", label: t.body.durations.acute, emoji: "⏱️" },
  { id: "recurring", label: t.body.durations.recurring, emoji: "🔁" },
  { id: "chronic", label: t.body.durations.chronic, emoji: "📆" },
] as const;

export default function BodyAssessment() {
  const navigate = useNavigate();
  const {
    regions,
    toggleRegion,
    discomfortTypes,
    toggleDiscomfort,
    intensity,
    setIntensity,
    duration,
    setDuration,
  } = useAssessment();

  const canContinue = regions.length > 0 || discomfortTypes.length > 0;

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-xs uppercase tracking-widest text-sage-500 font-semibold">
          {t.body.step}
        </p>
        <h1 className="text-2xl mt-1">{t.body.title}</h1>
        <p className="text-sm text-sage-700 mt-1">{t.body.subtitle}</p>
      </header>

      <section className="card p-4">
        <BodyMap selected={regions} onToggle={toggleRegion} />
      </section>

      <section className="card p-4">
        <h2 className="text-sm font-semibold text-sage-800 mb-3">{t.body.feelLike}</h2>
        <div className="flex flex-wrap gap-2">
          {DISCOMFORT_TYPES.map((d) => {
            const selected = discomfortTypes.includes(d.id);
            return (
              <button
                key={d.id}
                onClick={() => toggleDiscomfort(d.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm border transition-all ${
                  selected
                    ? "bg-sage-600 text-white border-sage-700 shadow-soft"
                    : "bg-white/70 text-sage-700 border-sage-200 hover:border-sage-400"
                }`}
                aria-pressed={selected}
              >
                <span>{d.emoji}</span>
                {d.label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="card p-4">
        <h2 className="text-sm font-semibold text-sage-800 mb-3">{t.body.intensity}</h2>
        <div className="grid grid-cols-3 gap-2">
          {INTENSITIES.map((i) => (
            <button
              key={i.id}
              onClick={() => setIntensity(i.id)}
              className={`rounded-2xl py-3 text-sm font-medium border transition-all ${
                intensity === i.id
                  ? "bg-sage-100 border-sage-400 text-sage-800"
                  : "bg-white/60 border-sage-200 text-sage-600"
              }`}
            >
              <div className="text-xl leading-none mb-1">{i.emoji}</div>
              {i.label}
            </button>
          ))}
        </div>
      </section>

      <section className="card p-4">
        <h2 className="text-sm font-semibold text-sage-800 mb-3">{t.body.duration}</h2>
        <div className="grid grid-cols-3 gap-2">
          {DURATIONS.map((d) => (
            <button
              key={d.id}
              onClick={() => setDuration(d.id)}
              className={`rounded-2xl py-3 text-sm font-medium border transition-all ${
                duration === d.id
                  ? "bg-sage-100 border-sage-400 text-sage-800"
                  : "bg-white/60 border-sage-200 text-sage-600"
              }`}
            >
              <div className="text-xl leading-none mb-1">{d.emoji}</div>
              {d.label}
            </button>
          ))}
        </div>
      </section>

      <div className="flex items-center justify-between gap-3">
        <Link to="/" className="btn-ghost">
          {t.body.back}
        </Link>
        <button
          className="btn-primary flex-1"
          disabled={!canContinue}
          onClick={() => navigate("/emotions")}
        >
          {t.body.next}
        </button>
      </div>
    </div>
  );
}
