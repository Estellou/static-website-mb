# Rollout Plan — Menuiserie Belmonte

Living history of all delivery slices: scope, status, and decisions made during execution.

---

## MVP

### Slice 1 — Hero + Services + Contact block (no images, no icons)
**Status:** Done

**Scope:**
- Hero component: H1, paragraph, 2 CTA buttons
- Services component: centered H2, 4 services (text only)
- ContentMedia component: reusable half-text layout, image optional
- Contact block rendered via ContentMedia on the home page

**Decisions:**
- Created `CtaLink` shared component to handle both internal links (`/contact`) and same-page anchors (`#contact`) correctly via React Router `<Link>` vs `<a>`
- Services section uses a black background to visually break the page
- ContentMedia image prop is optional — renders gracefully without it (text takes full width)
- Phone number placeholder `06 00 00 00 00` used in contact block until real number is provided
- Content invented: tagline *"De la matière à la création"*, hero text in French, service labels: Études · Conception · Réalisation · Pose

---

### Slice 2 — Header with anchors to all sections + Logo
**Status:** Done *(merged with Slice 6 — logo added ahead of schedule)*

**Scope:**
- Sticky header on home page
- Logo (image + company name text) on the left
- Desktop nav: Services · Projets · Notre histoire · Nous contacter + "Démarrer un projet" CTA
- Mobile: animated hamburger → vertical drawer
- Smooth scroll on all anchor links
- Section `id` attributes added to all home page sections

**Decisions:**
- Logo PNG provided by client → used immediately, combining Slice 2 + Slice 6
- Logo displayed as: image icon + `"Menuiserie Belmonte"` text in uppercase, font-semibold
- Logo file stored as `app/images/logo.png` (renamed from UUID filename)
- Logo PNG has white background → accepted for now, transparency/SVG to be revisited in a later iteration
- `#projects` and `#story` anchor links added in nav even though those sections don't exist yet — reserved for Slices 4 and 5
- `scroll-behavior: smooth` added globally in `app/styles/global.css`
- Mobile menu closes automatically on link click

---

### Slice 3 — Icons on services
**Status:** Done

**Scope:**
- Add an icon to each of the 4 services
- `Service` interface updated: `{ icon: ReactNode, text: string }`

**Decisions:**
- Icon library chosen: **lucide-react** (over custom SVG files) — lightweight, tree-shakeable, TypeScript-native
- Icons selected: `Ruler` (Études) · `PenTool` (Conception) · `Hammer` (Réalisation) · `Wrench` (Pose)
- `strokeWidth={1.5}` applied to all icons to match the thin line-art style of the logo

---

### Slice 4 — Projects block (photos + text, not interactive)
**Status:** Done

**Scope:**
- Projects component: left-aligned H3, image grid with H4 subtitles
- Photos + text, no links yet (interactivity comes in Slice 12)

**Decisions:**
- 4 projects chosen by client: Cuisine · Bibliothèque · Dressing · Autres
- Responsive grid: 4 columns desktop, 2 tablet, 1 mobile
- Gray placeholder (`bg-gray-100`) shown when no image `src` provided — real photos added in Slice 8
- `link` prop stored in project data now with `?projectType=` params ready for Slice 12
- H4 labels displayed in uppercase with letter-spacing for clean typographic hierarchy

---

### Slice 5 — ContentMedia — company story
**Status:** Done

**Scope:**
- Add a second ContentMedia block on the home page telling the company story

**Decisions:**
- `imgPosition="left"` to alternate visually with the contact block (`right`)
- Placeholder copy used for now: *"L'atelier Belmonte"* — 20 years, artisan craftwork, particuliers and professionnels
- No image yet — real photo added in Slice 8
- No CTA on this block (contact block below already carries the call to action)

---

### Slice 6 — Add logo
**Status:** Done *(merged into Slice 2)*

---

### Slice 7 — Hero with photo
**Status:** Done

**Scope:**
- Add image to the Hero (right side, 1/3 width on desktop, hidden on mobile)
- Background fades progressively into white

**Decisions:**
- `img` prop is optional — Hero renders gracefully without it (text full width)
- Fade implemented via `position: absolute` gradient div (`from-white to-transparent`) on the left half of the image block
- Gray placeholder (`bg-gray-100`) used until real photo is provided
- Hero section uses `items-stretch` so image block fills the full section height

---

### Slice 8 — Photos in ContentMedia blocks
**Status:** Done

