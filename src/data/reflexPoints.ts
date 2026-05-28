import type { ReflexPoint } from "./types";
import { LANG } from "../i18n/config";
import { PT_POINTS } from "../i18n/content";

/**
 * Curated set of common reflexology points used in self-care literature.
 * Positions are approximate, expressed as percentages of the diagram's
 * bounding box (so they scale with any size).
 *
 * NOTE: This is educational content for an MVP/hackathon; in production we'd
 * vet the catalogue with a licensed reflexologist and add citations.
 */
const RAW_REFLEX_POINTS: ReflexPoint[] = [
  {
    id: "solar-plexus-foot",
    name: "Solar Plexus (foot)",
    zone: "foot",
    position: { x: 50, y: 42 },
    technique:
      "Press the center of the ball of the foot with the pad of your thumb in slow, deepening circles.",
    pressure: "medium",
    durationSec: 60,
    rationale:
      "The solar plexus reflex calms the autonomic nervous system — it's the go-to point for stress, anxiety and shallow breathing.",
    associatedWith: ["nervous system", "breath", "calm"],
    tags: ["stress", "anxious", "overwhelmed", "worried", "chest", "fatigue", "headache"],
  },
  {
    id: "head-toes",
    name: "Head & sinuses (toes)",
    zone: "foot",
    position: { x: 50, y: 8 },
    technique:
      "Walk your thumb down each toe from base to tip, then gently squeeze the tips for 3 seconds.",
    pressure: "light",
    durationSec: 45,
    rationale:
      "Tips of the toes map to the head and sinuses — useful for headaches, eye strain and mental fog.",
    associatedWith: ["head", "sinuses", "focus"],
    tags: ["headache", "head", "tension", "confused", "neck"],
  },
  {
    id: "stomach-foot",
    name: "Stomach reflex (left foot arch)",
    zone: "foot",
    position: { x: 35, y: 55 },
    technique:
      "On the left foot's inner arch, press and slowly slide your thumb in horizontal lines.",
    pressure: "medium",
    durationSec: 60,
    rationale:
      "The arch of the left foot mirrors the stomach — helps with digestive unease and 'gut-feeling' anxiety.",
    associatedWith: ["digestion", "stomach"],
    tags: ["digestive", "stomach", "anxious", "uneasy"],
  },
  {
    id: "spine-foot",
    name: "Spine line (inner foot)",
    zone: "foot",
    position: { x: 22, y: 50 },
    technique:
      "Run your thumb along the inner edge of the foot from heel to big toe with steady, even pressure.",
    pressure: "firm",
    durationSec: 75,
    rationale:
      "The inner edge of the foot maps to the spine — opens up back tension and posture-related discomfort.",
    associatedWith: ["spine", "posture", "back"],
    tags: ["upperBack", "lowerBack", "stiffness", "tension", "neck", "shoulders"],
  },
  {
    id: "shoulder-foot",
    name: "Shoulder reflex (under little toe)",
    zone: "foot",
    position: { x: 78, y: 22 },
    technique:
      "At the base of the little toe, make small firm circles with your thumb.",
    pressure: "firm",
    durationSec: 45,
    rationale:
      "Reflects the shoulder joint — releases tension carried from screen work or stress.",
    associatedWith: ["shoulders", "neck"],
    tags: ["shoulders", "tension", "stress", "frustrated"],
  },
  {
    id: "hand-solar",
    name: "Hand solar plexus",
    zone: "hand",
    position: { x: 50, y: 55 },
    technique:
      "Press the center of the palm with the opposite thumb. Breathe in for 4, out for 6, three times.",
    pressure: "medium",
    durationSec: 60,
    rationale:
      "A portable version of the foot's solar plexus point — great when you're out and need to ground quickly.",
    associatedWith: ["calm", "anxiety"],
    tags: ["anxious", "overwhelmed", "stress", "worried", "impatient"],
  },
  {
    id: "hand-thumb-head",
    name: "Head reflex (thumb pad)",
    zone: "hand",
    position: { x: 38, y: 18 },
    technique:
      "Pinch the pad of the thumb between index and thumb of the other hand. Slow squeezes for 3s each.",
    pressure: "light",
    durationSec: 45,
    rationale:
      "Reflects the head — discreet relief for tension headaches during meetings or commutes.",
    associatedWith: ["head", "focus"],
    tags: ["headache", "tension", "head", "confused"],
  },
  {
    id: "hand-webbing",
    name: "Hegu (LI4) — hand webbing",
    zone: "hand",
    position: { x: 30, y: 38 },
    technique:
      "In the fleshy webbing between thumb and index finger, press firmly with the opposite thumb for 30s, then switch hands.",
    pressure: "firm",
    durationSec: 60,
    rationale:
      "A classic point traditionally used for headaches, neck tension and emotional 'stuckness'.",
    associatedWith: ["head", "neck", "release"],
    tags: ["headache", "neck", "shoulders", "frustrated", "irritated", "tension"],
  },
  {
    id: "ear-shenmen",
    name: "Shen Men (ear)",
    zone: "ear",
    position: { x: 52, y: 28 },
    technique:
      "At the upper triangular hollow of the ear, press gently with your index finger in slow circles.",
    pressure: "light",
    durationSec: 45,
    rationale:
      "The 'spirit gate' — used in ear acupressure to calm racing thoughts and ease emotional overwhelm.",
    associatedWith: ["calm", "sleep"],
    tags: ["anxious", "overwhelmed", "stress", "tired", "sad", "worried"],
  },
  {
    id: "ear-zero",
    name: "Point Zero (ear)",
    zone: "ear",
    position: { x: 50, y: 55 },
    technique:
      "On the small ridge in the center of the ear bowl, press lightly with a fingertip for 30 seconds each ear.",
    pressure: "light",
    durationSec: 40,
    rationale:
      "Reputed to rebalance the body's energy — gentle reset point when you feel scattered or off-center.",
    associatedWith: ["balance", "reset"],
    tags: ["disconnected", "withdrawn", "tired", "confused", "uneasy"],
  },
];

/** Localized at build time: only display text changes for PT; ids/tags are stable. */
export const REFLEX_POINTS: ReflexPoint[] =
  LANG === "pt"
    ? RAW_REFLEX_POINTS.map((p) => {
        const tr = PT_POINTS[p.id];
        return tr ? { ...p, name: tr.name, technique: tr.technique, rationale: tr.rationale } : p;
      })
    : RAW_REFLEX_POINTS;

export function findPointById(id: string) {
  return REFLEX_POINTS.find((p) => p.id === id);
}
