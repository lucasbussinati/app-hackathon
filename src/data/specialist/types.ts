import type { ReflexPoint } from "../types";

/**
 * One block of rich text inside a reading section:
 *   - a string is a paragraph;
 *   - a string[] is a bullet list;
 *   - `{ heading }` is a small sub-heading (e.g. "Mãos" / "Pés").
 */
export type RichBlock = string | string[] | { heading: string };

/**
 * The specialist's psychosomatic reading of one reflex point
 * ("Correções da especialista" in the source document), organized into
 * sections. Every section is optional except `theme`.
 */
export interface SpecialistReading {
  /** One-line emotional theme, shown on the collapsed card. */
  theme: string;
  /** "Função física": what the structure does in the body. */
  physical?: RichBlock[];
  /** "Associação emocional psicossomática": the emotional theme. */
  emotional?: RichBlock[];
  /** "Relação simbólica": the bridge between the physical and the emotional. */
  symbolic?: RichBlock[];
  /** Popular expressions that echo the theme ("Engolir sapos"). */
  expressions?: string[];
  /** Synthesis / meditation phrases, rendered as quotes. */
  reflections?: string[];
  /** Questions for the person to sit with. */
  questions?: string[];
  /** Caveat, e.g. that physical causes must be evaluated by a professional. */
  note?: string;
}

/**
 * Localized display copy for one reflex point, transcribed from Part D of the
 * specialist's document. Fields left out keep the catalogue's existing value.
 */
export interface PointCopy {
  name?: string;
  technique?: string;
  rationale?: string;
  pressure?: ReflexPoint["pressure"];
  durationSec?: number;
  reading?: SpecialistReading;
}

export type PointCopyMap = Record<string, PointCopy>;
