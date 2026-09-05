import type { DiscomfortType } from "./types.ts";

/**
 * PARTE B — TIPO DE DESCONFORTO → QUAIS PONTOS RECOMENDAR
 *
 * Source of truth:
 * regras-de-recomendacao-PONTOS-TEMPLATE PREENCHIDO.docx
 *
 * The arrays preserve the document's order and repeated numbers. The
 * recommender removes repetitions on display, keeping the first occurrence,
 * because the same reflex point should not be rendered twice in one plan.
 */
export const DISCOMFORT_POINT_NUMBERS = {
  headache: [17, 43, 44, 11, 12, 57, 14, 15, 1, 56, 35, 34],
  tension: [17, 43, 44, 117, 1, 25, 57, 14, 5, 12, 15, 21],
  pain: [17, 43, 44, 39, 33, 34, 35, 34, 13],
  stiffness: [17, 43, 44, 4, 11, 12, 13, 39],
  fatigue: [17, 43, 44, 39, 21, 1, 6, 7, 8, 10, 11, 39],
  digestive: [17, 44, 43, 56, 3, 7, 9, 10],
  stress: [17, 43, 44, 62, 63, 17, 19, 18, 1, 56, 117, 11, 12, 3, 35, 34],
  spinePain: [17, 43, 44, 19, 18, 117, 65, 21, 42, 25, 5, 57],
  napePain: [17, 43, 44, 19, 35, 34],
  sciatica: [17, 43, 44, 17, 19, 18, 81, 4, 39, 16],
  anxietyDiscomfort: [17, 43, 44, 117, 21, 57, 19, 56, 11, 35],
  exhaustion: [17, 18, 43, 44, 117, 21, 57, 19, 56, 10, 11, 8, 35, 34],
  insomnia: [17, 43, 44, 15, 117, 56, 1, 35, 34, 65],
  sinusitis: [17, 43, 44, 2, 6, 1, 35, 34],
  soreThroat: [17, 43, 44, 1, 11, 12, 45, 40, 2, 6, 35, 34],
  shoulderPain: [17, 43, 44, 5, 1, 11, 12, 4, 35, 34],
  legPain: [17, 43, 44, 21, 1, 11, 12, 17, 19, 18, 53, 59, 35, 34],
  menstrualCramp: [17, 43, 44, 59, 53, 11, 12, 7, 1, 35, 34],
  intestinalCramp: [17, 43, 44, 9, 23, 57, 7, 1, 39, 35, 34],
  tinnitus: [17, 43, 44, 72, 74, 75, 16, 17, 19, 18, 21, 3, 7, 25, 52, 57, 38, 35, 34],
  depression: [17, 43, 44, 11, 1, 4, 5, 6, 16, 20, 2, 3, 7, 9, 10, 53, 39, 59, 56, 59, 83, 117, 35, 41, 42],
  fibromyalgia: [17, 43, 44, 16, 4, 39, 15, 39, 61, 17, 19, 18, 6, 39, 11, 12, 1, 117, 9, 23, 36, 35, 34],
} as const satisfies Record<DiscomfortType, readonly number[]>;

export const POINT_ID_BY_REFERENCE_NUMBER: Readonly<Record<number, string>> = {
  1: "solar-plexus-foot",
  2: "head-toes",
  3: "stomach-foot",
  4: "spine-foot",
  5: "shoulder-foot",
  6: "lung-foot",
  7: "liver-foot",
  8: "kidney-foot",
  9: "large-intestine-foot",
  10: "pancreas-foot",
  11: "thyroid-foot",
  12: "parathyroid-foot",
  13: "sciatic-foot",
  14: "atm-foot",
  15: "trigeminal-foot",
  16: "p16-bulbo",
  17: "p17-coluna-cervical",
  18: "p18-coluna-lombar",
  19: "p19-coluna-toracica",
  20: "p20-coracao-pe-esquerdo",
  21: "p21-esgotamento",
  23: "p23-intestino-delgado-e-duodeno",
  25: "p25-joelho",
  33: "p33-cerebelo",
  34: "p34-circulacao-linfatica",
  35: "p35-circulacao-sanguinea-central",
  36: "p36-circulacao-sanguinea-periferica",
  38: "p38-cortex",
  39: "p39-diafragma",
  40: "p40-faringe",
  41: "p41-ganglios-linfaticos-inferiores",
  42: "p42-ganglios-linfaticos-superiores-e-medios",
  43: "p43-hipotalamo",
  44: "p44-hipofise",
  45: "p45-laringe",
  52: "p52-ouvido",
  53: "p53-ovarios-ou-testiculos",
  56: "p56-pineal",
  57: "p57-ponto-de-tensao",
  59: "p59-utero-ou-prostata",
  61: "p61-cerebro",
  62: "p62-sistema-limbico",
  63: "p63-hipocampo",
  65: "p65-ponto-do-sono",
  72: "p72-nervo-auditivo",
  74: "p74-area-auditiva-orelha-media-e-interna",
  75: "p75-tuba-auditiva",
  81: "p81-nervo-ciatico-motor",
  83: "p83-bronquios",
  117: "p117-supra-renal",
};

export function pointNumbersForDiscomforts(discomforts: readonly DiscomfortType[]): number[] {
  const seen = new Set<number>();
  const ordered: number[] = [];

  for (const discomfort of discomforts) {
    for (const pointNumber of DISCOMFORT_POINT_NUMBERS[discomfort]) {
      if (seen.has(pointNumber)) continue;
      seen.add(pointNumber);
      ordered.push(pointNumber);
    }
  }

  return ordered;
}

export function pointIdsForDiscomforts(discomforts: readonly DiscomfortType[]): string[] {
  return pointNumbersForDiscomforts(discomforts).map((pointNumber) => {
    const pointId = POINT_ID_BY_REFERENCE_NUMBER[pointNumber];
    if (!pointId) {
      throw new Error(`Ponto ${pointNumber} da Parte B não existe no catálogo.`);
    }
    return pointId;
  });
}
