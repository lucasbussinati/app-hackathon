export type BodyRegion =
  | "head"
  | "neck"
  | "shoulders"
  | "upperBack"
  | "chest"
  | "stomach"
  | "lowerBack"
  | "hips"
  | "legs"
  | "feet";

export type DiscomfortType =
  | "tension"
  | "pain"
  | "stiffness"
  | "fatigue"
  | "digestive"
  | "headache"
  | "stress";

export type Intensity = "mild" | "moderate" | "intense";
export type Duration = "acute" | "recurring" | "chronic";

export interface PhysicalAssessment {
  regions: BodyRegion[];
  discomfortTypes: DiscomfortType[];
  intensity: Intensity;
  duration: Duration;
}

export type EmotionFamily =
  | "joy"
  | "sadness"
  | "anger"
  | "fear"
  | "surprise"
  | "disgust";

export type EmotionLevel = 1 | 2 | 3;

export interface Emotion {
  id: string;
  label: string;
  family: EmotionFamily;
  /** 1 = primary family, 2 = secondary cluster, 3 = specific feeling */
  level: EmotionLevel;
  /** parent id at the level above (undefined for level 1) */
  parentId?: string;
}

export type EmotionalPresence = "subtle" | "present" | "intense";

export type ReflexZone = "foot" | "hand" | "ear";

export interface ReflexPoint {
  id: string;
  name: string;
  zone: ReflexZone;
  /** Position on the diagram as percentages (0-100) */
  position: { x: number; y: number };
  /** Brief instruction on technique */
  technique: string;
  /** Pressure: light / medium / firm */
  pressure: "light" | "medium" | "firm";
  /** Duration in seconds */
  durationSec: number;
  /** Why this point helps */
  rationale: string;
  /** What it traditionally maps to */
  associatedWith: string[];
  /** Tags that the recommender uses to match symptoms/emotions */
  tags: string[];
}

export interface Session {
  id: string;
  createdAt: number;
  physical: PhysicalAssessment;
  emotions: string[];
  emotionalPresence: EmotionalPresence;
  emotionalNote?: string;
  recommendedPointIds: string[];
}
