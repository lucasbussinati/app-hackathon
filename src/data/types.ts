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

// ---------------------------------------------------------------------------
// Body–Mind Map ("the brain")
//
// A curated knowledge base authored by the reflexology specialist. Each entry
// connects a body structure (organ, gland, spine segment, joint) to its
// physical role and the psychosomatic / symbolic theme traditionally
// associated with it. The app uses this to explain to the user what a given
// discomfort *may* be communicating — a reflective, complementary lens, never
// a diagnosis.
//
// The schema is intentionally explicit and self-describing so it can also be
// consumed by an LLM in future AI-driven features (see bodyMindMap.ts).
// ---------------------------------------------------------------------------

export type BodyMindCategory = "organ" | "gland" | "respiratory" | "spine" | "joint";

/** A named symbolic sub-pattern, e.g. hypo- vs hyperthyroidism. */
export interface BodyMindPattern {
  label: string;
  description: string;
}

/** All language-dependent text for one body–mind entry. */
export interface BodyMindContent {
  /** Display name of the organ / structure. */
  name: string;
  /** One-line core psychosomatic theme, e.g. "Self-criticism". */
  theme: string;
  /** Physical role of the structure, as short bullets. */
  physicalFunction: string[];
  /** Narrative: what discomfort here may be communicating. */
  meaning: string;
  /** Reflection / meditation phrases (the specialist's "medite em…"). */
  reflections: string[];
  /** Symbolic questions to sit with. */
  questions: string[];
  /** Optional sub-patterns (e.g. hypo/hyper, sleep/mood). */
  patterns?: BodyMindPattern[];
  /** Optional reminder that physical causes also matter. */
  note?: string;
}

/** One body–mind entry: stable matching metadata + localized content. */
export interface BodyMindEntry {
  id: string;
  category: BodyMindCategory;
  /** Body silhouette regions this maps to (links to the Body step). */
  relatedRegions: BodyRegion[];
  /** Discomfort types this commonly shows up as. */
  relatedDiscomfort?: DiscomfortType[];
  /** Emotion ids / families / tags that resonate with this entry. */
  emotionTags: string[];
  /** Optional reflex points (ids from reflexPoints) that pair well. */
  relatedPointIds?: string[];
  /** English content. */
  en: BodyMindContent;
  /** Portuguese content (authored by the specialist). */
  pt: BodyMindContent;
}

/** Localized, flattened entry used by the UI for the active language. */
export interface LocalizedBodyMindEntry extends BodyMindContent {
  id: string;
  category: BodyMindCategory;
  relatedRegions: BodyRegion[];
  relatedDiscomfort: DiscomfortType[];
  emotionTags: string[];
  relatedPointIds: string[];
}
