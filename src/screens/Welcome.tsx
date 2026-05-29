import { Link } from "react-router-dom";
import { useAssessment } from "../store/assessment";
import { t } from "../i18n";

export default function Welcome() {
  const { reset } = useAssessment();
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
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

      <section className="flex flex-col gap-3">
        {[
          { icon: "🫶", label: t.welcome.body, desc: t.welcome.bodyDesc },
          { icon: "💭", label: t.welcome.emotions, desc: t.welcome.emotionsDesc },
          { icon: "🦶", label: t.welcome.points, desc: t.welcome.pointsDesc },
        ].map((s, i) => (
          <div
            key={s.label}
            className="card p-4 flex items-start gap-3"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <span className="text-2xl mt-0.5 shrink-0">{s.icon}</span>
            <div>
              <span className="text-sm font-semibold text-sage-800">{s.label}</span>
              <p className="text-xs text-sage-600 leading-relaxed mt-1">{s.desc}</p>
            </div>
          </div>
        ))}
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
