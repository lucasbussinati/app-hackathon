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
  const footPoints = REFLEX_POINTS.filter((p) => p.zone === "foot");
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

  const scored: ScoredPoint[] = footPoints.map((point) => {
    const matches = point.tags.filter((tag) => signals.has(tag));
    const baseScore = matches.length;
    const score = baseScore * intensityBoost * durationBoost * presenceBoost;
    return { point, score, matches };
  });

  const positives = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score);

  // Fallback: if nothing matched, still recommend two foot grounding points so the
  // user never sees an empty results screen.
  if (positives.length === 0) {
    return [
      {
        point: footPoints.find((p) => p.id === "solar-plexus-foot")!,
        score: 0,
        matches: ["grounding"],
      },
      {
        point: footPoints.find((p) => p.id === "spine-foot")!,
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
  matchedDiscomfort: string[];
}

/**
 * Match the user's selections against the Body–Mind Map ("the brain") to
 * explain what their discomfort and emotions *may* be communicating.
 *
 * Relevance rules (strict — only show what connects to steps 1 & 2):
 *   - If the user picked body regions → entry MUST overlap at least one.
 *   - If the user picked emotions → entry MUST overlap at least one (expanded).
 *   - Discomfort types add score but never qualify an entry on their own.
 *   - Results must be within 60% of the top score (avoids weak tail matches).
 */
export function matchBodyMind(
  physical: PhysicalAssessment,
  emotionIds: string[],
  limit = 3,
): ScoredInsight[] {
  const expanded = expandEmotionSelection(emotionIds);
  const regionSet = new Set<BodyRegion>(physical.regions);
  const discomfortSet = new Set(physical.discomfortTypes);
  const requireRegion = physical.regions.length > 0;
  const requireEmotion = emotionIds.length > 0;

  const scored: ScoredInsight[] = BODY_MIND_MAP.map((entry) => {
    const matchedRegions = entry.relatedRegions.filter((r) => regionSet.has(r));
    const matchedEmotions = entry.emotionTags.filter((tag) => expanded.has(tag));
    const matchedDiscomfort = entry.relatedDiscomfort.filter((d) => discomfortSet.has(d));

    const score =
      matchedRegions.length * 3 +
      matchedEmotions.length * 2 +
      matchedDiscomfort.length * 2;

    return { entry, score, matchedRegions, matchedEmotions, matchedDiscomfort };
  });

  const relevant = scored.filter((s) => {
    if (s.score <= 0) return false;
    if (requireRegion && s.matchedRegions.length === 0) return false;
    if (requireEmotion && s.matchedEmotions.length === 0) return false;
    return true;
  });

  if (relevant.length === 0) return [];

  relevant.sort((a, b) => b.score - a.score);

  const topScore = relevant[0].score;
  const minScore = Math.max(topScore * 0.6, 3);

  return relevant.filter((s) => s.score >= minScore).slice(0, limit);
}
