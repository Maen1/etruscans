<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Agent Instructions: Etruscans in the Archive Database

This file defines the strict architectural boundaries, data models, coding conventions, and security guardrails for AI coding agents (Antigravity, Cursor, Windsurf, Claude Code, Copilot) working in this repository.

---

## 1. System Overview & Tech Stack

- **Project:** "Etruscans in the Archive" (Digitised epigraphic collections of Olof August Danielsson)[cite: 2]
- **Goal:** A searchable and browsable public database (~5,500 inscriptions) linking epigraphic metadata to Alvin digital repository records[cite: 2].
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (Strict mode enabled)
- **Styling:** Tailwind CSS v4
- **Database:** MongoDB via Mongoose (`inscriptions` collection)
- **Primitives:** Radix / Shadcn UI (`@/components/ui`)
- **Validation:** Zod

---

## 2. Directory Structure & Boundaries

```text
src/
├── app/                    # THIN ROUTING LAYER ONLY (Max 30 lines per page)
│   ├── (public)/           # Public views (with persistent top search bar)[cite: 2]
│   │   ├── page.tsx        # Homepage
│   │   ├── search/         # Global search results page
│   │   ├── browse/[corpus]/# Corpus browsing (CIE, ET, CIL, etc.)[cite: 2]
│   │   ├── text/[id]/      # Individual inscription detail & disambiguation[cite: 2]
│   │   ├── unidentified/   # Unidentified inscriptions list[cite: 2]
│   │   └── about/
│   │       ├── page.tsx    # Project background[cite: 2]
│   │       └── corpora/    # Corpus documentation & anchor links[cite: 2]
│   ├── (admin)/            # PROTECTED PI DASHBOARD
│   │   └── admin/
│   │       ├── page.tsx    # Records data table (Search, Edit, Delete)
│   │       ├── new/        # Add new inscription form
│   │       ├── edit/[id]/  # Edit existing inscription form
│   │       └── import/     # Batch CSV spreadsheet re-import[cite: 1]
│   ├── layout.tsx          # Root layout
│   └── api/                # Webhooks / Public APIs ONLY
│
├── features/               # DOMAIN BUSINESS LOGIC (90% of code lives here)
│   ├── inscriptions/       # Public display, detail views, & Alvin link formatting[cite: 2]
│   │   ├── components/
│   │   ├── actions.ts
│   │   ├── schema.ts       # Mongoose models & base Zod schemas
│   │   └── types.ts
│   ├── search/             # Global search filters & indexing
│   ├── browse/             # Corpus index generation[cite: 2]
│   └── admin/              # PI Dashboard logic, forms, CSV importer
│       ├── components/     # DynamicRefInputs, InscriptionForm, RecordsTable
│       ├── actions.ts      # Protected mutation Server Actions
│       └── schema.ts       # Admin form validation schemas
│
├── components/
│   └── ui/                 # SHARED UNTOUCHABLE PRIMITIVES (Shadcn/Tailwind)
└── lib/                    # Infrastructure (MongoDB connection singleton, auth)

```

---

## 3. Data Schema & MongoDB / Mongoose Rules

### A. Dynamic Reference Column Model

Reference columns in source spreadsheets (Cols M–HH) are dynamic `[Link Text, URI]` pairs. **DO NOT** hardcode individual database columns for references. Store them as an array of objects inside the Mongoose document:

```typescript
// Mongoose / TypeScript Document Structure
{
  tmId: string,                  // Universal Identifier (e.g., "509373")[cite: 1]
  tmUrl: string,                 // [https://www.trismegistos.org/text/509373](https://www.trismegistos.org/text/509373)[cite: 1]
  metadata: {
    objectType: string,          // Epigraphic support (e.g., "Cippus", "Funerary tile")[cite: 1, 2]
    language: string,            // Language (e.g., "Etruscan", "Latin")[cite: 1, 2]
    isForgery: boolean           // Forgery status flag[cite: 2]
  },
  corpora: [                     // Browsable editions (Cols B-J)[cite: 1]
    { name: "CIE", identifier: "886" },[cite: 2]
    { name: "ET", identifier: "CI 8.5" }[cite: 2]
  ],
  references: [                  // Flexible paired references (Cols M-HH)[cite: 1]
    {
      category: "Squeezes",      // Mapped category string[cite: 1]
      label: "UUB 591",          // Link text[cite: 1, 2]
      uri: "http://..."          // Alvin URI[cite: 1, 2]
    }
  ]
}

```

