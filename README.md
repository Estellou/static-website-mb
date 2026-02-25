# static-website-mb

Static website for Menuiserie Belmonte, a custom carpentry and furniture company.

**Goal:** Convert visitors into leads via phone or email (displayed with copy-to-clipboard on the home page).

---

## Tech stack

| Tool | Purpose |
|---|---|
| React + React Router | UI framework and routing |
| TypeScript | Static typing |
| Tailwind CSS v4 + Sass | Styling and theme |
| lucide-react | Icons |
| ESLint + Prettier | Code quality and formatting |
| sharp | Favicon generation (dev only) |

---

## Getting started

```bash
npm install
npm run dev
```

---

## Project structure

```
app/
  components/      # Reusable UI components
  routes/          # Pages (Home, Contact)
  data/
    contact.ts     # CONTACT constant — companyName, phoneNumber, email
  translations/
    fr.json        # All French UI copy (structure: page.block.prop, keys in English)
    index.ts       # Exports fr and interpolate() utility
  icons/           # Custom SVG icons
  images/          # Image assets
  styles/          # Theme, CSS variables, global styles
scripts/
  generate-favicon.mjs  # Generates public/favicon.png from logo
docs/
  plan/
    rollout-plan.md   # Delivery slices history and decisions
CLAUDE.md             # Project source of truth
README.md
```

---

## Theme

Colors and fonts are defined via central CSS variables in `app/styles/global.css`.
No hardcoded color or font values outside the theme system.

Style: classic black and white.

---

## Content and translations

All French UI copy lives in `app/translations/fr.json`, structured as `page.block.prop`.
Keys are always in English — values are in French.

```ts
import { fr, interpolate } from '../translations'
import { CONTACT } from '../data/contact'

const translations = fr.home

// Static string
translations.hero.title

// With runtime value
interpolate(translations.story.text, { companyName: CONTACT.companyName })
```

Contact info (company name, phone, email) is defined once in `app/data/contact.ts`.

---

## Pages

### Home — `/`

| Block | Description |
|---|---|
| Header | Sticky nav: Nos prestations · Notre histoire · Démarrer un projet CTA |
| Hero | H1 title, description, 1 CTA button, image |
| Services | 4 services with icon and label (2-col on mobile) |
| Projects | Image grid with project titles (not interactive) |
| ContentMedia | Company story |
| ContentMedia | Contact block with phone + email (copy-to-clipboard) |

### Contact — `/contact`

| Block | Description |
|---|---|
| Header | Sticky navigation |
| Form | Contact form (sends email via Formspree) |
| ContentMedia | Contact block with phone + email (copy-to-clipboard) |

---

## Key components

| Component | Description |
|---|---|
| `Header` | Sticky nav with logo, anchor links, CTA |
| `Hero` | Full-width hero with optional image |
| `Services` | Black-background services grid |
| `Projects` | Responsive image grid |
| `ContentMedia` | Half-text / half-image layout, accepts `children` |
| `HorizontalContact` | Stacked phone + email items with copy-to-clipboard |
| `Toast` | Reusable fixed top-right notification with progress bar |
| `Form` | Contact form with validation |
| `Input` / `Select` | Form field components |
| `CtaLink` | Handles internal `<Link>` vs anchor `<a>` automatically |
| `ScrollToTop` | Scrolls to top on route change |

---

## Contact form

Fields:
- First name *(required)*
- Last name *(required)*
- Email *(required)*
- Phone *(required)*
- Company name *(optional)*
- Project type *(select)*
- Description *(required, min 100 words)*

Submission: sent via **Formspree**. Set `VITE_FORMSPREE_ENDPOINT` in `.env.local`.

---

## Favicon

Generated from the company logo via `scripts/generate-favicon.mjs`:

```bash
node scripts/generate-favicon.mjs
```

Outputs a 64×64 circular PNG to `public/favicon.png`.

---

## Delivery

See [`docs/plan/rollout-plan.md`](docs/plan/rollout-plan.md) for the full slice history, statuses, and decisions.

### MVP

| # | Slice | Status |
|---|---|---|
| 1 | Home: Hero + Services + Contact block (no images, no icons) | Done |
| 2 | Home: Header with anchors to all sections | Done |
| 3 | Home: Icons on services | Done |
| 4 | Home: Projects block (photos + text) | Done |
| 5 | Home: ContentMedia — company story | Done |
| 6 | Home: Add logo | Done *(merged into Slice 2)* |
| 7 | Home: Hero with photo | Done |
| 8 | Home: Photos in ContentMedia blocks | Done |
| 9 | Website hosted and live | Deferred |

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
| Toast reusable component | Done |
| Remove /contact links from home — all CTAs anchor to #contact | Done |
| Header nav: Nos prestations · Notre histoire · Démarrer un projet | Done |
| Header logo resized, two-line company name | Done |
| Favicon + page title | Done |
| Sticky header scroll offset (scroll-margin-top) | Done |
| Mobile layout improvements (Services, ContentMedia, Hero, Projects) | Done |
| ContentMedia: mobile image between title and text | Done |
| fr.json keys renamed to English | Done |
| Real contact info (phone + email) | Done |

---

## Hosting

To be defined. Domain purchase + CDN solution to explore.
