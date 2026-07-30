# West Highland Way Tracker

A progress tracker for walking the West Highland Way (Milngavie ↔ Fort
William), with a checklist, route map, custom waypoint badges, and a
shareable progress card.

## Deploying to GitHub Pages

This repo is already set up to deploy itself automatically via GitHub
Actions. Steps:

1. **Create the GitHub repo** named exactly `WHW-Ptracker` (the build config
   assumes this exact name/casing - see "If you rename the repo" below).

2. **Push this folder to it:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/WHW-Ptracker.git
   git push -u origin main
   ```

3. **Turn on GitHub Pages:** in the repo on GitHub, go to
   **Settings → Pages**, and under "Build and deployment → Source" choose
   **GitHub Actions** (not "Deploy from a branch").

4. **Push (or re-run the workflow):** the first push to `main` triggers
   `.github/workflows/deploy.yml`, which installs dependencies, runs
   `npm run build`, and publishes the result. Check the **Actions** tab to
   watch it run - it usually takes 1-2 minutes.

5. Once it succeeds, the site is live at:
   ```
   https://<your-username>.github.io/WHW-Ptracker/
   ```

### If you rename the repo

The build needs to know its own URL subpath. If you use a different repo
name than `WHW-Ptracker`, update the `base` value in `vite.config.js` to
match (`base: "/your-repo-name/"`) before pushing, or the deployed site's
JS/CSS will 404.

## Local development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`. Note `npm run dev` ignores the GitHub
Pages `base` path, so this always serves from `/` locally regardless of the
`vite.config.js` setting.

To check a production build locally before pushing:
```bash
npm run build
npm run preview
```

## About the storage

`src/WHWTracker.jsx` is the component as built in Claude, unchanged, which
expects a `window.storage.get/set` API. Claude's own chat preview provides
that API automatically; a plain deployed website doesn't have it, so
`src/storageShim.js` provides a drop-in replacement backed by the browser's
`localStorage`, loaded once in `src/main.jsx` before the app renders.

This means: progress saved while using this deployed to GitHub Pages is
**separate** from progress saved in a Claude chat preview of the same
component - they're different browsers/storage entirely, so nothing carries
over automatically between the two. Progress on the deployed site is
per-browser, per-device (the same as any typical local-storage web app);
there's no account system or cross-device sync built in.

## Project structure

```
├── index.html              entry HTML
├── vite.config.js          build config (sets the GitHub Pages base path)
├── src/
│   ├── main.jsx             mounts the app, loads the storage shim
│   ├── storageShim.js       localStorage-backed replacement for window.storage
│   └── WHWTracker.jsx       the tracker component itself
└── .github/workflows/
    └── deploy.yml           builds + deploys to GitHub Pages on push to main
```
