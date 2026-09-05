import { Link } from "react-router-dom";
import { useAssessment } from "../store/assessment";
import { JOURNEY_ICONS } from "../data/journey";
import { t } from "../i18n";

export default function Welcome() {
  const { reset } = useAssessment();
  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      <section className="card p-6 text-center">
        <div className="mx-auto mb-3 w-20 h-20 rounded-full bg-sage-100 flex items-center justify-center text-4xl">
          🌿
        </div>
        <h1 className="text-3xl mb-1">{t.welcome.greeting}</h1>
        <p className="text-sage-700 text-sm leading-relaxed mb-5">{t.welcome.intro}</p>
        <Link to="/body" onClick={reset} className="btn-primary w-full">
          {t.welcome.start}
          <ArrowIcon />
        </Link>
        <Link to="/history" className="block mt-3 text-sm text-sage-600 hover:text-sage-800">
          {t.welcome.viewPast}
        </Link>
      </section>

      <section className="card p-4">
        <p className="text-[11px] uppercase tracking-widest font-semibold text-sage-500 text-center">
          {t.welcome.journeyLead}
        </p>
        <ol className="mt-3 flex items-start">
          {t.journey.map((step, i) => (
            <li key={step.id} className="flex flex-1 items-start">
              {i > 0 && (
                <span className="text-sage-300 text-xs self-center px-0.5" aria-hidden>
                  ›
                </span>
              )}
              <div className="flex-1 flex flex-col items-center gap-1 text-center">
                <span className="text-xl leading-none">{JOURNEY_ICONS[step.id]}</span>
                <span className="text-[11px] font-medium text-sage-700 leading-tight">
                  {step.label}
                </span>
              </div>
            </li>
          ))}
        </ol>
        <Link
          to="/about"
          className="mt-4 block text-center text-xs text-sage-600 hover:text-sage-800 underline underline-offset-2"
        >
          {t.welcome.learnMore}
        </Link>
      </section>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
