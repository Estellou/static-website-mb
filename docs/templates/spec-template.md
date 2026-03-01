# Project Spec — [PROJECT NAME]

<!-- ROLE OF THIS FILE
     Single source of truth for Claude in every session.
     Read this at the start of each session to regain full context.
     Update it as the project evolves — a stale spec produces stale code. -->

---

## Project Overview

### Problems & Impact

<!-- ROLE: Explains WHY this project exists. Grounds every decision in the problem being solved.
     Claude refers back to this when making trade-offs (what to cut, what to simplify).
     Be concrete — a vague problem produces vague solutions. -->

**Problem:** [What situation or pain point triggers this work — e.g. "Visitors can't find contact info, leading to lost leads"]
**Impact:** [Who is affected and what happens if left unsolved — e.g. "The craftsman loses potential clients each month"]
**Goal:** [The primary measurable outcome — e.g. "Convert visitors into leads via phone or email"]
**Success criteria:** [How you will know the goal is met — e.g. "Visitor contacts the company within 48h of landing on the site"]

### Scope & Out of Scope

<!-- ROLE: Defines the boundaries of the work.
     "In scope" tells Claude what to build.
     "Out of scope" is equally important — it tells Claude what NOT to build,
     preventing over-engineering and unrequested features.
     Add constraints that shape the work (audience, platform, language, budget, etc.). -->

**In scope:**

- [What is included — e.g. "Home page + Contact page"]
- [...]

**Out of scope:**

- [What is explicitly excluded — e.g. "CMS, user authentication, blog"]
- [...]

**Key constraints:**

<!-- Add only the rows relevant to this project type. Remove the rest.
     Frontend   → Content language, Code language, Visual tone, Browser support
     Backend    → SLA, Rate limits, Performance targets, Data residency
     Library    → Public API surface, Bundle size, Peer dependencies
     Feature    → Affected systems, Rollout strategy, Backwards compatibility -->

| Property                | Value                                                           |
| ----------------------- | --------------------------------------------------------------- |
| [e.g. Target audience]  | [e.g. Individual clients and businesses in the Le Bouscat area] |
| [e.g. Content language] | [e.g. French]                                                   |
| [e.g. Visual tone]      | [e.g. Classic, black and white]                                 |

---

## Product Specifications

### Content System

<!-- ROLE: Explains how user-facing copy and shared data are managed.
     Critical for projects with i18n, a CMS, or heavy copywriting.
     Prevents Claude from hardcoding strings directly in components.
     Skip entirely for projects with no user-facing content (e.g. a pure backend service). -->

- **Source:** [Where copy lives — e.g. "`app/translations/fr.json`", "Contentful CMS", "inline in components"]
- **Structure:** [How it is organised — e.g. "`page.block.prop` keys in English, values in French"]
- **Runtime values:** [How dynamic values are injected — e.g. "`interpolate(template, { key: value })` for `{placeholder}` tokens"]
- **Rich text rule:** [How formatted content (links, bold, etc.) is handled — e.g. "Never put HTML in translation values — split into parts and compose JSX in the component"]
- **Type safety:** [Enforcement mechanism if any — e.g. "`NestedStringRecord` + `satisfies` enforces string-only leaf values"]

**Shared data constants:**

<!-- ROLE: Centralises runtime data reused across the project (contact info, config, feature flags).
     Change it in one place and it propagates everywhere. -->

| File     | Exports           | Purpose                                                  |
| -------- | ----------------- | -------------------------------------------------------- |
| [`path`] | [`CONSTANT_NAME`] | [What it holds — e.g. "companyName, phoneNumber, email"] |

### Features

<!-- ROLE: Defines what the product does from a user or consumer perspective.
     This is the source of truth for what needs to be built.

     Adapt the format to the project type:
     - Website / app  → pages and their sections
     - Backend service → capabilities and endpoints
     - Library         → public API surface
     - Feature work    → user stories or acceptance criteria

     Claude uses this to understand the full scope and avoid building beyond it. -->

#### [Feature or page name — e.g. "Home page" / "POST /api/users" / "DatePicker component"]

