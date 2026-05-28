import type { Emotion, EmotionFamily } from "./types";

/**
 * Three-tier emotion taxonomy inspired by Gloria Wilcox's Feelings Wheel.
 *
 *   Level 1 — primary family (Joy, Sadness, Anger, Fear, Surprise, Disgust)
 *   Level 2 — secondary cluster (Peaceful, Drained, Anxious, ...)
 *   Level 3 — specific tertiary feeling (content, lonely, worried, ...)
 *
 * The recommender expands a selection upward (to family) and downward
 * (to descendants), so users can be vague or precise.
 */
export const EMOTIONS: Emotion[] = [
  // ============================ JOY ============================
  { id: "joy", label: "Joy", family: "joy", level: 1 },
  { id: "joy.peaceful", label: "Peaceful", family: "joy", level: 2, parentId: "joy" },
  { id: "content", label: "Content", family: "joy", level: 3, parentId: "joy.peaceful" },
  { id: "grateful", label: "Grateful", family: "joy", level: 3, parentId: "joy.peaceful" },
  { id: "joy.playful", label: "Playful", family: "joy", level: 2, parentId: "joy" },
  { id: "joyful", label: "Joyful", family: "joy", level: 3, parentId: "joy.playful" },
  { id: "hopeful", label: "Hopeful", family: "joy", level: 3, parentId: "joy.playful" },

  // ============================ SADNESS ============================
  { id: "sadness", label: "Sadness", family: "sadness", level: 1 },
  { id: "sadness.hurt", label: "Hurt", family: "sadness", level: 2, parentId: "sadness" },
  { id: "disappointed", label: "Let down", family: "sadness", level: 3, parentId: "sadness.hurt" },
  { id: "lonely", label: "Lonely", family: "sadness", level: 3, parentId: "sadness.hurt" },
  { id: "sadness.drained", label: "Drained", family: "sadness", level: 2, parentId: "sadness" },
  { id: "tired", label: "Tired", family: "sadness", level: 3, parentId: "sadness.drained" },
  { id: "sad", label: "Sad", family: "sadness", level: 3, parentId: "sadness.drained" },

  // ============================ ANGER ============================
  { id: "anger", label: "Anger", family: "anger", level: 1 },
  { id: "anger.frustrated", label: "Frustrated", family: "anger", level: 2, parentId: "anger" },
  { id: "irritated", label: "Irritated", family: "anger", level: 3, parentId: "anger.frustrated" },
  { id: "impatient", label: "Impatient", family: "anger", level: 3, parentId: "anger.frustrated" },
  { id: "anger.resentful", label: "Resentful", family: "anger", level: 2, parentId: "anger" },
  { id: "resentful", label: "Resentful", family: "anger", level: 3, parentId: "anger.resentful" },
  { id: "frustrated", label: "Frustrated", family: "anger", level: 3, parentId: "anger.resentful" },

  // ============================ FEAR ============================
  { id: "fear", label: "Fear", family: "fear", level: 1 },
  { id: "fear.anxious", label: "Anxious", family: "fear", level: 2, parentId: "fear" },
  { id: "anxious", label: "Anxious", family: "fear", level: 3, parentId: "fear.anxious" },
  { id: "worried", label: "Worried", family: "fear", level: 3, parentId: "fear.anxious" },
  { id: "fear.overwhelmed", label: "Overwhelmed", family: "fear", level: 2, parentId: "fear" },
  { id: "overwhelmed", label: "Overwhelmed", family: "fear", level: 3, parentId: "fear.overwhelmed" },
  { id: "insecure", label: "Insecure", family: "fear", level: 3, parentId: "fear.overwhelmed" },

  // ============================ SURPRISE ============================
  { id: "surprise", label: "Surprise", family: "surprise", level: 1 },
  { id: "surprise.amazed", label: "Amazed", family: "surprise", level: 2, parentId: "surprise" },
  { id: "amazed", label: "Amazed", family: "surprise", level: 3, parentId: "surprise.amazed" },
  { id: "curious", label: "Curious", family: "surprise", level: 3, parentId: "surprise.amazed" },
  { id: "surprise.confused", label: "Confused", family: "surprise", level: 2, parentId: "surprise" },
  { id: "confused", label: "Confused", family: "surprise", level: 3, parentId: "surprise.confused" },
  { id: "shocked", label: "Shocked", family: "surprise", level: 3, parentId: "surprise.confused" },

  // ============================ DISGUST ============================
  { id: "disgust", label: "Disgust", family: "disgust", level: 1 },
  { id: "disgust.withdrawn", label: "Withdrawn", family: "disgust", level: 2, parentId: "disgust" },
  { id: "withdrawn", label: "Withdrawn", family: "disgust", level: 3, parentId: "disgust.withdrawn" },
  { id: "disconnected", label: "Distant", family: "disgust", level: 3, parentId: "disgust.withdrawn" },
  { id: "disgust.uneasy", label: "Uneasy", family: "disgust", level: 2, parentId: "disgust" },
  { id: "uneasy", label: "Uneasy", family: "disgust", level: 3, parentId: "disgust.uneasy" },
  { id: "judgmental", label: "Critical", family: "disgust", level: 3, parentId: "disgust.uneasy" },
];

