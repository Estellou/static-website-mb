# CLAUDE.md — Source of Truth

## Project Overview

Static website for a carpenter/craftsman company.
**Goal:** Convert visitors into leads via a contact form or phone number.
**Language:** French only
**Style:** Black & white, classic
**SEO:** Priority

---

## Tech Stack

- **Framework:** React + React Router + TypeScript
- **Styling:** Tailwind CSS + Sass
- **Package manager:** pnpm
- **Linting/Formatting:** ESLint + Prettier
- **Hosting:** TBD (domain purchase + CDN to explore)

---

## Theming

Colors and fonts are injected via a central theme (CSS variables / design tokens).
No hardcoded colors or fonts outside the theme system.

---

## Folder Structure

```
app/
  components/
  routes/
  icons/
  images/
  styles/
.claude/
  CLAUDE.md
README.md
```

---

## Pages

### Home — `/`
1. Header
2. Hero
3. Services
4. Projects
5. ContentMedia — Company story
6. ContentMedia — Contact us

### Contact — `/contact`
1. Header
2. Form
3. ContentMedia — Contact us

---

## Components

### Header
- Sticky, displayed on all pages
- Left: logo (`<TBProvided>`)
- Right: 2 links
  - `primaryCta` → "Démarrer un projet" → `/contact`
  - `secondaryCta` → "Nous contacter" → anchor to contact block on home page

### Hero
```ts
props: {
  title: string
  text: string
  primaryCta: { label: string; link: string }
  secondaryCta: { label: string; link: string }
}
```
- Full width
- H1, text-align left
- Paragraph below
- 2 CTA buttons below
- Image on the right (1/3 width on desktop, hidden on mobile, background fades into white)

### Services
```ts
props: {
  title: string
  services: { icon: SVG; text: string }[]
}
```
- Centered H2 title
- 4 services displayed horizontally: icon + text each

### Projects
```ts
props: {
  title: string
  projects: { img: Image; title: string; link: string }[]
}
```
- H3 title, text-align left
- Image grid with H4 subtitles
- Each project links to `/contact?projectType=<value>` to prefill the form

### ContentMedia (reusable)
```ts
props: {
  title: string
  text: string
  img: Image
  imgPosition: 'left' | 'right'
  cta?: { label: string; link: string }
}
```
- 50/50 layout: text side (H3 + text + optional CTA) and image side
- Image position is configurable
- Used for: company story, contact CTA

### Input
Simple text input component.

### Select
Dropdown to select one option from a list.

### Form (Contact page)
Fields:
- `firstName` — Input
- `familyName` — Input
- `companyName` — Input
- `projectType` — Select (prefilled via URL param)
- `description` — Input (textarea)
- Submit button → sends email to the company

---

## Delivery — Slices

### MVP
| # | Slice |
|---|-------|
| 1 | Home: Hero + Services + Contact block (no images, no icons) |
| 2 | Home: Header with anchors to all blocks |
| 3 | Home: Add icons to Services |
| 4 | Home: Projects block (photos + text, not interactive) |
| 5 | Home: ContentMedia — company story |
| 6 | Home: Add logo |
| 7 | Home: Hero with photo |
| 8 | Home: Photos in ContentMedia blocks |
| 9 | Website hosted, online, accessible — contact block without photo |

### V1
| # | Slice |
|----|-------|
| 10 | Contact page: Header + Form (sends email) + Contact us block |
| 11 | Header: links to Home, "Nous contacter" (anchor), "Démarrer un projet" (→ contact page) |
| 12 | Home: Projects linked to `/contact?projectType=xxx` |

---

## Working Process

- **Before each slice:** plan the solution together before writing code
- **Website content:** for each iteration, I will provide the company goal and language; Claude will propose content
- **After each slice:** update `README.md` with up-to-date product and technical specs

---

## Assets

- Logo: TBD
- Hero image: TBD
- Service icons: TBD
- Project photos: TBD
- ContentMedia images: TBD
