import type { BodyRegion, DiscomfortType } from "./types";

export const BODY_REGIONS: Array<{
  id: BodyRegion;
  label: string;
  /** Center of the region on the SVG body silhouette (viewBox 0 0 200 480) */
  cx: number;
  cy: number;
  r: number;
}> = [
  { id: "head", label: "Head", cx: 100, cy: 38, r: 26 },
  { id: "neck", label: "Neck", cx: 100, cy: 78, r: 14 },
  { id: "shoulders", label: "Shoulders", cx: 100, cy: 102, r: 36 },
  { id: "chest", label: "Chest", cx: 100, cy: 142, r: 28 },
  { id: "upperBack", label: "Upper back", cx: 100, cy: 175, r: 24 },
  { id: "stomach", label: "Stomach", cx: 100, cy: 200, r: 24 },
  { id: "lowerBack", label: "Lower back", cx: 100, cy: 235, r: 22 },
  { id: "hips", label: "Hips", cx: 100, cy: 270, r: 26 },
  { id: "legs", label: "Legs", cx: 100, cy: 350, r: 30 },
  { id: "feet", label: "Feet", cx: 100, cy: 445, r: 22 },
];

export const DISCOMFORT_TYPES: Array<{ id: DiscomfortType; label: string; emoji: string }> = [
  { id: "headache", label: "Headache", emoji: "🤕" },
  { id: "tension", label: "Tension", emoji: "🧱" },
  { id: "pain", label: "Pain", emoji: "⚡" },
  { id: "stiffness", label: "Stiffness", emoji: "🪨" },
  { id: "fatigue", label: "Fatigue", emoji: "🥱" },
  { id: "digestive", label: "Digestive", emoji: "🌀" },
  { id: "stress", label: "Stress", emoji: "🌪️" },
];
