// Build-time language selection.
//
// `__APP_LANG__` is injected by Vite (see vite.config.ts `define`). The English
// build leaves it as "en"; the Portuguese build sets it to "pt" via the
// APP_LANG env var. Because it's a compile-time constant, the unused language's
// strings are tree-shaken out of each bundle.
export const LANG: "en" | "pt" =
  typeof __APP_LANG__ !== "undefined" && __APP_LANG__ === "pt" ? "pt" : "en";

// GitHub Pages paths for each version. The two builds live in the same
// gh-pages site: English at the root base, Portuguese under /pt/.
export const EN_BASE = "/app-hackathon/";
export const PT_BASE = "/app-hackathon/pt/";

// The "other" language, used by the header switcher to jump between versions.
export const OTHER =
  LANG === "pt"
    ? { code: "EN", label: "English", href: EN_BASE }
    : { code: "PT", label: "Português", href: PT_BASE };
