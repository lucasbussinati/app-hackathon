import { LANG } from "../../i18n/config";
import type { PointCopy, PointCopyMap, SpecialistReading } from "./types";
import { PT_PART_1 } from "./pt/part1";
import { PT_PART_2 } from "./pt/part2";
import { PT_PART_3 } from "./pt/part3";
import { PT_PART_4 } from "./pt/part4";
import { EN_PART_1 } from "./en/part1";
import { EN_PART_2 } from "./en/part2";
import { EN_PART_3 } from "./en/part3";
import { EN_PART_4 } from "./en/part4";

/**
 * Part D of the specialist's document ("Fichas dos pontos"): display copy and
 * psychosomatic reading for each reflex point, keyed by point id.
 *
 * The Portuguese entries are the specialist's own text, organized into
 * sections; the English entries are their translation. Only the active
 * language is bundled.
 */
export const POINT_COPY: PointCopyMap =
  LANG === "pt"
    ? { ...PT_PART_1, ...PT_PART_2, ...PT_PART_3, ...PT_PART_4 }
    : { ...EN_PART_1, ...EN_PART_2, ...EN_PART_3, ...EN_PART_4 };

export function pointCopy(pointId: string): PointCopy | undefined {
  return POINT_COPY[pointId];
}

export function readingFor(pointId: string): SpecialistReading | undefined {
  return POINT_COPY[pointId]?.reading;
}

export type { PointCopy, PointCopyMap, RichBlock, SpecialistReading } from "./types";
