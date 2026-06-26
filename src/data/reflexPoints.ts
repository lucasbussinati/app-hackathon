import type { ReflexPoint } from "./types";
import { LANG } from "../i18n/config";
import { PT_POINTS } from "../i18n/content";

// Photographic reflexology charts (one per point). Vite resolves these to
// hashed asset URLs that respect the build's base path. Each chart already has
// the point highlighted/labelled, so the Results screen renders the photo
// directly instead of the generated SVG silhouette.
import imgSolarPlexus from "../assets/reflex/solar-plexus.jpeg";
import imgSinus from "../assets/reflex/sinus.jpeg";
import imgStomach from "../assets/reflex/stomach.jpeg";
import imgShoulder from "../assets/reflex/shoulder.jpeg";
import imgNerveFibers from "../assets/reflex/nerve-fibers.jpeg";
import imgLung from "../assets/reflex/lung.jpeg";
import imgLiver from "../assets/reflex/liver.jpeg";
import imgKidney from "../assets/reflex/kidney.jpeg";
import imgLargeIntestine from "../assets/reflex/large-intestine.jpeg";
import imgPancreas from "../assets/reflex/pancreas.jpeg";
import imgThyroid from "../assets/reflex/thyroid.jpeg";
import imgParathyroid from "../assets/reflex/parathyroid.jpeg";
import imgSciatic from "../assets/reflex/sciatic.jpeg";
import imgAtm from "../assets/reflex/atm.jpeg";
import imgTrigeminal from "../assets/reflex/trigeminal.jpeg";

