# QSkill Slab 1 — Front-End Development

A responsive React + Tailwind CSS application containing the three specified beginner tasks:
1. English text translator (RapidAPI integration)
2. Random string generator (`useState`, `useCallback`, `useEffect`)
3. Client-side routing (`react-router-dom`)

## Requirements
- Node.js 18+ and npm
- VS Code
- A RapidAPI account and a translation API subscription/key

## Run in VS Code
1. Extract the ZIP and open the `qskill-slab1-react` folder in VS Code.
2. Open Terminal → New Terminal.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Copy `.env.example` to `.env.local`.
5. In `.env.local`, set the endpoint, key, and host for the translation API you subscribe to on RapidAPI. The endpoint and request body vary by provider; see **Configure RapidAPI** below.
6. Start the app:
   ```bash
   npm run dev
   ```
7. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Configure RapidAPI
RapidAPI hosts many translation providers and their endpoint/body formats are not universal. In `src/pages/Translator.jsx`, update `translateText()` to match the provider's documented request:
- URL: `VITE_TRANSLATE_API_URL`
- Headers: `X-RapidAPI-Key` and `X-RapidAPI-Host`
- Current sample request body: `{ from: "en", to: targetLanguage, text }`
- Current sample response parsing accepts common fields: `translatedText`, `translation`, `translated_text`, or `data.translatedText`.

Use the exact URL, headers, request fields, and response field shown on the RapidAPI provider's **Endpoints** page. Keep the key in `.env.local`, never publish it in GitHub. Note: Vite environment variables are bundled into browser code, so a `VITE_` key is visible to users in production. For a public deployment, move the API call into a server-side proxy (or serverless function) and store the key as a server secret.

## Included routes
- `/` — Dashboard
- `/translator` — Translator
- `/generator` — Random String Generator
- `/about` — Task overview

## Build and test
```bash
npm run build
npm run preview
```
A successful build creates the production bundle in `dist/`.

## GitHub
```bash
git init
git add .
git commit -m "Complete QSkill Slab 1 React tasks"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```
For GitHub Pages, configure the Vite `base` option to `"/YOUR-REPOSITORY/"`, install and configure `gh-pages` or use GitHub Actions, and ensure SPA route fallback is handled. A static host such as Netlify or Vercel generally handles React Router fallback more easily.

## Notes
- The translator requires valid RapidAPI credentials and provider-specific configuration; without them, the app displays a helpful setup error.
- The random string generator supports configurable length and character sets, copies results, and keeps a short history.
- Navigation uses React Router and does not reload the page.
