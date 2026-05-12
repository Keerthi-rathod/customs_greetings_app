# WishCraft

A personalized greeting-card web app. Pick a template, drop in your name and photo, and get a shareable image card — Shayari, birthdays, anniversaries, festivals, and jokes. Built with React + Vite.

## Demo

Watch a short walkthrough of the app: **[Demo video](https://drive.google.com/file/d/1klKjNMa-KtpTCADCKFGnYsAxoZaN2R9P/view?usp=sharing)**

## Features

- Mock social login (Google / Facebook / Guest) with profile setup (name + photo)
- Eight curated templates across five categories with a "Premium" tier
- Premium upsell popup with monthly / yearly plans
- Live canvas-rendered card with the user's avatar, name, and quote composited onto a gradient background
- One-click PNG download
- Share sheet with WhatsApp, Twitter/X, Email, Instagram (manual), Copy Text, and Open Image actions

## Prerequisites

- **Node.js** 18 or newer (tested on Node 24)
- **npm** 9 or newer (tested on npm 11)

Check with:

```bash
node --version
npm --version
```

## Setup

1. Clone or copy the project, then `cd` into the project directory:

   ```bash
   cd greeting_app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   If install fails with a network error (`ECONNRESET`), retry with extra fetch retries:

   ```bash
   npm install --fetch-retries=5 --fetch-retry-mintimeout=10000
   ```

## Running locally

Start the Vite dev server (with hot module reload):

```bash
npm run dev
```

The app opens automatically at **http://localhost:5173/**.

## Production build

```bash
npm run build      # outputs static assets to dist/
npm run preview    # serves the built bundle locally for a final check
```

## Project structure

```
greeting_app/
├── index.html              # entry HTML, mounts #root
├── vite.config.js          # Vite + React plugin config (port 5173, auto-open)
├── package.json
├── README.md
├── generate-docs.cjs       # build-time script that produces the PDF doc
├── WishCraft-Documentation.pdf
└── src/
    ├── main.jsx            # React entry point, renders <App />
    ├── App.jsx             # top-level component, picks Login vs Home
    ├── components/
    │   ├── LoginScreen.jsx
    │   ├── HomeScreen.jsx
    │   ├── PremiumPopup.jsx
    │   ├── ShareSheet.jsx
    │   └── CardPreview.jsx
    ├── data/
    │   └── templates.js    # CATEGORIES + TEMPLATES catalog
    └── styles/
        └── styles.js       # shared inline-style object
```

## Tech stack

- **React 18** — UI with hooks (`useState`, `useRef`, `useEffect`)
- **Vite 5** — dev server, bundler, HMR
- **@vitejs/plugin-react** — JSX transform + Fast Refresh
- **HTML5 Canvas API** — composes the final shareable PNG
- **Web APIs** — `FileReader` (photo upload), `Clipboard`, `URL.createObjectURL`
- **CSS-in-JS** — inline `style` objects, no external CSS framework

## Scripts

| Command           | Purpose                              |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start Vite dev server on port 5173   |
| `npm run build`   | Produce a production bundle in `dist/` |
| `npm run preview` | Serve the production bundle locally  |

## Troubleshooting

- **Port 5173 in use** — edit `server.port` in `vite.config.js`, or run `npm run dev -- --port 5174`.
- **Photo upload not working** — Chrome/Edge/Firefox latest; Safari requires HTTPS for some features. Try a different browser if `FileReader` fails.
- **Clipboard copy fails** — the share sheet has a `document.execCommand("copy")` fallback; if both fail, you are likely in an insecure (`http://` on a non-localhost host) context.
