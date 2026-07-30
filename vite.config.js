import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages project sites are served from https://<username>.github.io/<repo>/,
// so every asset URL needs that repo name as a base path - otherwise the built
// site will 404 on its own JS/CSS once deployed (this only matters in
// production; `npm run dev` ignores base and serves from /).
export default defineConfig({
  plugins: [react()],
  base: "/WHW-Ptracker/",
});
