import type { JourneyStepId } from "../i18n/strings";

/** Icon per session step. The wording lives in the translations (`t.journey`). */
export const JOURNEY_ICONS: Record<JourneyStepId, string> = {
  body: "🫶",
  emotions: "💭",
  meaning: "🔮",
  points: "🦶",
};
