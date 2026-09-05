import type { BodyRegion, BodyView, DiscomfortType } from "./types";
import { LANG } from "../i18n/config";
import { PT_DISCOMFORT_LABELS, PT_REGION_LABELS } from "../i18n/content";

export type { BodyView };

export interface BodyRegionDef {
  id: BodyRegion;
  label: string;
  views: BodyView[];
}

const RAW_BODY_REGIONS: BodyRegionDef[] = [
  { id: "head", label: "Head", views: ["front", "back"] },
  { id: "face", label: "Face & jaw", views: ["front"] },
  { id: "ears", label: "Ears", views: ["front", "back"] },
  { id: "neck", label: "Neck", views: ["front", "back"] },
  { id: "shoulders", label: "Shoulders", views: ["front", "back"] },
  { id: "arms", label: "Arms", views: ["front", "back"] },
  { id: "elbows", label: "Elbows", views: ["front", "back"] },
  { id: "hands", label: "Hands", views: ["front", "back"] },
  { id: "chest", label: "Chest", views: ["front"] },
  { id: "upperBack", label: "Upper back", views: ["back"] },
  { id: "stomach", label: "Stomach", views: ["front"] },
  { id: "intestine", label: "Intestine", views: ["front"] },
  { id: "trunk", label: "Trunk", views: ["front"] },
  { id: "lowerBack", label: "Lower back", views: ["back"] },
  { id: "hips", label: "Hips", views: ["front", "back"] },
  { id: "pelvis", label: "Pelvis", views: ["front"] },
  { id: "knees", label: "Knees", views: ["front", "back"] },
  { id: "legs", label: "Legs", views: ["front", "back"] },
  { id: "feet", label: "Feet", views: ["front", "back"] },
];

export const BODY_REGIONS: BodyRegionDef[] =
  LANG === "pt"
    ? RAW_BODY_REGIONS.map((r) => ({ ...r, label: PT_REGION_LABELS[r.id] ?? r.label }))
    : RAW_BODY_REGIONS;

const RAW_DISCOMFORT_TYPES: Array<{ id: DiscomfortType; label: string; emoji: string }> = [
  { id: "headache", label: "Headache", emoji: "🤕" },
  { id: "tension", label: "Tension", emoji: "🧱" },
  { id: "pain", label: "Pain", emoji: "⚡" },
  { id: "stiffness", label: "Stiffness", emoji: "🪨" },
  { id: "fatigue", label: "Fatigue", emoji: "🥱" },
  { id: "digestive", label: "Digestive", emoji: "🌀" },
  { id: "stress", label: "Stress", emoji: "🌪️" },
  { id: "spinePain", label: "Spine pain", emoji: "🦴" },
  { id: "napePain", label: "Nape pain", emoji: "📎" },
  { id: "sciatica", label: "Sciatica", emoji: "📉" },
  { id: "anxietyDiscomfort", label: "Anxiety", emoji: "💭" },
  { id: "exhaustion", label: "Exhaustion", emoji: "🔋" },
  { id: "insomnia", label: "Insomnia", emoji: "🌙" },
  { id: "sinusitis", label: "Sinusitis", emoji: "👃" },
  { id: "soreThroat", label: "Sore throat", emoji: "🗣️" },
  { id: "shoulderPain", label: "Shoulder pain", emoji: "🏋️" },
  { id: "legPain", label: "Leg pain", emoji: "🦵" },
  { id: "menstrualCramp", label: "Menstrual cramp", emoji: "🩸" },
  { id: "intestinalCramp", label: "Intestinal cramp", emoji: "💧" },
  { id: "tinnitus", label: "Tinnitus", emoji: "🔔" },
  { id: "depression", label: "Depression", emoji: "🌧️" },
  { id: "fibromyalgia", label: "Fibromyalgia", emoji: "🧬" },
];

export const DISCOMFORT_TYPES =
  LANG === "pt"
    ? RAW_DISCOMFORT_TYPES.map((d) => ({ ...d, label: PT_DISCOMFORT_LABELS[d.id] ?? d.label }))
    : RAW_DISCOMFORT_TYPES;

export function discomfortLabel(id: string): string {
  return DISCOMFORT_TYPES.find((d) => d.id === id)?.label ?? id;
}