**Scope:**
- Add images to the ContentMedia blocks (company story + contact)

**Decisions:**
- `img` prop passed to both ContentMedia blocks with empty `src` — gray placeholder shown until real photos are available
- `aspect-[4/3]` applied to the image container in ContentMedia for consistent proportions
- Placeholder pattern consistent with Hero (Slice 7) and Projects (Slice 4): same `bg-gray-100` fallback

---

### Slice 9 — Website live
**Status:** Deferred

**Scope:**
- Choose hosting solution (domain + CDN)
- Deploy the website and make it publicly accessible

---

## V1

### Slice 10 — Contact page: form + contact block
**Status:** Done

**Scope:**
- Contact page with Header, Form, and ContentMedia contact block
- Form fields: first name, last name, company, project type (select), description
- Form submission sends an email to the company

**Decisions:**
- Email service: **Formspree** (no backend, free tier 50 submissions/month)
- Endpoint stored in `VITE_FORMSPREE_ENDPOINT` env variable — see `.env.example`
- Fields added beyond original spec: **email** (required) and **phone** (required)
- companyName is optional
- description requires minimum **100 words** — live word count shown below the field
- description has placeholder text to guide the user
- projectType defaults to `autres` if URL param is missing or invalid
- `?projectType=` URL param read in Contact.tsx via `useSearchParams` — ready for Slice 12
- Success: inline message replaces the form on successful submission
- Error: inline error banner shown above the form, form stays editable

---

### Slice 11 — Final header: navigation links
**Status:** Done

**Scope:**
- Refine header links: Home | Nous contacter (anchor) | Démarrer un projet (→ /contact)

**Decisions:**
- Section anchor links (Services, Projets, Notre histoire) removed from final nav — header kept minimal per spec
- `Accueil` uses React Router `<Link to="/">` for client-side navigation
- `Nous contacter` uses `<a href="#contact">` for same-page anchor scroll
- `fr.json` header.nav simplified to `home` and `contact` keys only

---

### Slice 12 — Projects linked to form via URL param
**Status:** Done

**Scope:**
- Each project card links to `/contact?projectType=xxx`
- `projectType` select field in the form is prefilled from the URL param

**Decisions:**
- Project cards wrapped in React Router `<Link>` with `group` class for hover coordination
- Hover: image fades to 80% opacity, title gets underline — signals interactivity without heavy decoration
- `link` prop was already stored in project data (since Slice 4) and `?projectType` already read in Contact.tsx (since Slice 10) — only Projects.tsx needed updating

---

## Cross-cutting refactors

### Content centralisation
Two data files introduced outside the slice plan:

**`app/data/contact.ts` — `CONTACT` constant**
- Holds `companyName`, `phoneNumber`, `email`
- Single source of truth for all contact info used in UI text
- Update one file → propagates everywhere

**`app/translations/fr.json` — French content**
- All UI copy defined under `header.*`, `home.*`, `contact.*`
- Structure: `[page][blockName][prop]` e.g. `home.hero.title`, `contact.form.fields.email.label`
- Supports `{placeholder}` tokens for runtime values (e.g. `{companyName}`, `{phoneNumber}`)
- `interpolate(template, vars)` utility in `app/translations/index.ts` handles substitution
- Translation alias convention: always `const translations = fr.*` (never `t`)
- **All leaf values must be strings — no arrays, no non-string primitives**
- Enforced via `NestedStringRecord` type + `satisfies` in `translations/index.ts`: TypeScript errors at compile time if an array or non-string value is introduced
- Named keys replace arrays: `services.etudes/conception/realisation/pose`, `projects.cuisine/bibliotheque/dressing/autres`, `contact.form.projectTypes` as string record

---

## Global decisions

| Decision | Detail |
|---|---|
| Framework | Vite 7 + React 18 + TypeScript |
| Styling | Tailwind CSS v4 + Sass |
| Routing | React Router v7 (`createBrowserRouter`) |
| Icons | lucide-react |
| Package manager | npm (pnpm Volta shim issue → npx workaround used for scaffolding) |
| Logo format | PNG with white background — transparency to be addressed in a future iteration |
| Language | French (website content only) |
| Code & docs language | English |
| Content | All French copy in `app/translations/fr.json` |
| Contact info | Centralised in `app/data/contact.ts` |
| Translation alias | `const translations = fr.*` — never `const t` |
