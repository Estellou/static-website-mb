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
- Photos + text, no links

**Decisions:**
- 4 projects chosen by client: Cuisine · Bibliothèque · Dressing · Autres
- Responsive grid: 4 columns desktop, 2 tablet, 1 mobile
- Gray placeholder (`bg-gray-100`) shown when no image `src` provided — real photos added in Slice 8
- `link` prop stored in project data with `?projectType=` params (later removed — see Post-V1)
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
**Status:** Done

**Scope:**
- Choose hosting solution (domain + CDN)
- Deploy the website and make it publicly accessible

**Decisions:**
- Hosting: **Cloudflare Pages** (free tier, global CDN, auto-deploys on `git push` to `main`)
- Source: GitHub repo `Estellou/static-website-mb`, `main` branch
- Build command: `npm run build` — output directory: `dist`
- Domain: **menuiserie-belmonte.com** — registered via Cloudflare Registrar (at-cost pricing, DNS auto-configured)
- SPA routing: `dist/404.html` fallback (build script copies `dist/index.html` → `dist/404.html`); `_redirects` approach rejected by Cloudflare validator with error 10021
- `VITE_FORMSPREE_ENDPOINT` set as environment variable in Cloudflare Pages dashboard

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
- projectType defaults to `other` if URL param is missing or invalid
- `?projectType=` URL param read in Contact.tsx via `useSearchParams`
- Success: inline message replaces the form on successful submission
- Error: inline error banner shown above the form, form stays editable

---

### Slice 11 — Final header: navigation links
**Status:** Done *(later revised — see Post-V1)*

**Scope:**
- Refine header links: Home | Nous contacter (anchor) | Démarrer un projet (→ /contact)

**Decisions:**
- Section anchor links (Services, Projets, Notre histoire) removed from final nav — header kept minimal per spec
- `Accueil` uses React Router `<Link to="/">` for client-side navigation
- `Nous contacter` uses `<a href="#contact">` for same-page anchor scroll
- `fr.json` header.nav simplified to `home` and `contact` keys only

---

### Slice 12 — Projects linked to form via URL param
**Status:** Done *(later reverted — see Post-V1)*

**Scope:**
- Each project card links to `/contact?projectType=xxx`
- `projectType` select field in the form is prefilled from the URL param

**Decisions:**
- Project cards wrapped in React Router `<Link>` with `group` class for hover coordination
- Hover: image fades to 80% opacity, title gets underline — signals interactivity without heavy decoration
- `link` prop was already stored in project data (since Slice 4) and `?projectType` already read in Contact.tsx (since Slice 10) — only Projects.tsx needed updating

---

## Post-V1 refinements

### Contact block redesign
- Added `children?: ReactNode` prop to `ContentMedia` — renders between text and CTA
- Created `HorizontalContact` component: stacked items, each with icon + grey label + bold value
- Phone and email displayed via `HorizontalContact` in both Home and Contact contact blocks
- `home.contactUs.text` and `contact.contactUs.text` updated to remove inline phone number
- CTA button removed from contact blocks on all views

### Home page: remove /contact links
- All `/contact` page links removed from home page
- Hero primary CTA, ContentMedia CTA, Header CTA: `/contact` → `#contact`
- Project cards reverted to plain non-interactive divs (Slice 12 reverted)
- Reason: contact form unsatisfactory; lead conversion via phone/email preferred

### Header refinements
- Nav updated: `Nos prestations` (`#services`) · `Notre histoire` (`#story`) · `Démarrer un projet` CTA (`#contact`)
- Logo resized to `h-[75px]` (4/3 of previous size)
- Company name split into two stacked lines ("Menuiserie" / "Belmonte"), matching logo height
- Gap between logo and text tightened to `gap-1.5`

### Favicon + page title
- Generated `public/favicon.png` (64×64 circular crop of logo) via `scripts/generate-favicon.mjs` using `sharp`
- Page title updated from `mb-scaffold` to `Menuiserie Belmonte`

### Sticky header scroll offset
- Added `scroll-margin-top: 96px` to `section[id]` in global.css
- Prevents anchor-linked sections from being hidden behind the sticky header

### Mobile layout improvements
- Services: 2-column grid on mobile (`grid-cols-2`)
- ContentMedia: vertical padding halved on mobile (`py-5`), gap reduced (`gap-8`)
- ContentMedia: `items-center` scoped to `md:` only — fixes HorizontalContact invisible on mobile
- ContentMedia: mobile image rendered between title and text (desktop side column unchanged)
- ContentMedia: fixed `h-full` inside `aspect-[4/3]` — applied `bg-gray-100`/`object-cover` directly on aspect-ratio element to avoid collapsed placeholder
- Hero: vertical padding halved on mobile (`py-12`)
- Projects: bottom padding halved on mobile (`pb-10`)
- Hero secondary CTA ("Nous contacter") removed

### Copy-to-clipboard on contact items
- `HorizontalContact` items are now buttons — clicking copies the value to clipboard
- `Toast` reusable component (`app/components/Toast.tsx`): fixed top-right, `bg-gray-100`, rounded corners, progress bar depleting over 5s, × close button, check icon

### Content and data
- `fr.json` keys renamed to English: `etudes→studies`, `conception→design`, `realisation→production`, `pose→installation`, `cuisine→kitchen`, `bibliotheque→bookcase`, `dressing→wardrobe`, `autres→other`
- `app/data/contact.ts` updated with real phone (`06 50 76 80 74`) and email (`estelle.latronico@gmail.com`)

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
- Supports `{placeholder}` tokens for runtime values (e.g. `{companyName}`)
- `interpolate(template, vars)` utility in `app/translations/index.ts` handles substitution
- Translation alias convention: always `const translations = fr.*` (never `t`)
- **All leaf values must be strings — no arrays, no non-string primitives**
- Enforced via `NestedStringRecord` type + `satisfies` in `translations/index.ts`
- All keys in English: `studies`, `design`, `production`, `installation`, `kitchen`, `bookcase`, `wardrobe`, `other`

---

## Global decisions

| Decision | Detail |
|---|---|
| Framework | Vite 7 + React 18 + TypeScript |
| Styling | Tailwind CSS v4 + Sass |
| Routing | React Router v7 (`createBrowserRouter`) |
| Icons | lucide-react (`strokeWidth={1.5}` convention) |
| Package manager | npm (pnpm Volta shim issue → npx workaround used for scaffolding) |
| Logo format | PNG with white background — transparency to be addressed in a future iteration |
| Language | French (website content only) |
| Code & docs language | English |
| Content | All French copy in `app/translations/fr.json` |
| Contact info | Centralised in `app/data/contact.ts` |
| Translation alias | `const translations = fr.*` — never `const t` |
| fr.json keys | Always English — values are French |
| Lead conversion | Phone + email (copy-to-clipboard) preferred over contact form |
