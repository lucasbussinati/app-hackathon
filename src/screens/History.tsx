import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { clearAllSessions, deleteSession, loadSessions } from "../data/storage";
import { findEmotion } from "../data/emotions";
import { BODY_REGIONS, DISCOMFORT_TYPES } from "../data/bodyRegions";
import { findPointById } from "../data/reflexPoints";
import type { Session } from "../data/types";

export default function History() {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    setSessions(loadSessions());
  }, []);

  if (sessions.length === 0) {
    return (
      <div className="card p-6 text-center flex flex-col items-center gap-3">
        <span className="text-3xl">🌱</span>
        <h1 className="text-xl">No sessions yet</h1>
        <p className="text-sm text-sage-700">
          Once you complete a session, you'll find it here to revisit.
        </p>
        <Link to="/body" className="btn-primary mt-2">
          Start one now
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl">History</h1>
        <button
          onClick={() => {
            if (confirm("Clear all saved sessions?")) {
              clearAllSessions();
              setSessions([]);
            }
          }}
          className="text-xs text-sage-600 hover:text-sage-800 underline"
        >
          Clear all
        </button>
      </header>

      <ol className="flex flex-col gap-3">
        {sessions.map((s) => (
          <li key={s.id} className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-sage-800">{formatDate(s.createdAt)}</p>
              <button
                onClick={() => {
                  deleteSession(s.id);
                  setSessions(loadSessions());
                }}
                className="text-xs text-sage-500 hover:text-red-600"
                aria-label="Delete session"
              >
                Delete
              </button>
            </div>

            <Group label="Body">
              {s.physical.regions.map((id) => (
                <span key={id} className="chip">
                  {BODY_REGIONS.find((r) => r.id === id)?.label ?? id}
                </span>
              ))}
              {s.physical.discomfortTypes.map((id) => (
                <span key={id} className="chip">
                  {DISCOMFORT_TYPES.find((d) => d.id === id)?.label ?? id}
                </span>
              ))}
              <span className="chip">{s.physical.intensity}</span>
              <span className="chip">{s.physical.duration}</span>
            </Group>

            <Group label="Emotions">
              {s.emotions.map((id) => (
                <span key={id} className="chip">
                  {findEmotion(id)?.label ?? id}
                </span>
              ))}
              {s.emotions.length > 0 && s.emotionalPresence && (
                <span className="chip bg-sage-100 border-sage-300 text-sage-800">
                  {s.emotionalPresence} presence
                </span>
              )}
              {s.emotions.length === 0 && (
                <span className="text-[11px] text-sage-500">—</span>
              )}
            </Group>

            {s.emotionalNote && (
              <div className="mt-2">
                <p className="text-[10px] uppercase tracking-widest text-sage-500 font-semibold mb-1">
                  Note
                </p>
                <p className="text-xs italic text-sage-700 leading-relaxed">
                  "{s.emotionalNote}"
                </p>
              </div>
            )}

            <Group label="Recommended">
              {s.recommendedPointIds.map((id) => {
                const p = findPointById(id);
                if (!p) return null;
                return (
                  <span key={id} className="chip bg-sage-100 border-sage-300 text-sage-800">
                    {p.name}
                  </span>
                );
              })}
            </Group>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-2">
      <p className="text-[10px] uppercase tracking-widest text-sage-500 font-semibold mb-1">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function formatDate(ts: number) {
  const d = new Date(ts);
  return d.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
