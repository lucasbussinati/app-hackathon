import { Link, Navigate, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useAssessment } from "../store/assessment";
import { recommend } from "../data/recommender";
import { signalLabel } from "../data/bodyRegions";
import { readingFor, type RichBlock, type SpecialistReading } from "../data/specialist";
import { PointLightbox, PointThumbnail } from "../components/PointZoom";
import type { ReflexPoint } from "../data/types";
import { t } from "../i18n";

/**
 * Step 3 — the specialist's reading of every point in the reflexology plan.
 * It lists exactly the points step 4 recommends, in the same order, so the
 * reflection and the plan always tell the same story.
 */
export default function Insights() {
  const navigate = useNavigate();
  const { physical, emotions, emotionalPresence } = useAssessment();

  const plan = useMemo(
    () => recommend(physical, emotions, emotionalPresence),
    [physical, emotions, emotionalPresence],
  );

  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set(plan.length > 0 ? [plan[0].point.id] : []),
  );
  const [zoomed, setZoomed] = useState<ReflexPoint | null>(null);

  const hasAnyInput =
    physical.regions.length > 0 ||
    physical.discomfortTypes.length > 0 ||
    emotions.length > 0;

  if (!hasAnyInput) return <Navigate to="/body" replace />;

  const allOpen = plan.every(({ point }) => openIds.has(point.id));

  const toggle = (id: string) =>
    setOpenIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleAll = () =>
    setOpenIds(allOpen ? new Set() : new Set(plan.map(({ point }) => point.id)));

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-xs uppercase tracking-widest text-sage-500 font-semibold">
          {t.insights.step}
        </p>
        <h1 className="text-2xl mt-1">{t.insights.title}</h1>
        <p className="text-sm text-sage-700 mt-1">{t.insights.subtitle}</p>
      </header>

      <section className="card p-4 bg-sage-50/60 border-sage-200">
        <p className="text-sm text-sage-700 leading-relaxed">{t.insights.intro}</p>
      </section>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-medium text-sage-600">{t.insights.count(plan.length)}</p>
          {plan.length > 1 && (
            <button
              type="button"
              onClick={toggleAll}
              className="text-xs font-semibold text-sage-700 underline-offset-2 hover:underline"
            >
              {allOpen ? t.insights.collapseAll : t.insights.expandAll}
            </button>
          )}
        </div>

        <ol className="flex flex-col gap-3">
          {plan.map(({ point, matches }, idx) => (
            <ReadingCard
              key={point.id}
              point={point}
              matches={matches}
              index={idx}
              open={openIds.has(point.id)}
              onToggle={() => toggle(point.id)}
              onZoom={setZoomed}
            />
          ))}
        </ol>
      </div>

      <section className="card p-3 border-l-4 border-sand-300 bg-sand-50/70">
        <p className="text-[11px] text-sage-600 leading-relaxed">
          <span aria-hidden>⚠️ </span>
          {t.insights.disclaimer}
        </p>
      </section>

      <div className="flex items-center justify-between gap-3">
        <Link to="/emotions" className="btn-ghost">
          {t.insights.back}
        </Link>
        <button className="btn-primary flex-1" onClick={() => navigate("/results")}>
          {t.insights.next}
        </button>
      </div>

      {zoomed && <PointLightbox point={zoomed} onClose={() => setZoomed(null)} />}
    </div>
  );
}

