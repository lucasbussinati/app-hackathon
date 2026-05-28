import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { qrcode } from "vite-plugin-qrcode";

// Two builds share one GitHub Pages site:
//   EN -> base "/app-hackathon/"     output dist/    (default mode)
//   PT -> base "/app-hackathon/pt/"  output dist/pt/  (vite build --mode pt)
// `__APP_LANG__` is injected so the app code can pick the right strings.
export default defineConfig(({ mode }) => {
  const isPt = mode === "pt";
  return {
    base: isPt ? "/app-hackathon/pt/" : "/app-hackathon/",
    define: {
      __APP_LANG__: JSON.stringify(isPt ? "pt" : "en"),
    },
    build: {
      outDir: isPt ? "dist/pt" : "dist",
      emptyOutDir: true,
    },
    plugins: [react(), qrcode()],
    server: {
      host: true,
    },
  };
});
