# Web for Designers

A bilingual, interactive course that teaches **HTML, CSS, and a little JavaScript** to **UI designers with zero programming background**. Taught from scratch in plain language, anchored in tools designers already know (Figma). Every example runs in an **editable live preview** right on the page — no setup, no install.

## Tech Stack

| Layer | Technology |
| ----- | ---------- |
| Site framework | [Astro 6](https://astro.build) + [Starlight 0.40](https://starlight.astro.build) |
| UI islands | [Preact](https://preactjs.com) (via `@astrojs/preact`) |
| Live code preview | Editable `<textarea>` editors → a sandboxed `<iframe srcdoc>` that renders HTML/CSS/JS natively (no backend, no external service) |
| Unit tests | [Vitest](https://vitest.dev) + `@testing-library/preact` |
| Styling | Starlight default + custom CSS (`src/styles/custom.css`) |
| i18n | Starlight built-in, `defaultLocale: 'en'`, locales: `en` + `th` |

## Commands

Run all commands from the project root.

```bash
npm install        # Install dependencies
npm run dev        # Start dev server at http://localhost:4321
npm run build      # Build production site to ./dist/
npm run preview    # Preview the production build locally
npm test           # Run Vitest unit tests
```

> There is **no runner build step** — HTML/CSS/JS run natively in a sandboxed iframe in the reader's browser.

## Content Structure

Lessons live at:

```
src/content/docs/
  en/              # English content — served at /en/...
    how-web-works/
    html/
    css/
    layout/
    responsive/
    javascript/
    workflow/
    index.mdx      # EN landing page (splash template)
  th/              # Thai content — served at /th/...
    (same module directories)
    index.mdx      # TH landing page (splash template)
```

### The 7 Modules

| Directory | Module | Topics |
| --------- | ------ | ------ |
| `how-web-works` | How the Web Works | Browsers, pages, what HTML/CSS/JS each do |
| `html` | HTML — Structure & Content | Elements, text, links, images, lists, semantics, forms |
| `css` | CSS — Styling Basics | Selectors, colors/units, typography, box model, backgrounds/borders |
| `layout` | CSS Layout — Flexbox & Grid | Flow, Flexbox, Grid, positioning, spacing systems |
| `responsive` | Responsive Design | Relative units, media queries, mobile-first, responsive images |
| `javascript` | A Little JavaScript | Variables/functions, selecting elements, events, DOM changes, interactions |
| `workflow` | Design-to-Code Workflow | Figma → code, design tokens, scales, components, accessibility, handoff |

### Lesson File IDs

Content IDs follow the `<module>/<slug>` convention, e.g. `css/box-model`. The Starlight sidebar uses `autogenerate: { directory }` per locale root, so new `.mdx` files are picked up automatically.

### Lesson Template

Each lesson MDX file follows this structure:

1. **Intro** — plain-language framing, anchored in design experience (Figma)
2. **Concept** — jargon-light explanation
3. **LivePreview** — `<LivePreview html={...} css={...} js={...} />` editable example with a live preview
4. **Tip** — `<Tip>` callout for design/accessibility guidance
5. **Quiz** — `<Quiz questions={...} />` comprehension check
6. **ProgressTracker** — `<ProgressTracker id="module/slug" />` (always last)

Code snippets are hoisted into `export const` template literals and passed by reference.

> **⚠️ Authoring gotchas:**
> - **Frontmatter `title`/`description` are single-quoted** when they contain a colon or backtick (YAML safety).
> - **Escape sequences in code template literals must be double-backslashed** (`\\n`, `\\t`).
> - **In JS examples, avoid JS template-literal `${...}`** (use string concatenation), or escape it as `\${...}` — a raw `${` breaks the MDX build. The JS module uses `+` concatenation throughout to sidestep this.

## How the Live Preview Works

`<LivePreview>` (`src/components/LivePreview.tsx`) shows an editable code box for each provided language (`html`/`css`/`js`, tabbed) next to a preview. As the learner types, it assembles a full document (`src/components/build-srcdoc.ts`) and feeds it to a `<iframe sandbox="allow-scripts" srcdoc=...>`, re-rendering live (debounced). Everything runs client-side in the reader's browser — no backend, no CDN, no WASM.

## Deployment

The site is fully static (`output: 'static'` in `astro.config.mjs`). Build output lands in `dist/`. Deploy to any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages).

### GitHub Pages (configured)

This repo deploys to GitHub Pages via `.github/workflows/deploy.yml` (build with
`withastro/action` on Node 22, publish with `actions/deploy-pages`).

One-time setup:

1. Create a GitHub repo and push (`main` branch).
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Confirm the base path in `astro.config.mjs`:
   - **Project site** (`https://USER.github.io/REPO/`): `site: 'https://USER.github.io'`, `base: '/REPO'` (currently `avetavos` / `web-for-designers`).
   - **User/org site** or **custom domain**: set `site` and **remove `base`** (served at root).

If you change `base`, update the base-prefixed links in `src/content/docs/{en,th}/index.mdx`.