/**
 * Curated set of common reflexology points used in self-care literature.
 * Foot points carry a photographic chart (`image`) authored by the specialist;
 * positions are approximate (percentages of the SVG fallback's bounding box).
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
    image: imgSolarPlexus,
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
    image: imgSinus,
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
    image: imgStomach,
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
    name: "Spine & nerve line (inner edge)",
    zone: "foot",
    position: { x: 22, y: 50 },
    image: imgNerveFibers,
    technique:
      "Run your thumb along the inner edge of the foot from heel to big toe with steady, even pressure.",
    pressure: "firm",
    durationSec: 75,
    rationale:
      "The inner edge of the foot maps to the spine and spinal nerves — opens up back tension and posture-related discomfort.",
    associatedWith: ["spine", "posture", "back", "nerves"],
    tags: ["upperBack", "lowerBack", "stiffness", "tension", "neck", "shoulders"],
  },
  {
    id: "shoulder-foot",
    name: "Shoulder reflex (under little toe)",
    zone: "foot",
    position: { x: 78, y: 22 },
    image: imgShoulder,
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
    id: "lung-foot",
    name: "Lungs & chest (ball of foot)",
    zone: "foot",
    position: { x: 60, y: 32 },
    image: imgLung,
    technique:
      "Across the padded ball of the foot, just below the toes, press and glide your thumb outward in horizontal strokes.",
    pressure: "medium",
    durationSec: 60,
    rationale:
      "The ball of the foot mirrors the lungs and chest — supports fuller breathing and is traditionally linked to releasing held grief and sadness.",
    associatedWith: ["lungs", "breath", "chest"],
    tags: ["chest", "fatigue", "stress", "sad", "sadness", "lonely", "withdrawn", "tired", "worried"],
  },
  {
    id: "liver-foot",
    name: "Liver reflex (right foot)",
    zone: "foot",
    position: { x: 70, y: 50 },
    image: imgLiver,
    technique:
      "On the right foot only, below the ball on the outer side, press with the thumb in slow, deliberate circles.",
    pressure: "medium",
    durationSec: 60,
    rationale:
      "The liver reflex sits on the right foot — in many traditions it carries anger and frustration, and supports the body's sense of cleansing and renewal.",
    associatedWith: ["liver", "detox", "anger"],
    tags: ["anger", "frustrated", "irritated", "resentful", "impatient", "fatigue", "digestive"],
  },
  {
    id: "kidney-foot",
    name: "Kidney reflex (center arch)",
    zone: "foot",
    position: { x: 48, y: 52 },
    image: imgKidney,
    technique:
      "In the center of the arch, hold steady pressure with the thumb, breathing slowly for several cycles.",
    pressure: "medium",
    durationSec: 60,
    rationale:
      "The kidney reflex sits mid-arch — traditionally associated with fear and the body's deep reserves of energy, helpful when you feel depleted or on edge.",
    associatedWith: ["kidneys", "energy", "fear"],
    tags: ["fear", "anxious", "worried", "insecure", "fatigue", "lowerBack", "tired"],
  },
  {
    id: "large-intestine-foot",
    name: "Large intestine (lower sole)",
    zone: "foot",
    position: { x: 45, y: 70 },
    image: imgLargeIntestine,
    technique:
      "Follow the path across the lower sole, working both feet with slow caterpillar-like thumb steps.",
    pressure: "medium",
    durationSec: 75,
    rationale:
      "The large intestine reflex spans both feet — supports digestion and elimination, and the emotional theme of letting go of what no longer serves you.",
    associatedWith: ["intestine", "digestion", "release"],
    tags: ["digestive", "stomach", "uneasy", "withdrawn", "disconnected", "anxious"],
  },
  {
    id: "pancreas-foot",
    name: "Pancreas reflex (inner arch)",
    zone: "foot",
    position: { x: 40, y: 48 },
    image: imgPancreas,
    technique:
      "Along the inner arch, just below the stomach area, press gently and hold with the thumb.",
    pressure: "light",
    durationSec: 50,
    rationale:
      "The pancreas reflex sits in the arch — linked to blood-sugar balance and, symbolically, to the 'sweetness' of life and emotional steadiness.",
    associatedWith: ["pancreas", "balance", "digestion"],
    tags: ["digestive", "stomach", "fatigue", "tired", "sad", "worried"],
  },
  {
    id: "thyroid-foot",
    name: "Thyroid reflex (base of big toe)",
    zone: "foot",
    position: { x: 38, y: 22 },
    image: imgThyroid,
    technique:
      "At the base of the big toe, work the curved band with small circular thumb presses.",
    pressure: "medium",
    durationSec: 50,
    rationale:
      "The thyroid reflex sits at the base of the big toe — tied to metabolism and energy, and the theme of finding your voice and pace.",
    associatedWith: ["thyroid", "metabolism", "energy"],
    tags: ["fatigue", "tired", "neck", "overwhelmed", "frustrated", "worried", "stress"],
  },
  {
    id: "parathyroid-foot",
    name: "Parathyroid reflex (base of big toe)",
    zone: "foot",
    position: { x: 36, y: 20 },
    image: imgParathyroid,
    technique:
      "Just above the thyroid band at the base of the big toe, apply precise, firm pressure with the thumb tip.",
    pressure: "firm",
    durationSec: 40,
    rationale:
      "The parathyroid reflex governs calcium balance — associated with structural stability and a felt sense of inner steadiness and security.",
    associatedWith: ["parathyroid", "stability", "bones"],
    tags: ["stiffness", "tension", "neck", "insecure", "anxious"],
  },
  {
    id: "sciatic-foot",
    name: "Sciatic nerve (heel line)",
    zone: "foot",
    position: { x: 50, y: 80 },
    image: imgSciatic,
    technique:
      "Across the upper edge of the heel, press and glide horizontally with firm thumb pressure.",
    pressure: "firm",
    durationSec: 60,
    rationale:
      "The sciatic reflex runs across the heel — eases lower-back, hip and leg discomfort that radiates down the body.",
    associatedWith: ["sciatic", "lower back", "legs"],
    tags: ["lowerBack", "hips", "legs", "pain", "stiffness", "insecure", "fear"],
  },
  {
    id: "atm-foot",
    name: "Jaw / TMJ reflex (base of toes)",
    zone: "foot",
    position: { x: 62, y: 14 },
    image: imgAtm,
    technique:
      "Where the big toe meets the second toe, press and gently roll the thumb to release the joint.",
    pressure: "medium",
    durationSec: 45,
    rationale:
      "The jaw (TMJ) reflex sits between the first toes — helpful for clenching, jaw tension and the frustration we tend to grip there.",
    associatedWith: ["jaw", "tmj", "tension"],
    tags: ["head", "headache", "tension", "neck", "frustrated", "irritated", "anger", "stress", "impatient"],
  },
  {
    id: "trigeminal-foot",
    name: "Trigeminal nerve (side of big toe)",
    zone: "foot",
    position: { x: 40, y: 16 },
    image: imgTrigeminal,
    technique:
      "Along the outer side of the big toe, walk the thumb in small steps from base toward the tip.",
    pressure: "light",
    durationSec: 45,
    rationale:
      "The trigeminal reflex follows the big toe — traditionally used for facial tension, headaches and jaw-related head pain.",
    associatedWith: ["trigeminal", "face", "head"],
    tags: ["headache", "head", "tension", "neck", "confused", "stress"],
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
