import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { t } from "../i18n";
import { AUTHOR_STORY, STORY_MINUTES, type StoryBlock } from "../i18n/authorStory";
import photoFriderike from "../assets/team/friderike.jpeg";

const story = AUTHOR_STORY;
const readingMinutes = STORY_MINUTES;

export default function AuthorStory() {
  return (
    <article className="flex flex-col gap-4">
      <ReadingProgress />

      <Link
        to="/about"
        className="self-start inline-flex items-center gap-1 text-sm font-medium text-sage-600 hover:text-sage-800"
      >
        <span aria-hidden>‹</span> {story.back}
      </Link>

      <header className="card p-5 flex flex-col items-center text-center">
        <img
          src={photoFriderike}
          alt=""
          className="w-24 h-24 rounded-full object-cover shadow-soft ring-4 ring-white"
          style={{ objectPosition: "50% 18%" }}
        />
        <p className="mt-4 text-[11px] uppercase tracking-widest font-semibold text-sage-500">
          {story.eyebrow}
        </p>
        <h1 className="mt-1 text-3xl leading-tight">{story.title}</h1>
        <p className="mt-1 text-sm text-sage-600">
          {t.about.role} · {story.readingTime(readingMinutes)}
        </p>

        <dl className="mt-5 grid w-full grid-cols-3 gap-2">
          {story.facts.map((fact) => (
            <div key={fact.label} className="rounded-2xl bg-sand-100/70 px-2 py-3">
              <dt className="sr-only">{fact.label}</dt>
              <dd className="font-display text-xl text-sage-800 leading-none">{fact.value}</dd>
              <dd className="mt-1.5 text-[11px] leading-tight text-sage-600">{fact.label}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="card px-5 py-6 flex flex-col gap-4">
        {story.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}

        <footer className="mt-2 pt-4 border-t border-sage-100 text-right">
          <p className="font-display text-3xl italic text-sage-800">{story.signature}</p>
          <p className="text-xs text-sage-500 mt-0.5">{t.about.role}</p>
        </footer>
      </div>

      <Link to="/about" className="btn-ghost self-center">
        {story.back}
      </Link>
    </article>
  );
}

function Block({ block }: { block: StoryBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="mt-4 first:mt-0 flex items-center gap-3 font-sans text-[11px] uppercase tracking-widest font-semibold text-sage-500">
          <span className="h-px w-6 bg-sand-300" aria-hidden />
          {block.text}
        </h2>
      );
    case "lead":
      return (
        <p className="text-[17px] leading-[1.7] text-sage-900 first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:font-display first-letter:text-[3.4rem] first-letter:leading-[0.8] first-letter:text-sage-600">
          {block.text}
        </p>
      );
    case "p":
      return <p className="text-[15px] leading-[1.75] text-sage-800">{block.text}</p>;
    case "pull":
      return (
        <blockquote className="my-2 px-2 text-center">
          <span className="block text-sand-400 text-lg leading-none" aria-hidden>
            ✦
          </span>
          <p className="mt-2 font-display text-2xl italic leading-snug text-sage-800">
            {block.text}
          </p>
        </blockquote>
      );
    case "note":
      return (
        <aside className="rounded-2xl border border-sand-200 bg-sand-50 p-4 text-sm leading-relaxed text-sage-700">
          {block.text.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </aside>
      );
    case "questions":
      return (
        <ul className="flex flex-col gap-2 border-l-2 border-sage-200 pl-4">
          {block.items.map((q) => (
            <li key={q} className="font-display text-lg italic leading-snug text-sage-800">
              {q}
            </li>
          ))}
        </ul>
      );
  }
}

/** Thin bar under the header that fills as the reader scrolls through the story. */
function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Portaled: <main>'s entry animation uses a transform, which would pin a
  // fixed element to the scrolling content instead of the viewport.
  return createPortal(
    <div className="fixed inset-x-0 top-[57px] z-30 h-0.5" aria-hidden>
      <div
        className="h-full bg-sage-500 origin-left transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>,
    document.body,
  );
}
