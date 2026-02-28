# CLAUDE.md — Source of Truth

Static website for Menuiserie Belmonte, a custom carpentry company.
**Goal:** Convert visitors into leads via phone or email (copy-to-clipboard on home + contact pages).
**Full spec and slice history:** `docs/templates/spec-template-static-website-mb.md`

---

## Tech Stack

| Tool | Purpose | Version |
|---|---|---|
| React | UI | v19 |
| TypeScript | Typing | ~5.9 |
| Vite | Bundler | v7 |
| Tailwind CSS | Styling | v4 |
| React Router | Routing | v7 (`createBrowserRouter`) |
| lucide-react | Icons | v0.575 |
| npm | Package manager | — |

---

## Folder Structure

```
app/
  components/      # Reusable UI components
  routes/          # Home.tsx, Contact.tsx
  data/
    contact.ts     # CONTACT constant (companyName, phoneNumber, email)
  translations/
    fr.json        # All French UI copy
    index.ts       # Exports fr + interpolate()
  images/          # Static assets
  styles/          # global.css — theme variables, scroll behaviour, toast keyframe
scripts/
  generate-favicon.mjs   # Generates public/favicon.png via sharp
docs/
  plan/rollout-plan.md                       # Full slice history
  templates/spec-template-static-website-mb.md  # Full project spec
```

---

## Coding Conventions

- **TypeScript:** `verbatimModuleSyntax` is on — always `import { type X }` for type-only imports
- **Icons:** always `strokeWidth={1.5}` on all lucide-react icons
- **Styling:** no hardcoded color or font values outside `app/styles/global.css` theme variables
- **Translation alias:** always `const translations = fr.*` — never `const t`

---

## Translation System

All French copy lives in `app/translations/fr.json`.

- Keys: always English. Values: always French.
- Structure: `page.block.prop` — e.g. `home.hero.title`, `contact.form.fields.email.label`
- Leaf values: always strings — no arrays, no booleans, no numbers (enforced via `NestedStringRecord` + `satisfies`)
- Runtime substitution: `interpolate(template, { companyName: CONTACT.companyName })`
- **Rich text rule:** never put HTML in `fr.json` values. Split into `textBefore / linkLabel / linkUrl / textAfter` keys, then compose JSX in the route file. `ContentMedia.text` accepts `ReactNode` for this reason.

Contact info (name, phone, email) lives in `app/data/contact.ts` as `CONTACT`.

---

## Components

| Component | Key behaviour |
|---|---|
| `Header` | Sticky. Nav: Nos prestations → `#services`, Notre histoire → `#story`, CTA → `#contact` |
| `Hero` | H1 + text + primary CTA + optional image (right, desktop only, fades to white) |
| `Services` | Black background. 2 cols mobile, 4 cols desktop |
| `Projects` | Image grid. Plain divs — not interactive |
| `ContentMedia` | 50/50 text+image. `text: ReactNode`, `children` renders between text and CTA. Mobile: image between title and text |
| `HorizontalContact` | Stacked items as `<button>` — click copies value to clipboard, triggers Toast |
| `Toast` | Fixed top-right. `animationKey` prop re-mounts progress bar. 5s auto-dismiss |
| `CtaLink` | `<Link>` for `/...` paths, `<a>` for `#...` anchors and external URLs |
| `Form` | Formspree. Endpoint: `VITE_FORMSPREE_ENDPOINT`. Description min 100 words |

---

## Known Pitfalls

| Pitfall | Fix |
|---|---|
| `height: 100%` inside `aspect-ratio` resolves to 0 | Apply `bg-*` / `object-cover` directly on the `aspect-[4/3]` element |
| `items-center` on `flex-col` (mobile) shrinks children to zero width | Scope to `md:items-center` only |
| `import { ReactNode }` errors with `verbatimModuleSyntax` | Use `import { type ReactNode }` |

---

## Working Process

- **Plan before coding:** present a plan and wait for approval before writing code on any non-trivial change
- **Commits:** only when explicitly asked
- **All home CTAs** anchor to sections (`#contact`, `#services`, `#story`) — no links to `/contact` from home