function ReadingCard({
  point,
  matches,
  index,
  open,
  onToggle,
  onZoom,
}: {
  point: ReflexPoint;
  matches: string[];
  index: number;
  open: boolean;
  onToggle: () => void;
  onZoom: (point: ReflexPoint) => void;
}) {
  const reading = readingFor(point.id);
  const panelId = `reading-${point.id}`;
  const matchedLabels = Array.from(
    new Set(matches.filter((m) => m !== "grounding").map(signalLabel)),
  );

  return (
    <li
      className="card overflow-hidden animate-fade-in"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-center gap-3 p-3">
        <PointThumbnail point={point} size={64} onZoom={onZoom} />
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex min-w-0 flex-1 items-center gap-2 self-stretch rounded-xl text-left outline-none focus-visible:ring-2 focus-visible:ring-sage-400"
        >
          <span className="min-w-0 flex-1">
            <span className="block text-[10px] font-semibold uppercase tracking-widest text-sage-500">
              {index + 1}
            </span>
            <span className="block font-display text-lg leading-tight text-sage-900">
              {point.name}
            </span>
            <span className="mt-0.5 block text-sm leading-snug text-sage-700">
              {reading ? reading.theme : t.insights.fallbackTitle}
            </span>
          </span>
          <Chevron open={open} />
        </button>
      </div>

      {open && (
        <div
          id={panelId}
          className="space-y-4 border-t border-sage-100 px-4 pb-4 pt-3 animate-fade-in"
        >
          {matchedLabels.length > 0 && (
            <p className="text-[11px] text-sage-600">
              {t.insights.matchedFor}{" "}
              <span className="font-medium">{matchedLabels.slice(0, 4).join(", ")}</span>
            </p>
          )}
          {reading ? <ReadingBody reading={reading} /> : <Fallback point={point} />}
        </div>
      )}
    </li>
  );
}

function ReadingBody({ reading }: { reading: SpecialistReading }) {
  const s = t.insights.sections;
  return (
    <>
      {reading.physical && (
        <Section title={s.physical}>
          <Rich blocks={reading.physical} />
        </Section>
      )}
      {reading.emotional && (
        <Section title={s.emotional}>
          <Rich blocks={reading.emotional} emphasis />
        </Section>
      )}
      {reading.symbolic && (
        <Section title={s.symbolic}>
          <Rich blocks={reading.symbolic} />
        </Section>
      )}
      {reading.expressions && reading.expressions.length > 0 && (
        <Section title={s.expressions}>
          <div className="flex flex-wrap gap-1.5">
            {reading.expressions.map((e, i) => (
              <span
                key={i}
                className="rounded-full border border-sand-200 bg-sand-50 px-2.5 py-1 text-xs italic text-sage-800"
              >
                “{e}”
              </span>
            ))}
          </div>
        </Section>
      )}
      {reading.reflections && reading.reflections.length > 0 && (
        <div className="rounded-2xl border border-sage-100 bg-sage-50 p-3">
          <SectionTitle>{s.reflections}</SectionTitle>
          <div className="space-y-2">
            {reading.reflections.map((r, i) => (
              <p key={i} className="text-sm italic leading-relaxed text-sage-800">
                “{r}”
              </p>
            ))}
          </div>
        </div>
      )}
      {reading.questions && reading.questions.length > 0 && (
        <Section title={s.questions}>
          <ul className="space-y-1.5 text-sm leading-relaxed text-sage-800">
            {reading.questions.map((q, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-sage-400" aria-hidden>
                  ›
                </span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}
      {reading.note && (
        <p className="border-t border-sage-100 pt-2 text-[11px] leading-relaxed text-sage-500">
          {reading.note}
        </p>
      )}
    </>
  );
}

function Fallback({ point }: { point: ReflexPoint }) {
  return (
    <>
      <Section title={t.insights.fallbackTitle}>
        <p className="text-sm leading-relaxed text-sage-800">{point.rationale}</p>
      </Section>
      <p className="text-[11px] italic leading-relaxed text-sage-500">{t.insights.fallbackNote}</p>
    </>
  );
}

function Rich({ blocks, emphasis = false }: { blocks: RichBlock[]; emphasis?: boolean }) {
  const text = emphasis ? "text-sage-900" : "text-sage-700";
  return (
    <div className="space-y-2">
      {blocks.map((block, i) => {
        if (typeof block === "string") {
          return (
            <p key={i} className={`text-sm leading-relaxed ${text}`}>
              {block}
            </p>
          );
        }
        if (Array.isArray(block)) {
          return (
            <ul key={i} className={`list-disc space-y-0.5 pl-4 text-sm leading-relaxed ${text}`}>
              {block.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="pt-1 text-sm font-semibold text-sage-800">
            {block.heading}
          </p>
        );
      })}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <SectionTitle>{title}</SectionTitle>
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-sage-500">
      {children}
    </p>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`shrink-0 text-sage-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
