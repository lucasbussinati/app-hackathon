import type { Session } from "./types";

const KEY = "sole.sessions.v1";

export function loadSessions(): Session[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Session[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Inserts the session, or replaces the saved one with the same id (keeping its original date). */
export function saveSession(session: Session) {
  const all = loadSessions();
  const previous = all.find((s) => s.id === session.id);
  const next = previous ? { ...session, createdAt: previous.createdAt } : session;
  const others = all.filter((s) => s.id !== session.id);
  localStorage.setItem(KEY, JSON.stringify([next, ...others].slice(0, 50)));
}

export function deleteSession(id: string) {
  const all = loadSessions().filter((s) => s.id !== id);
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function clearAllSessions() {
  localStorage.removeItem(KEY);
}