[One-sentence description of the feature's purpose and value]

| Element                                    | Description                                                    |
| ------------------------------------------ | -------------------------------------------------------------- |
| [Sub-feature / section / field / endpoint] | [What it does — include key behaviour, states, or constraints] |

**Assets:** _(frontend only — remove if not applicable)_

| Asset             | Status           | Notes                             |
| ----------------- | ---------------- | --------------------------------- |
| [e.g. Hero image] | [Provided / TBD] | [Format, dimensions, constraints] |

---

## Tech Specifications

### Architecture Overview

<!-- ROLE: Describes the high-level structure of the system.
     Helps Claude understand where new code fits and avoids misplaced files or patterns.
     For simple projects, a short paragraph is enough.
     For complex systems, describe components, data flows, and integration points. -->

[Describe the system — e.g. "Single-page React app served via CDN. No backend.
Contact form submitted via Formspree. All state is local (no global store)."]

**Folder structure:**

<!-- ROLE: Tells Claude exactly where to find and create files.
     Prevents scattered file creation and enforces a consistent project layout.
     Annotate each entry with its purpose. -->

```
[root]/
  [dir]/    # [purpose — e.g. "Reusable UI components"]
  [dir]/    # [purpose — e.g. "Page-level route components"]
  [dir]/    # [purpose — e.g. "All French UI copy (fr.json)"]
  [dir]/    # [purpose — e.g. "Dev scripts (favicon generation, etc.)"]
```

### Tech Stack

<!-- ROLE: Prevents incompatible tool suggestions and outdated patterns.
     Be specific about major versions — behaviour differs significantly between them
     (e.g. Tailwind v3 vs v4, React Router v6 vs v7).
     List only what is actually installed. -->

| Tool                     | Purpose         | Version |
| ------------------------ | --------------- | ------- |
| [e.g. React]             | UI framework    | [vX]    |
| [e.g. Tailwind CSS]      | Styling         | [vX]    |
| [e.g. React Router]      | Routing         | [vX]    |
| [e.g. npm]               | Package manager | —       |
| [e.g. ESLint + Prettier] | Code quality    | —       |

### Standards

<!-- ROLE: Project-specific coding rules that override Claude's defaults.
     Only list rules that are non-obvious or that differ from common practice.
     Claude applies these in every file it touches.

     If another agent or CLAUDE.md already defines the base conventions for this codebase,
     reference it here and only list the delta (project-specific overrides). -->

**Inherited conventions:** [e.g. "See `CLAUDE.md`" / "See `scripts/react-agent.mjs`" / "None — all rules listed below"]

**Project-specific rules:**

- [e.g. "`verbatimModuleSyntax` is on: use `import { type X }` for all type-only imports"]
- [e.g. "All icons: `strokeWidth={1.5}` to match the logo line weight"]
- [e.g. "No hardcoded color or font values outside the CSS theme variables"]
- [e.g. "Translation alias: always `const translations = fr.*` — never `const t`"]

**Known pitfalls:**

<!-- ROLE: Sharp edges that have caused bugs in this project.
     Prevents Claude from repeating the same mistakes across sessions.
     Add a row whenever a bug is traced to a platform or framework quirk. -->

| Pitfall                                                                  | Fix                                                                           |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| [e.g. "`height: 100%` inside an `aspect-ratio` container resolves to 0"] | [e.g. "Apply `bg-*` / `object-cover` directly on the `aspect-[x/y]` element"] |

---

## Delivery — Slices

<!-- ROLE: The project roadmap. Breaking work into slices keeps each session focused,
     prevents scope creep, and makes progress visible at a glance.
     Each slice must be independently shippable and reviewable bring user added value.

     STATUSES: Pending | In Progress | Done | Deferred | Reverted

     HOW TO USE:
     - Define all slices upfront, even if scope will be refined later
     - Work one slice at a time: plan → approve → build → commit → mark Done
     - Log refinements discovered during execution under Post-V1
     - Never start a slice without a plan that has been explicitly approved -->

### MVP

| #   | Slice                                                                                     | Status  |
| --- | ----------------------------------------------------------------------------------------- | ------- |
| 1   | [Smallest shippable increment — e.g. "Home: Hero + Services + Contact block (no images)"] | Pending |
| 2   | [Next increment]                                                                          | Pending |

### V1

| #   | Slice         | Status  |
| --- | ------------- | ------- |
| [#] | [Deliverable] | Pending |

### Post-V1

| Change                                               | Status  |
| ---------------------------------------------------- | ------- |
| [Refinement or addition discovered during execution] | Pending |

---

## Global Decisions

<!-- ROLE: Permanent log of architectural and product decisions, with their rationale.
     Prevents re-litigating the same choices in future sessions.
     Add a row each time a non-obvious decision is made —
     especially when an alternative was considered and rejected. -->

| Decision                                   | Detail                                                                                                 |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| [What was decided — e.g. "Email provider"] | [Why, and what was rejected — e.g. "Formspree: no backend needed; rejected Mailgun (requires server)"] |

---

## Working Process

<!-- ROLE: Sets expectations for how Claude and the developer collaborate.
     These rules govern every session and every slice.
     Adjust to match your preferred workflow. -->

- **Plan before coding:** For any non-trivial change, present a plan and wait for explicit approval before writing code.
- **One slice at a time:** Complete, commit, and update this spec before starting the next slice.
- **Commits:** Only when explicitly asked.
- **Spec hygiene:** After each slice, update the Delivery table status and log decisions made in Global Decisions.
- [Add your own rules]
