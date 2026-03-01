# Project Spec — Menuiserie Belmonte

---

## Project Overview

### Problems & Impact

**Problem:** The craftsman has no online presence — potential clients searching for carpentry services in Bordeaux have no way to discover, evaluate, or contact him.
**Impact:** Lost leads every month; the business relies entirely on word of mouth.
**Goal:** Convert website visitors into leads via phone or email.
**Success criteria:** Visitor copies the phone number or email address, or submits the contact form.

### Scope & Out of Scope

**In scope:**
- Home page (Hero, Services, Projects, company story, contact block)
- Contact page (form + contact block)
- Sticky header with navigation on both pages

**Out of scope:**
- CMS or admin interface
- Blog or news section
- E-commerce or booking system
- User accounts or authentication
- Analytics dashboard

**Key constraints:**

| Property | Value |
|---|---|
| Target audience | Individuals and businesses in the Bordeaux area |
| Content language | French |
| Code & docs language | English |
| Visual tone | Classic, artisanal, black and white |
| Hosting | Cloudflare Pages — no backend server |

---

## Product Specifications

### Content System

- **Source:** `app/translations/fr.json`
- **Structure:** `page.block.prop` — keys always in English, values always in French (e.g. `home.hero.title`, `contact.form.fields.email.label`)
- **Runtime values:** `interpolate(template, { key: value })` for `{placeholder}` tokens (e.g. `{companyName}`)
- **Rich text rule:** Never put HTML inside translation values. Split into `textBefore` / `linkLabel` / `linkUrl` / `textAfter` string keys and compose JSX in the route file.
- **Type safety:** `NestedStringRecord` type + `satisfies` enforces string-only leaf values — no arrays, no non-string primitives.

**Shared data constants:**

| File | Exports | Purpose |
|---|---|---|
| `app/data/contact.ts` | `CONTACT` | `companyName`, `phoneNumber`, `email` — single source of truth for all contact info |

### Features

#### Home page — `/`

Static marketing page. Goal: present the company and drive visitors to the contact block.

| Section | Description |
|---|---|
| Header | Sticky nav: logo left, anchor links (Nos prestations → `#services`, Notre histoire → `#story`) + CTA button (Démarrer un projet → `#contact`) right |
| Hero | H1 title, description paragraph, primary CTA button, photo right (desktop only, fades into white) |
| Services | Black-background grid: 4 services with icon + label (2 cols mobile, 4 cols desktop) |
| Projects | Image grid: 4 project categories with photo + title (2 cols mobile, 4 cols desktop) |
| Story | ContentMedia block: company origin story, image left (desktop), image between title and text (mobile) |
| Contact | ContentMedia block: invitation text + HorizontalContact (phone + email, copy-to-clipboard) |

**Assets:**

| Asset | Status | Notes |
|---|---|---|
| Logo | Provided | `app/images/logo.png` — PNG with white background |
| Hero photo | TBD | Right side, 1/3 width desktop, hidden mobile |
| Story photo | TBD | `aspect-[4/3]`, image left on desktop |
| Contact photo | TBD | `aspect-[4/3]`, image right on desktop |
| Project photos (×4) | TBD | Cuisine, Bibliothèque, Dressing, Autres |

#### Contact page — `/contact`

| Section | Description |
|---|---|
| Header | Same sticky header as home page |
| Form | Contact form sent via Formspree. Fields: firstName, familyName, email (required), phone (required), companyName (optional), projectType (select, defaults to `other`), description (required, min 100 words with live word count). Success: form replaced by confirmation message. Error: inline banner above form, form stays editable. |
| Contact | Same ContentMedia contact block as home page |

---

## Tech Specifications

### Architecture Overview

Single-page React app. No backend. Hosted on Cloudflare Pages (free tier, global CDN, GitHub integration). Contact form submitted via Formspree (third-party email service — endpoint stored in `VITE_FORMSPREE_ENDPOINT`). All state is local — no global store.

**Folder structure:**

```
app/
  components/      # Reusable UI components
  routes/          # Page-level components (Home, Contact)
  data/
    contact.ts     # CONTACT constant — companyName, phoneNumber, email
  translations/
    fr.json        # All French UI copy
    index.ts       # Exports fr and interpolate()
  images/          # Static image assets
  styles/          # CSS theme, global styles, keyframes
scripts/
  generate-favicon.mjs   # Generates public/favicon.png from logo (uses sharp)
docs/
  plan/
    rollout-plan.md      # Full slice history and decisions
  templates/
    spec-template.md               # Reusable blank spec template
    spec-template-static-website-mb.md  # This file
```

### Tech Stack

| Tool | Purpose | Version |
|---|---|---|
| React | UI framework | v19 |
| TypeScript | Static typing | ~5.9 |
| Vite | Bundler / dev server | v7 |
| Tailwind CSS | Utility-first styling | v4 |
| Sass | CSS preprocessing | v1 |
| React Router | Client-side routing | v7 |
| lucide-react | Icons | v0.575 |
| sharp | Favicon generation (dev only) | v0.34 |
| npm | Package manager | — |
| ESLint + Prettier | Code quality | — |

