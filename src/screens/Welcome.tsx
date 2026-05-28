import { Link } from "react-router-dom";
import { useAssessment } from "../store/assessment";

export default function Welcome() {
  const { reset } = useAssessment();
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <section className="card p-6 text-center">
        <div className="mx-auto mb-3 w-20 h-20 rounded-full bg-sage-100 flex items-center justify-center text-4xl">
          🌿
        </div>
        <h1 className="text-3xl mb-1">Hi, take a breath.</h1>
        <p className="text-sage-700 text-sm leading-relaxed mb-5">
          Sole maps how your body and feelings show up today, then guides you to reflexology
          points that may bring relief.
        </p>
        <Link to="/body" onClick={reset} className="btn-primary w-full">
          Start a session
          <ArrowIcon />
        </Link>
        <Link to="/history" className="block mt-3 text-sm text-sage-600 hover:text-sage-800">
          View past sessions
        </Link>
      </section>

      <section className="grid grid-cols-3 gap-3">
        {[
          { icon: "🫶", label: "Body" },
          { icon: "💭", label: "Emotions" },
          { icon: "🦶", label: "Points" },
        ].map((s, i) => (
          <div
            key={s.label}
            className="card p-4 flex flex-col items-center text-center gap-1"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <span className="text-2xl">{s.icon}</span>
            <span className="text-xs font-medium text-sage-700">{s.label}</span>
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
