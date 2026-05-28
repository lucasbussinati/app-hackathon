import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type {
  BodyRegion,
  DiscomfortType,
  Duration,
  EmotionalPresence,
  Intensity,
  PhysicalAssessment,
} from "../data/types";

interface AssessmentState {
  regions: BodyRegion[];
  discomfortTypes: DiscomfortType[];
  intensity: Intensity;
  duration: Duration;
  emotions: string[];
  emotionalPresence: EmotionalPresence;
  emotionalNote: string;
}

interface AssessmentContextValue extends AssessmentState {
  toggleRegion: (r: BodyRegion) => void;
  toggleDiscomfort: (d: DiscomfortType) => void;
  setIntensity: (i: Intensity) => void;
  setDuration: (d: Duration) => void;
  toggleEmotion: (id: string) => void;
  setEmotionalPresence: (p: EmotionalPresence) => void;
  setEmotionalNote: (note: string) => void;
  reset: () => void;
  physical: PhysicalAssessment;
}

const defaultState: AssessmentState = {
  regions: [],
  discomfortTypes: [],
  intensity: "moderate",
  duration: "acute",
  emotions: [],
  emotionalPresence: "present",
  emotionalNote: "",
};

const AssessmentContext = createContext<AssessmentContextValue | null>(null);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AssessmentState>(defaultState);

  const value = useMemo<AssessmentContextValue>(
    () => ({
      ...state,
      toggleRegion: (r) =>
        setState((s) => ({
          ...s,
          regions: s.regions.includes(r)
            ? s.regions.filter((x) => x !== r)
            : [...s.regions, r],
        })),
      toggleDiscomfort: (d) =>
        setState((s) => ({
          ...s,
          discomfortTypes: s.discomfortTypes.includes(d)
            ? s.discomfortTypes.filter((x) => x !== d)
            : [...s.discomfortTypes, d],
        })),
      setIntensity: (i) => setState((s) => ({ ...s, intensity: i })),
      setDuration: (d) => setState((s) => ({ ...s, duration: d })),
      toggleEmotion: (id) =>
        setState((s) => ({
          ...s,
          emotions: s.emotions.includes(id)
            ? s.emotions.filter((x) => x !== id)
            : [...s.emotions, id],
        })),
      setEmotionalPresence: (p) => setState((s) => ({ ...s, emotionalPresence: p })),
      setEmotionalNote: (note) => setState((s) => ({ ...s, emotionalNote: note })),
      reset: () => setState(defaultState),
      physical: {
        regions: state.regions,
        discomfortTypes: state.discomfortTypes,
        intensity: state.intensity,
        duration: state.duration,
      },
    }),
    [state],
  );

  return <AssessmentContext.Provider value={value}>{children}</AssessmentContext.Provider>;
}

export function useAssessment() {
  const ctx = useContext(AssessmentContext);
  if (!ctx) throw new Error("useAssessment must be used inside AssessmentProvider");
  return ctx;
}