### Standards

**Inherited conventions:** None — all rules listed below.

**Project-specific rules:**
- `verbatimModuleSyntax` is enabled: always use `import { type X }` for type-only imports
- All lucide-react icons: `strokeWidth={1.5}` to match the logo line weight
- No hardcoded color or font values outside the CSS theme variables in `app/styles/global.css`
- Translation alias: always `const translations = fr.*` — never `const t`
- All `fr.json` keys are English — values are French
- `fr.json` leaf values are always strings — no arrays, no booleans, no numbers
- `ContentMedia.text` accepts `ReactNode` — use this to compose rich text (links, etc.) in route files
- All home-page CTAs anchor to sections (`#contact`, `#services`, `#story`) — no links to `/contact` from home

**Known pitfalls:**

| Pitfall | Fix |
|---|---|
| `height: 100%` inside an `aspect-ratio` container resolves to 0 (browser does not treat computed aspect-ratio height as a definite height) | Apply `bg-*` / `object-cover` directly on the `aspect-[4/3]` element — never nest a `h-full` div inside it |
| `items-center` on a `flex-col` container on mobile shrinks children to content width, making them invisible | Scope to `md:items-center` only |
| `import { ReactNode }` causes a TypeScript error with `verbatimModuleSyntax` | Use `import { type ReactNode }` |

---

## Delivery — Slices

### MVP

| # | Slice | Status |
|---|---|---|
| 1 | Home: Hero + Services + Contact block (no images, no icons) | Done |
| 2 | Home: Header with anchors to all sections + Logo | Done |
| 3 | Home: Icons on Services | Done |
| 4 | Home: Projects block (photos + text, not interactive) | Done |
| 5 | Home: ContentMedia — company story | Done |
| 6 | Home: Add logo | Done *(merged into Slice 2)* |
| 7 | Home: Hero with photo | Done |
| 8 | Home: Photos in ContentMedia blocks | Done |
| 9 | Website hosted and live | Done |

### V1

| # | Slice | Status |
|---|---|---|
| 10 | Contact page: Header + Form + Contact block | Done |
| 11 | Header: final navigation links | Done |
| 12 | Home: Projects linked to `/contact?projectType=xxx` | Done *(later reverted)* |

### Post-V1

| Change | Status |
|---|---|
| HorizontalContact: phone + email with copy-to-clipboard | Done |
| Toast: reusable component with progress bar | Done |
| Remove all `/contact` links from home — CTAs anchor to `#contact` | Done |
| Header nav: Nos prestations · Notre histoire · Démarrer un projet | Done |
| Header logo resized to `h-[75px]`, two-line company name | Done |
| Favicon: 64×64 circular PNG via `scripts/generate-favicon.mjs` | Done |
| Page title: "Menuiserie Belmonte" | Done |
| Sticky header scroll offset: `scroll-margin-top: 96px` on `section[id]` | Done |
| Mobile layout improvements (Services, ContentMedia, Hero, Projects) | Done |
| ContentMedia: mobile image between title and text | Done |
| `fr.json` keys renamed to English | Done |
| Real contact info (phone + email) | Done |
| Philomathique school name as clickable link in story text | Done |

---

## Global Decisions

| Decision | Detail |
|---|---|
| Framework | Vite 7 + React 19 + TypeScript |
| Styling | Tailwind CSS v4 + Sass |
| Routing | React Router v7 (`createBrowserRouter`) |
| Icon library | lucide-react (`strokeWidth={1.5}` convention) — over custom SVGs: lightweight, tree-shakeable, TypeScript-native |
| Email provider | Formspree — no backend required, free tier 50 submissions/month; rejected Mailgun/SendGrid (require a server) |
| Lead conversion | Phone + email with copy-to-clipboard preferred over contact form — form kept as secondary channel |
| Project cards | Plain non-interactive divs — links to `/contact?projectType=xxx` reverted when contact form was de-emphasised |
| Logo format | PNG with white background — SVG/transparent version deferred to a future iteration |
| Package manager | npm — pnpm rejected due to Volta shim issue at scaffolding time |
| Rich text in translations | Split into `textBefore / linkLabel / linkUrl / textAfter` string keys + `ContentMedia.text: ReactNode` — HTML forbidden inside `fr.json` values |
| Hosting | Cloudflare Pages — free tier, global CDN, integrates with GitHub; SPA fallback via `dist/404.html` (build copies `dist/index.html` → `dist/404.html`); `_redirects` rejected by Cloudflare validator with error 10021 |
| Domain | `menuiserie-belmonte.com` — registered via Cloudflare Registrar (at-cost pricing, auto-integrates with Cloudflare Pages DNS) |

---

## Working Process

- **Plan before coding:** For any non-trivial change, present a plan and wait for explicit approval before writing code.
- **One slice at a time:** Complete, commit, and update this spec before starting the next slice.
- **Commits:** Only when explicitly asked.
- **Spec hygiene:** After each slice, update the Delivery table status and log any new decisions in Global Decisions.
