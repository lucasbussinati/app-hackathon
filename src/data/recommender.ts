import type {
  BodyRegion,
  EmotionalPresence,
  LocalizedBodyMindEntry,
  PhysicalAssessment,
  ReflexPoint,
} from "./types";
import { REFLEX_POINTS } from "./reflexPoints";
import { expandEmotionSelection } from "./emotions";
import { BODY_MIND_MAP } from "./bodyMindMap";

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

export interface ScoredInsight {
  entry: LocalizedBodyMindEntry;
  score: number;
  matchedRegions: BodyRegion[];
  matchedEmotions: string[];
}

/**
 * Match the user's selections against the Body–Mind Map ("the brain") to
 * explain what their discomfort and emotions *may* be communicating.
 *
 * Body-region overlaps weigh more than emotion overlaps, since the user
 * explicitly pointed at a place on the body. This is a transparent,
 * tag-based lookup — Phase 2 can swap it for an LLM that reads the same map.
 */
export function matchBodyMind(
  physical: PhysicalAssessment,
  emotionIds: string[],
  limit = 4,
): ScoredInsight[] {
  const expanded = expandEmotionSelection(emotionIds);
  const regionSet = new Set<BodyRegion>(physical.regions);

  const scored: ScoredInsight[] = BODY_MIND_MAP.map((entry) => {
    const matchedRegions = entry.relatedRegions.filter((r) => regionSet.has(r));
    const matchedEmotions = entry.emotionTags.filter((tag) => expanded.has(tag));
    const score = matchedRegions.length * 2 + matchedEmotions.length;
    return { entry, score, matchedRegions, matchedEmotions };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
