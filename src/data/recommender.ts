import type { EmotionalPresence, PhysicalAssessment, ReflexPoint } from "./types";
import { REFLEX_POINTS } from "./reflexPoints";
import { expandEmotionSelection } from "./emotions";

interface ScoredPoint {
  point: ReflexPoint;
  score: number;
  matches: string[];
}

/**
 * Simple, transparent recommender:
 *   - Build a "signal" set from the user's selections.
 *   - Score each reflex point by how many of its tags match.
 *   - Boost intense or chronic signals so they outweigh mild ones.
 *
 * This is intentionally simple so the user (and reviewer) can see WHY a
 * point was recommended. Phase 2 can replace this with an LLM call that
 * returns the same shape.
 */
export function recommend(
  physical: PhysicalAssessment,
  emotionIds: string[],
  emotionalPresence: EmotionalPresence = "present",
  limit = 5,
): ScoredPoint[] {
  const expandedEmotions = expandEmotionSelection(emotionIds);
  const signals = new Set<string>([
    ...physical.regions,
    ...physical.discomfortTypes,
    ...expandedEmotions,
  ]);

  const intensityBoost =
    physical.intensity === "intense" ? 1.5 : physical.intensity === "moderate" ? 1.2 : 1;
  const durationBoost =
    physical.duration === "chronic" ? 1.3 : physical.duration === "recurring" ? 1.15 : 1;
  const presenceBoost =
    emotionalPresence === "intense" ? 1.35 : emotionalPresence === "present" ? 1.15 : 1;

  const scored: ScoredPoint[] = REFLEX_POINTS.map((point) => {
    const matches = point.tags.filter((tag) => signals.has(tag));
    const baseScore = matches.length;
    const score = baseScore * intensityBoost * durationBoost * presenceBoost;
    return { point, score, matches };
  });

  const positives = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score);

  // Fallback: if nothing matched, still recommend two grounding points so the
  // user never sees an empty results screen.
  if (positives.length === 0) {
    return [
      {
        point: REFLEX_POINTS.find((p) => p.id === "solar-plexus-foot")!,
        score: 0,
        matches: ["grounding"],
      },
      {
        point: REFLEX_POINTS.find((p) => p.id === "hand-solar")!,
        score: 0,
        matches: ["grounding"],
      },
    ];
  }

  return positives.slice(0, limit);
}
