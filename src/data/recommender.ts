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
import {
  DISCOMFORT_POINT_NUMBERS,
  POINT_ID_BY_REFERENCE_NUMBER,
  pointIdsForDiscomforts,
} from "./discomfortPointRules";

interface ScoredPoint {
  point: ReflexPoint;
  score: number;
  matches: string[];
}

/**
 * Deterministic per-selection shuffle key. Several points in the catalogue answer
 * the exact same signals (e.g. tonsils and vocal cords are both neck + sore throat).
 * Without this, ties always resolve to catalogue order and the later twin could
 * never be shown. Hashing the point id together with the selection keeps a given
 * selection reproducible while spreading equivalent points across selections.
 */
function tieBreaker(pointId: string, selectionKey: string): number {
  let hash = 2166136261;
  const input = `${pointId}|${selectionKey}`;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) / 4294967295;
}

/**
 * Simple, transparent recommender:
 *   - If the user selected a discomfort, use PARTE B of the specialist's
 *     document as the authoritative, ordered rule. These rules are not capped
 *     by `limit`; every listed point must be displayed.
 *   - Otherwise, build a "signal" set from the user's selections.
 *   - Score each reflex point by how many of its tags match.
 *   - Boost intense or chronic signals so they outweigh mild ones.
 *   - Break ties by precision, then by the per-selection shuffle, so points that
 *     answer exactly what was reported win and no point is permanently buried.
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
  const discomfortPointIds = pointIdsForDiscomforts(physical.discomfortTypes);

  if (discomfortPointIds.length > 0) {
    return discomfortPointIds.map((pointId, index) => {
      const point = footPoints.find((candidate) => candidate.id === pointId);
      if (!point) {
        throw new Error(`Ponto ${pointId} da Parte B não existe no catálogo.`);
      }

      const matches = physical.discomfortTypes.filter((discomfort) =>
        DISCOMFORT_POINT_NUMBERS[discomfort].some(
          (pointNumber) => POINT_ID_BY_REFERENCE_NUMBER[pointNumber] === pointId,
        ),
      );

      return {
        point,
        score: discomfortPointIds.length - index,
        matches,
      };
    });
  }

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

  const selectionKey = [...signals].sort().join(",");

  const ranked = footPoints.map((point) => {
    const matches = point.tags.filter((tag) => signals.has(tag));
    const score = matches.length * intensityBoost * durationBoost * presenceBoost;
    return {
      point,
      score,
      matches,
      // How much of this point is about what the user actually reported. A point
      // tagged only "neck, soreThroat" is a tighter answer to that pair than a
      // broad point that happens to carry those two tags among six.
      precision: matches.length / point.tags.length,
      shuffle: tieBreaker(point.id, selectionKey),
    };
  });

  const positives = ranked
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || b.precision - a.precision || b.shuffle - a.shuffle)
    .map(({ point, score, matches }) => ({ point, score, matches }));

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
 * Relevance is tried in tiers, strongest first, and the first tier that yields
 * anything wins:
 *   1. entry overlaps BOTH the reported regions and the reported emotions;
 *   2. entry overlaps the reported regions;
 *   3. entry overlaps the reported emotions;
 *   4. entry overlaps the reported discomfort.
 *
 * The map is authored region-by-region, so demanding a region *and* an emotion
 * match left most selections with no reflection at all and silently skipped
 * step 3. Falling back keeps the connection honest — a card only ever claims the
 * overlap it actually has, via `matchedRegions`/`matchedEmotions`.
 *
 * Results are then capped to within 60% of the top score (avoids weak tails).
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

  const withScore = scored.filter((s) => s.score > 0);
  const tiers = [
    (s: ScoredInsight) =>
      (!requireRegion || s.matchedRegions.length > 0) &&
      (!requireEmotion || s.matchedEmotions.length > 0),
    (s: ScoredInsight) => requireRegion && s.matchedRegions.length > 0,
    (s: ScoredInsight) => requireEmotion && s.matchedEmotions.length > 0,
    (s: ScoredInsight) => s.matchedDiscomfort.length > 0,
  ];

  const relevant = tiers.reduce<ScoredInsight[]>(
    (found, accept) => (found.length > 0 ? found : withScore.filter(accept)),
    [],
  );

  if (relevant.length === 0) return [];

  relevant.sort((a, b) => b.score - a.score);

  const topScore = relevant[0].score;
  const minScore = Math.max(topScore * 0.6, 3);

  return relevant.filter((s) => s.score >= minScore).slice(0, limit);
}