### B. Mapped Reference Categories

Always map reference column ranges strictly to these exact category names:

* `Squeezes` (Cols M–BF)


* `Rubbings` (Cols BG–BP)


* `Tracings` (Cols BQ–CD)


* `Plaster Casts` (Cols CE–CJ)


* `Drawings/Paintings` (Cols CK–CU)


* `Photographs` (Cols CW–DF)


* `Autopsy Notes` (Cols DG–DZ)


* `Notes (Non-Autopsy)` (Cols EA–EH)


* `Notes & Discussion` (Cols EI–FJ)


* `Manuscripts` (Cols FK–FX)


* `Proofs` (Cols FY–GZ)


* `Mentions` (Cols HA–HH)



### C. Mongoose Indexing Requirement

Ensure the Mongoose setup creates multikey indexes on:

1. `tmId` (Unique index)
2. `corpora.name` + `corpora.identifier` (Compound index for browsing)
3. `references.label` (Text search index)

---

## 4. Next.js 16 & Server Action Rules

1. **Thin Route Pages:** Files inside `src/app/` (`page.tsx`, `layout.tsx`) must be under 30 lines. They exist only to handle route params and render container components from `src/features/`.
2. **Server Components by Default:** Treat all components in `src/features/` as React Server Components (RSC). Only add `'use client'` to leaf components handling active UI state or user input.
3. **Data Fetching:** Fetch data directly in RSCs using lean Mongoose queries (`.lean()`).
4. **Server Actions for Mutations:** Put all mutations in `actions.ts` within the respective feature directory. Mark them with `'use server'` and validate all inputs with Zod schemas.
5. **Primitive Guardrail:** **DO NOT EDIT** files in `src/components/ui/`. Wrap them inside feature components if customization is required.

---

## 5. UI, Search & Accessibility (WCAG) Directives

1. **Persistent Search Bar:** The global search bar MUST remain visible across all public routes in the main layout header at all times.


2. **Alvin Link Rendering:** Format all external reference URIs as HTML anchor tags using the provided label: `<a href="{uri}" target="_blank" rel="noopener noreferrer">{label}</a>`.


3. **Disambiguation UI:** When a single edition reference (e.g., CIE 131) maps to multiple TM/ET inscriptions, render a Disambiguation View listing the distinct sub-entries.


4. **Strict Accessibility Constraints:**
* **No Color-Only Information:** Never rely solely on color to distinguish entries or forgery statuses.


* **Browser Zoom Support:** Layouts must remain fully functional and scannable when zoomed up to 200%.


* **Legibility:** Use clean, accessible sans-serif fonts with high contrast ratios.





---

## 6. PI Admin Dashboard Guardrails

1. **Route Authentication:** All routes under `src/app/(admin)/` must check for an active admin session in `src/app/(admin)/layout.tsx`.
2. **Action Authorization:** Every Server Action in `src/features/admin/actions.ts` MUST verify admin permissions before performing database writes/updates.
3. **Dynamic Form Fields:** Admin forms for inscriptions must use dynamic field arrays (e.g., React Hook Form `useFieldArray`) so the PI can add or remove an arbitrary number of `[category, label, uri]` reference pairs.


4. **Batch Re-Import:** The `/admin/import` route must support parsing uploaded CSV spreadsheet files and bulk-upserting records based on `tmId`.



---

## 7. Verification Protocol

Before marking any task as complete or submitting pull requests, run and verify:

1. **Type Check:** `npm run typecheck`
2. **Linting:** `npm run lint`
3. **Tests:** `npm run test`

---
## 8. Skill Execution Guidelines

- **Simple Tasks (Explanations, Minor Tweaks, Refactors < 10 lines):** Answer directly and concisely while adhering to project structure rules.
- **Complex Tasks (New Features, Schema Changes, Bug Fixes):** Automatically invoke `superpowers` skills:
  1. Draft a quick spec/plan before writing code.
  2. Follow TDD (write failing tests first where applicable).
  3. Verify with `npm run typecheck` and `npm run test` before finishing.
