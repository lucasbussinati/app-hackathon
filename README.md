# Sole — Reflexology Wellness App (hackathon MVP)

A small, calm web app that maps your physical discomfort and emotional state to
relevant reflexology points, with visual diagrams and step-by-step guidance.

Built as a learn-by-doing hackathon prototype.

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (typically http://localhost:5173). To test on
your phone on the same Wi-Fi, run `npm run dev -- --host` and open the
network URL it prints.

## Tech stack

- **Vite + React + TypeScript** — fast dev loop, modern, deployable anywhere.
- **Tailwind CSS** — design system with utility classes.
- **React Router** — multi-screen flow.
- **localStorage** — session history (no backend needed for MVP).

## What's in here

```
src/
  data/
    types.ts          - shared TypeScript types
    bodyRegions.ts    - body parts + discomfort types
    emotions.ts       - wheel-of-emotions data (joy, fear, anger, etc.)
    reflexPoints.ts   - the curated reflexology point catalogue
    recommender.ts    - tag-based scoring engine (swap for an LLM later)
    storage.ts        - localStorage session persistence
  store/
    assessment.tsx    - React context holding the in-progress flow
  components/
    AppShell.tsx      - top bar + bottom nav + step progress
    BodyMap.tsx       - interactive body silhouette (SVG)
    EmotionWheel.tsx  - radial multi-select emotion wheel (SVG)
    ReflexDiagram.tsx - foot / hand / ear diagram with highlighted point
    SafetyNote.tsx    - reusable disclaimer block
  screens/
    Welcome.tsx
    BodyAssessment.tsx
    EmotionAssessment.tsx
    Results.tsx
    History.tsx
    About.tsx
  App.tsx             - routes
  main.tsx            - entry point
```

## Information architecture & user flow

```
Welcome  ─▶  Body assessment  ─▶  Emotion wheel  ─▶  Results
                                                       │
                                                       └─▶ auto-saved to History
```

## Data model

```
PhysicalAssessment { regions[], discomfortTypes[], intensity, duration }
Emotion             { id, label, family }
ReflexPoint         { id, name, zone (foot|hand|ear), position{x,y},
                      technique, pressure, durationSec, rationale, tags[] }

Recommender:
  signals = regions ∪ discomfortTypes ∪ emotions
  score(point) = |point.tags ∩ signals| × intensityBoost × durationBoost
```

The recommender is intentionally transparent for a hackathon — you can see
exactly *why* each point was picked. Phase 2 can swap it for an LLM call
returning the same shape.

## MVP roadmap

**Phase 1 — Right now (what this code does)**
- Welcome + disclaimer
- Interactive body map (tap regions)
- Discomfort type, intensity, duration
- Wheel of emotions (multi-select)
- Personalized point recommendations with diagrams
- Session history (localStorage)

**Phase 2 — Polish & smarts**
- Replace recommender with an LLM call (`fetch` to OpenAI/Anthropic) that
  returns the same `ScoredPoint[]` shape so the UI is unchanged.
- Richer illustrations (replace generated SVG with annotated assets).
- Add favorites + timed practice sessions ("press for 60s" timers).
- PWA install banner (add manifest + service worker).

**Phase 3 — Mobile-native**
- Wrap with Capacitor for iOS/Android shells.
- Optional: push reminders, daily check-ins.

## A note on safety

Reflexology is presented here as a complementary practice, not a medical
treatment. The app includes a disclaimer on the home, results and about
screens.
