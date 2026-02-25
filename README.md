# static-website-mb

Static website for Menuiserie Belmonte, a custom carpentry and furniture company.

**Goal:** Convert visitors into leads via a contact form or phone number.

---

## Tech stack

| Tool | Purpose |
|---|---|
| React + React Router | UI framework and routing |
| TypeScript | Static typing |
| Tailwind CSS v4 + Sass | Styling and theme |
| lucide-react | Icons |
| ESLint + Prettier | Code quality and formatting |

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
    fr.json        # All French UI copy (structure: page.block.prop)
    index.ts       # Exports fr and interpolate() utility
  icons/           # Custom SVG icons
  images/          # Image assets
  styles/          # Theme, CSS variables, global styles
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

All French UI copy lives in `app/translations/fr.json`, structured as `page.block.prop`:

```ts
import { fr, interpolate } from '../translations'
import { CONTACT } from '../data/contact'

const translations = fr.home

// Static string
translations.hero.title

// With runtime value
interpolate(translations.contactUs.text, { phoneNumber: CONTACT.phoneNumber })
```

Contact info (company name, phone, email) is defined once in `app/data/contact.ts`.

---

## Pages

### Home — `/`

| Block | Description |
|---|---|
| Header | Sticky navigation with logo and CTAs |
| Hero | H1 title, description, 2 CTA buttons, image |
| Services | 4 services with icon and label |
| Projects | Image grid with project titles |
| ContentMedia | Company story |
| ContentMedia | Contact us block |

### Contact — `/contact`

| Block | Description |
|---|---|
| Header | Sticky navigation |
| Form | Contact form (sends email) |
| ContentMedia | Contact us block |

---

## Contact form

Fields:
- First name
- Last name
- Company name
- Project type *(select — prefilled via URL param `?projectType=`)*
- Description

On submit: sends an email directly to the company.

---

## Delivery

See [`docs/plan/rollout-plan.md`](docs/plan/rollout-plan.md) for the full slice history, statuses, and decisions.

### MVP

| # | Slice | Status |
|---|---|---|
| 1 | Home: Hero + Services + Contact block (no images, no icons) | Done |
| 2 | Home: Header with anchors to all sections | Done |
| 3 | Home: Icons on services | Done |
| 4 | Home: Projects block (photos + text, not interactive) | Done |
| 5 | Home: ContentMedia — company story | Done |
| 6 | Home: Add logo | Done *(merged into Slice 2)* |
| 7 | Home: Hero with photo | Done |
| 8 | Home: Photos in ContentMedia blocks | Done |
| 9 | Website hosted and live — contact block without photo | Deferred |

### V1

| # | Slice | Status |
|---|---|---|
| 10 | Contact page: Header + Form (sends email) + Contact block | Done |
| 11 | Header: links to Home, contact anchor, start project | Done |
| 12 | Home: Projects linked to `/contact?projectType=xxx` | To do |

---

## Hosting

To be defined. Domain purchase + CDN solution to explore.
