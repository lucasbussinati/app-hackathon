import { NavLink, Outlet, useLocation } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home", icon: HomeIcon },
  { to: "/history", label: "History", icon: HistoryIcon },
  { to: "/about", label: "About", icon: InfoIcon },
];

export default function AppShell() {
  const { pathname } = useLocation();
  const onAssessmentFlow =
    pathname.startsWith("/body") ||
    pathname.startsWith("/emotions") ||
    pathname.startsWith("/results");

  return (
    <div className="min-h-full bg-gradient-to-b from-sand-50 via-sand-50 to-sage-50 flex flex-col">
      <header className="sticky top-0 z-20 backdrop-blur-md bg-sand-50/80 border-b border-sage-100">
        <div className="mx-auto max-w-md px-4 py-3 flex items-center gap-2">
          <Logo className="w-8 h-8" />
          <div className="flex-1">
            <p className="font-display text-lg leading-none text-sage-800">Sole</p>
            <p className="text-[11px] text-sage-600 leading-tight">Reflexology, gently guided</p>
          </div>
          {onAssessmentFlow && <FlowProgress />}
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-md px-4 pt-4 pb-28 animate-fade-in">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 inset-x-0 z-20 border-t border-sage-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto max-w-md grid grid-cols-3 px-4 py-2 pb-[max(env(safe-area-inset-bottom),0.5rem)]">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 py-1.5 rounded-2xl transition-colors ${
                  isActive ? "text-sage-700" : "text-sage-400 hover:text-sage-600"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="text-[11px] font-medium">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}

function FlowProgress() {
  const { pathname } = useLocation();
  const steps = ["/body", "/emotions", "/results"];
  const currentIdx = steps.findIndex((s) => pathname.startsWith(s));
  return (
    <div className="flex items-center gap-1">
      {steps.map((_, i) => (
        <span
          key={i}
          className={`block h-1.5 rounded-full transition-all ${
            i <= currentIdx ? "bg-sage-600 w-6" : "bg-sage-200 w-3"
          }`}
        />
      ))}
    </div>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7ea077" />
          <stop offset="100%" stopColor="#496944" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#lg)" />
      <path
        d="M32 14c-7 0-12 5-12 12 0 6 4 10 4 14 0 4 3 6 8 6s8-2 8-6c0-4 4-8 4-14 0-7-5-12-12-12z"
        fill="#fbf8f3"
      />
      <circle cx="26" cy="22" r="2.2" fill="#496944" />
      <circle cx="32" cy="20" r="2.2" fill="#496944" />
      <circle cx="38" cy="22" r="2.2" fill="#496944" />
      <circle cx="40" cy="28" r="2.2" fill="#496944" />
    </svg>
  );
}

function HomeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v10h14V10" />
    </svg>
  );
}

function HistoryIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v5h5" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function InfoIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8h.01M11 12h1v5h1" />
    </svg>
  );
}