/** Ordered list of family ids — used by the wheel to lay out wedges. */
export const FAMILY_ORDER: EmotionFamily[] = [
  "joy",
  "surprise",
  "fear",
  "sadness",
  "disgust",
  "anger",
];

export const FAMILY_LABELS: Record<EmotionFamily, string> = {
  joy: "Joy",
  surprise: "Surprise",
  fear: "Fear",
  sadness: "Sadness",
  disgust: "Disgust",
  anger: "Anger",
};

/**
 * Per-family palette with three shades for the three rings.
 * `text` is for labels on the unselected fill; `ringStrong` is the
 * fully-selected color; `textStrong` is the readable color on top of it.
 */
export const EMOTION_FAMILY_COLORS: Record<
  EmotionFamily,
  {
    l1: string;
    l2: string;
    l3: string;
    ringStrong: string;
    text: string;
    textStrong: string;
  }
> = {
  joy: {
    l1: "#f59e0b",
    l2: "#fbbf24",
    l3: "#fde68a",
    ringStrong: "#d97706",
    text: "#78350f",
    textStrong: "#ffffff",
  },
  surprise: {
    l1: "#22c55e",
    l2: "#86efac",
    l3: "#bbf7d0",
    ringStrong: "#16a34a",
    text: "#14532d",
    textStrong: "#ffffff",
  },
  fear: {
    l1: "#8b5cf6",
    l2: "#c4b5fd",
    l3: "#ddd6fe",
    ringStrong: "#7c3aed",
    text: "#4c1d95",
    textStrong: "#ffffff",
  },
  sadness: {
    l1: "#3b82f6",
    l2: "#93c5fd",
    l3: "#bfdbfe",
    ringStrong: "#2563eb",
    text: "#1e3a8a",
    textStrong: "#ffffff",
  },
  disgust: {
    l1: "#6b7280",
    l2: "#9ca3af",
    l3: "#d1d5db",
    ringStrong: "#4b5563",
    text: "#1f2937",
    textStrong: "#ffffff",
  },
  anger: {
    l1: "#ef4444",
    l2: "#fca5a5",
    l3: "#fecaca",
    ringStrong: "#dc2626",
    text: "#7f1d1d",
    textStrong: "#ffffff",
  },
};

// ---------------------------------------------------------------------------
// Helpers used by the wheel and recommender.
// ---------------------------------------------------------------------------

export function getPrimary(family: EmotionFamily): Emotion {
  return EMOTIONS.find((e) => e.level === 1 && e.family === family)!;
}

export function getSecondaries(family: EmotionFamily): Emotion[] {
  return EMOTIONS.filter((e) => e.level === 2 && e.family === family);
}

export function getTertiaries(secondaryId: string): Emotion[] {
  return EMOTIONS.filter((e) => e.level === 3 && e.parentId === secondaryId);
}

export function findEmotion(id: string): Emotion | undefined {
  return EMOTIONS.find((e) => e.id === id);
}

/**
 * Expand a selection into a signal set:
 *   - keep the id itself
 *   - include all ancestors (parent secondary, parent primary, family id)
 *   - include all descendants (so a primary pick activates its children)
 */
export function expandEmotionSelection(ids: string[]): Set<string> {
  const set = new Set<string>();
  for (const id of ids) {
    const emotion = findEmotion(id);
    if (!emotion) continue;
    set.add(id);
    set.add(emotion.family);

    let cursor: Emotion | undefined = emotion;
    while (cursor?.parentId) {
      set.add(cursor.parentId);
      cursor = findEmotion(cursor.parentId);
    }

    const descendants = EMOTIONS.filter(
      (e) => e.parentId === id || (e.parentId && findEmotion(e.parentId)?.parentId === id),
    );
    for (const d of descendants) set.add(d.id);
  }
  return set;
}
