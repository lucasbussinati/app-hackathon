import assert from "node:assert/strict";
import test from "node:test";

import {
  DISCOMFORT_POINT_NUMBERS,
  POINT_ID_BY_REFERENCE_NUMBER,
  pointIdsForDiscomforts,
  pointNumbersForDiscomforts,
} from "../src/data/discomfortPointRules.ts";

test("dor de cabeça segue exatamente a ordem da Parte B", () => {
  assert.deepEqual(DISCOMFORT_POINT_NUMBERS.headache, [
    17, 43, 44, 11, 12, 57, 14, 15, 1, 56, 35, 34,
  ]);
  assert.equal(DISCOMFORT_POINT_NUMBERS.headache.length, 12);
  assert.deepEqual(pointNumbersForDiscomforts(["headache"]), [
    17, 43, 44, 11, 12, 57, 14, 15, 1, 56, 35, 34,
  ]);
});

test("todos os 22 desconfortos da Parte B possuem regra", () => {
  assert.equal(Object.keys(DISCOMFORT_POINT_NUMBERS).length, 22);
});

test("todo número citado pela Parte B resolve para um ponto do catálogo", () => {
  const referencedNumbers = new Set(Object.values(DISCOMFORT_POINT_NUMBERS).flat());
  const missing = [...referencedNumbers].filter(
    (pointNumber) => !POINT_ID_BY_REFERENCE_NUMBER[pointNumber],
  );

  assert.deepEqual(missing, []);
});

test("repetições editoriais são exibidas uma vez, na primeira posição", () => {
  assert.deepEqual(DISCOMFORT_POINT_NUMBERS.pain, [17, 43, 44, 39, 33, 34, 35, 34, 13]);
  assert.deepEqual(pointNumbersForDiscomforts(["pain"]), [17, 43, 44, 39, 33, 34, 35, 13]);
});

test("múltiplos desconfortos formam uma união ordenada sem pontos repetidos", () => {
  assert.deepEqual(pointNumbersForDiscomforts(["headache", "napePain"]), [
    17, 43, 44, 11, 12, 57, 14, 15, 1, 56, 35, 34, 19,
  ]);
});

test("os ids de dor de cabeça incluem todos os 12 pontos", () => {
  assert.deepEqual(pointIdsForDiscomforts(["headache"]), [
    "p17-coluna-cervical",
    "p43-hipotalamo",
    "p44-hipofise",
    "thyroid-foot",
    "parathyroid-foot",
    "p57-ponto-de-tensao",
    "atm-foot",
    "trigeminal-foot",
    "solar-plexus-foot",
    "p56-pineal",
    "p35-circulacao-sanguinea-central",
    "p34-circulacao-linfatica",
  ]);
});
