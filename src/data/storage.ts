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

export function saveSession(session: Session) {
  const all = loadSessions();
  all.unshift(session);
  localStorage.setItem(KEY, JSON.stringify(all.slice(0, 50)));
}

export function deleteSession(id: string) {
  const all = loadSessions().filter((s) => s.id !== id);
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function clearAllSessions() {
  localStorage.removeItem(KEY);
}
