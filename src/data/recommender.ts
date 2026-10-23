import type { EmotionalPresence, PhysicalAssessment, ReflexPoint } from "./types";
import { REFLEX_POINTS } from "./reflexPoints";
import { expandEmotionSelection } from "./emotions";
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
 * Simple, transparent recommender. Every point related to what the user
 * reported is returned, uncapped:
 *   - First, the points PARTE B of the specialist's document lists for the
 *     selected discomforts, in her order.
 *   - Then every other point whose tags match a selected region, discomfort or
 *     emotion, scored by how many tags match. Intense or chronic signals are
 *     boosted so they outweigh mild ones.
 *   - Ties break by precision, then by the per-selection shuffle, so points that
 *     answer exactly what was reported come first.
 *
 * This is intentionally simple so the user (and reviewer) can see WHY a
 * point was recommended. Phase 2 can replace this with an LLM call that
 * returns the same shape.
 */
export function recommend(
  physical: PhysicalAssessment,
  emotionIds: string[],
  emotionalPresence: EmotionalPresence = "present",
): ScoredPoint[] {
  const footPoints = REFLEX_POINTS.filter((p) => p.zone === "foot");
  const discomfortPointIds = pointIdsForDiscomforts(physical.discomfortTypes);

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

  const specialistOrdered = discomfortPointIds.map((pointId, index) => {
    const scored = ranked.find((candidate) => candidate.point.id === pointId);
    if (!scored) {
      throw new Error(`Ponto ${pointId} da Parte B não existe no catálogo.`);
    }

    const discomforts = physical.discomfortTypes.filter((discomfort) =>
      DISCOMFORT_POINT_NUMBERS[discomfort].some(
        (pointNumber) => POINT_ID_BY_REFERENCE_NUMBER[pointNumber] === pointId,
      ),
    );

    return {
      point: scored.point,
      score: Number.MAX_SAFE_INTEGER - index,
      matches: [...new Set([...discomforts, ...scored.matches])],
    };
  });

  const specialistIds = new Set(discomfortPointIds);
  const tagMatched = ranked
    .filter((s) => s.score > 0 && !specialistIds.has(s.point.id))
    .sort((a, b) => b.score - a.score || b.precision - a.precision || b.shuffle - a.shuffle)
    .map(({ point, score, matches }) => ({ point, score, matches }));

  const positives = [...specialistOrdered, ...tagMatched];

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

  return positives;
}
