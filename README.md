# Lito Movies Landing Page

**Live site:** [https://software-me.github.io/lito-movies-landing-page/](https://software-me.github.io/lito-movies-landing-page/)

If the live page on your phone still looks old after a deploy, Safari often keeps a cached HTML copy. Try **Settings → Safari → Clear History and Website Data**, or open the site in a **Private** tab. You can also append a dummy query once to bypass cache, e.g. `...github.io/lito-movies-landing-page/?v=2`.

## About this project

This is a **static, responsive “streaming-style” landing page** for **LitoStreaming**. It presents featured titles with title art, metadata, short descriptions, and actions (Watch, My List, Watch Trailer). A **Materialize carousel** shows poster thumbnails; choosing a poster updates the **hero background** and **detail panel** for that title. **Per-title dimming** keeps backgrounds readable. The graduation slide keeps a **personal message**; other titles use the placeholder line **“LitoStreaming coming soon!”** until real copy is added.

There is **no backend**—everything runs in the browser (HTML, CSS, client-side JavaScript).

## Quick start (local)

1. Install dependencies: `npm install`
2. Start a local server: `npm start`
3. Open the URL shown in the terminal (usually `http://localhost:3000`).

## npm scripts

- **`npm start`** — Serves the project locally with `serve`.
- **`npm run lint`** — ESLint on `js/**/*.js`.
- **`npm run lint:fix`** — ESLint with auto-fix where possible.
- **`npm run format`** — Prettier check for HTML, CSS, JS, JSON, Markdown.
- **`npm run format:write`** — Apply Prettier formatting.

## Project files and what they do

| Path                                           | Role                                                                                                                                                                                                                                                                         |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`index.html`**                               | Page structure: header/nav, hero banner, one **content block per title** (classes like `the-ritual`, `graduation`), carousel markup with `data-bg` / `data-title` / `data-dim`, trailer overlay with `<video>`, and script tags for jQuery, Materialize, and `js/script.js`. |
| **`css/main.css`**                             | All **layout and visuals**: fonts, header, hero overlay, active content panels, **slim carousel** sizing, responsive breakpoints, trailer modal, social icons. Uses a CSS variable for **banner overlay opacity** so JavaScript can tune dimming per movie.                  |
| **`js/script.js`**                             | **Behavior**: toggles the trailer modal (`toggleVideo`), swaps hero background and active content (`changeBg`), reads carousel **`dataset`** attributes, wires click handlers for trailer and carousel items on `DOMContentLoaded`.                                          |
| **`assets/`**                                  | **Video** used by the trailer (e.g. graduation ceremony footage).                                                                                                                                                                                                            |
| **`images/`**                                  | **Title PNGs**, UI assets like **close** icon, and nested **`images/movies/`** for posters and background images referenced by CSS and `changeBg`.                                                                                                                           |
| **`font-awesome/`**                            | **Local Font Awesome 4** bundle (CSS + fonts) for icons used in the header, buttons, and social links.                                                                                                                                                                       |
| **`package.json`**                             | npm **metadata** and **scripts** (`start`, `lint`, `format`).                                                                                                                                                                                                                |
| **`package-lock.json`**                        | Locks dependency versions for reproducible installs.                                                                                                                                                                                                                         |
| **`eslint.config.js`**                         | **ESLint** flat config for browser JS (globals for browser, jQuery `$`, Materialize `M`).                                                                                                                                                                                    |
| **`.prettierrc.json`** / **`.prettierignore`** | **Prettier** formatting defaults and ignored paths (e.g. `node_modules`, vendored `font-awesome`).                                                                                                                                                                           |
| **`.gitignore`**                               | Ignores `node_modules` and OS junk files.                                                                                                                                                                                                                                    |

### Libraries loaded from CDN (not in repo)

- **jQuery** — Required by Materialize’s carousel initializer in `index.html`.
- **Materialize** — CSS + JS for the **3D carousel** component.

## Repository

Source: [https://github.com/Software-me/lito-movies-landing-page](https://github.com/Software-me/lito-movies-landing-page)
