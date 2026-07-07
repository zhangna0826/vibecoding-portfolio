# DESIGN.md

Practical implementation guide for AI-generated UI. Every screen and component MUST follow this document. Token names are the source of truth — never hardcode a raw value when a token exists. When a rule says MUST, treat it as non-negotiable for generation.

---

## Brand Personality

Bold, contemporary, creative-professional — a modern design/branding studio.

- **Expressive but ordered:** high-saturation color and heavy display type, kept legible by generous whitespace and strict structure.
- **Confident, not loud:** color carries the layout; effects stay minimal.
- **Trustworthy for client-facing work:** trend-aware, but clean enough for proposals.

Keywords: saturated, geometric, rounded, spacious, high-contrast, playful-but-structured.

---

## Design Principles

1. **Build on a two-anchor complementary field.** Every screen background is orange (`bg.warm`), blue (`bg.cool`), or off-white (`bg.surface`). Color carries layout; primaries are never reduced to small accents. Magenta/violet are imagery-only.
2. **Set hierarchy with weight and scale from one typeface.** Black-weight display headings, bold accent subheads, regular charcoal body. No second font; never use color to signal hierarchy where weight/size already can.
3. **Compose as a split color/content grid.** Two-part split (color field + off-white panel) or a color field with one inset card. 2–4 content blocks per screen, left-aligned within panels.
4. **Round every container to a fixed radius scale.** `radius.md`/`radius.lg` for cards, frames, inputs; `radius.full` for badges/chips. Only full-bleed background fields meet screen edges sharply.
5. **Convey depth with one soft shadow.** A single low-opacity, no-offset shadow. Never stack shadows or use borders for depth.
6. **Frame imagery in rounded containers and grade to palette.** Real photos + glossy gradient 3D abstracts, both on-palette. No raw, clashing stock.
7. **Protect whitespace as structure.** Low-to-moderate density. Split content across blocks/screens rather than shrinking spacing or type below the scale.
8. **Guarantee contrast via the field mapping.** Text and interactive colors are chosen from the "Color usage by background" table below — never by eye. Never put body text on a busy render; move it onto a surface first.

---

## Color Tokens

### Base palette
| Token | Value | Role |
|---|---|---|
| `color.bg.warm` | `#F49B52` | Orange background field |
| `color.bg.warm.strong` | `#E08A45` | Orange pressed/darker field |
| `color.bg.cool` | `#2F6FBD` | Blue background field |
| `color.bg.cool.strong` | `#285F9E` | Blue pressed/darker |
| `color.bg.surface` | `#F7F7F5` | Cards, panels, content areas |
| `color.bg.surface.raised` | `#FFFFFF` | Nested surface (input on card) |
| `color.text.primary` | `#2A2A2A` | Body + headings on surface |
| `color.text.secondary` | `#5C5C5C` | Captions, inactive labels |
| `color.text.onColor` | `#FFFFFF` | Text on orange/blue fields |
| `color.border.subtle` | `#ECECEA` | Dividers, input borders |
| `color.border.strong` | `#2A2A2A` | High-emphasis outline |

### Status (semantic)
| Token | Value | Use |
|---|---|---|
| `color.status.error` | `#D64545` | Errors, destructive |
| `color.status.success` | `#3E9C6B` | Success, confirmations |
| `color.status.warning` | `#E0A020` | Warnings |
| `color.status.info` | `#2F6FBD` | Informational (reuses blue) |

### Interaction & utility
| Token | Value | Use |
|---|---|---|
| `color.action.primary` | `#2F6FBD` | Primary action fill (blue) |
| `color.action.primary.hover` | `#3E7BC4` | Primary hover |
| `color.action.primary.pressed` | `#285F9E` | Primary pressed |
| `color.action.accent` | `#F49B52` | Accent action fill (orange) |
| `color.action.accent.hover` | `#F5A25D` | Accent hover |
| `color.action.accent.pressed` | `#E08A45` | Accent pressed |
| `color.focus.ring` | `#2F6FBD` | Focus outline (see field rule) |
| `color.overlay.scrim` | `rgba(42,42,42,0.40)` | Modal/scrim backdrop |
| `color.state.disabled.bg` | `#ECECEA` | Disabled fill |
| `color.state.disabled.text` | `#9A9A98` | Disabled text |

> **Key decision — primary action is BLUE, not orange.** Orange is the dominant background field, so a primary action must contrast against it. Orange (`color.action.accent`) is used for subheads, active indicators, and primary actions *only on surface or blue backgrounds*. See the mapping table.

### Imagery-only (never in UI chrome: buttons, text, borders, indicators)
`color.accent.magenta #E0459B` · `color.accent.violet #8C6FD6`

### Color usage by background (MUST follow)
| Background | Body/heading text | Secondary text | Primary action | Accent/active | Focus ring |
|---|---|---|---|---|---|
| `bg.surface` (off-white) | `text.primary` | `text.secondary` | `action.primary` (blue) | `action.accent` (orange) | `focus.ring` (blue) |
| `bg.cool` (blue) | `text.onColor` | `text.onColor` @ 80% | `action.accent` (orange) | `text.onColor` | `text.onColor` |
| `bg.warm` (orange) | `text.primary` or `onColor`* | `text.primary` @ 70% | `action.primary` (blue) | `text.primary` | `bg.cool.strong` |

\* On orange, prefer `text.primary` (charcoal) for long text; use `onColor` (white) only for large display headings. Never place primary orange actions or orange accent text on an orange field.

---

## Typography

**Family:** `font.family.base = "Poppins", "Montserrat", system-ui, sans-serif` (single geometric sans).
**Weights:** regular `400`, medium `500`, bold `700`, black `800`.

| Role | Size (desktop) | Size (≤640px) | Line height | Weight | Case | Tracking |
|---|---|---|---|---|---|---|
| `type.display` | 56px | 36px | 1.05 | 800 | UPPERCASE | -0.02em |
| `type.h1` | 40px | 30px | 1.10 | 800 | Sentence | -0.01em |
| `type.h2` | 28px | 24px | 1.20 | 700 | Sentence | -0.01em |
| `type.subhead` | 18px | 17px | 1.30 | 700 | Sentence | 0 |
| `type.body` | 16px | 16px | 1.60 | 400 | Sentence | 0 |
| `type.label` | 14px | 14px | 1.40 | 700 | Sentence | 0 |
| `type.caption` | 13px | 13px | 1.40 | 400 | Sentence | 0 |

**Usage rules (MUST):**
- **`display`** = hero/marketing moments only (one per screen, uppercase). **`h1`** = standard screen title (sentence case). Never use two `display` or two `h1` on one screen.
- `subhead` color = `action.accent` on surface; `text.onColor` on color fields.
- `label` is weight **700** (buttons, nav, tabs, input labels) — this is the single label weight; do not use `500` for labels.
- Hierarchy comes from weight + size only. Body measure MUST be capped at **66ch** for readability.

---

## Spacing & Layout

Base unit `4px`. Density is low-to-moderate; favor upper steps for padding/gaps.

`space.1 4` · `space.2 8` · `space.3 12` · `space.4 16` · `space.5 24` · `space.6 32` · `space.7 48` · `space.8 64` · `space.9 96`

**Standard applications (MUST):**
- Screen outer margin: `space.7` desktop, `space.5` mobile.
- Card inner padding: `space.5`.
- Block gap (within a panel): `space.6`.
- Section gap: `space.7`.
- Hero breathing room / panel margins: `space.8`–`space.9`.
- Icon-to-label gap: `space.2`.
- Adjacent buttons gap: `space.3`.
- Label-to-field gap: `space.2`; field-to-field gap: `space.5`.

**Grid & layout behavior (MUST):**
- Layout grid: **12 columns**, gutter `space.6`, max content width **1200px**, centered.
- **Split layout ratio:** color field to content panel is **40 / 60** (content gets the larger share). Never below 30/70 or above 50/50.
- **Responsive:** at ≤`768px`, the split **stacks vertically** — color field on top (max 40vh), content below. Multi-column card grids collapse to one column at ≤`768px`.
- Breakpoints: `sm 640px` · `md 768px` · `lg 1024px` · `xl 1280px`.
- Alignment: content is left-aligned within panels. A screen/step indicator, when present, is pinned bottom-right at `space.5` inset (optional; presentation contexts only).

**Z-index scale (MUST):**
`z.base 0` · `z.raised 10` (cards on hover) · `z.sticky 100` (nav) · `z.dropdown 200` · `z.overlay 900` (scrim) · `z.modal 1000` · `z.toast 1100`.

---

## Radius

`radius.sm 8px` (badges-as-pills, small chips) · `radius.md 16px` (buttons, inputs, image frames, default card) · `radius.lg 24px` (large panels, hero cards, modals) · `radius.full 9999px` (circular badges, avatars, icon buttons).

Never introduce sharp corners into UI; only full-bleed background fields meet the screen edge.

---

## Borders

Borders are thin and used for definition/dividers only — never for depth.

- `border.width.hair 1px` · `border.width.focus 2px`
- `border.hair` = `1px solid color.border.subtle` (dividers, resting input/secondary-button outline)
- `border.strong` = `1px solid color.border.strong` (rare high-emphasis outline)
- `border.focus` = `2px solid color.focus.ring` (see field mapping for ring color)

Depth comes from shadow + color-field layering, not borders.

---

## Shadows

Single soft, no-offset elevation — never stacked.

- `shadow.card` = `0 8px 24px rgba(42,42,42,0.10)` — resting elevation (cards)
- `shadow.raised` = `0 12px 40px rgba(42,42,42,0.14)` — hover, modals, popovers

Only these two. Do not invent intermediate shadows or add a second layer.

---

## Components

All components inherit tokens above. Every interactive component MUST define all six states: **default, hover, pressed/active, focus, disabled, loading** (where applicable). Focus is always `border.focus` per the field mapping.

### Buttons
- **Purpose:** trigger actions; move users through flows.
- **Sizing:** fixed heights — `sm 32px`, `md 40px` (default), `lg 48px`. Horizontal padding `space.5`; label `type.label` (700).
- **Variants:**
  - *Primary:* `action.primary` fill, `text.onColor` label, `radius.md`, no border. (On blue fields, use `action.accent` fill per mapping.)
  - *Secondary:* `bg.surface` fill, `text.primary` label, `border.hair`.
  - *Ghost:* transparent fill, `action.primary` label, no border.
  - *Destructive:* `status.error` fill, `text.onColor` label.
- **States:** hover = `*.hover` fill + `shadow.card`; pressed = `*.pressed` fill, no shadow; focus = `border.focus` offset 2px; disabled = `state.disabled.bg` + `state.disabled.text`, no shadow; loading = inline spinner replaces label, width locked, button disabled.
- **Rules:** exactly one primary per view/section. Never use imagery accents. One casing per button group.

### Inputs (text, textarea, select)
- **Purpose:** collect text/numeric/selection data.
- **Style:** `bg.surface.raised` fill, `border.hair`, `radius.md`, height `40px` (textarea min `96px`), `type.body` in `text.primary`; placeholder in `text.secondary`. Label above (`type.label`), helper below (`type.caption`). Inner padding `space.3`.
- **States:** default (`border.subtle`); hover (`border.strong` @ 40%); focus (`border.focus` + `shadow.card`); filled (`text.primary`); error (`status.error` border + helper text + inline icon); disabled (`state.disabled.bg`, `state.disabled.text`); read-only (surface, no border).
- **Selection controls:** checkbox/radio use `radius.sm`/`radius.full`, `action.primary` when checked, `border.hair` when unchecked; same focus + disabled rules.
- **Rules:** always a persistent visible label (no placeholder-only). Errors MUST include text, never color alone. Match height/radius across a form row.

### Cards
- **Purpose:** primary content container grouping related content.
- **Style:** `bg.surface` fill, `radius.lg`, `shadow.card`, no border. Padding `space.5`; grid gap `space.6`. Title `type.h2`, subhead `type.subhead`, body `type.body`; title-to-body gap `space.4`. Optional image header in `radius.md` frame.
- **States:** *static* (no hover change) vs *interactive* (hover = `shadow.raised` + `translateY(-2px)`, `motion.base`; focus = `border.focus`; selected = `border.focus` persistent; loading = skeleton blocks at `radius.sm`).
- **Rules:** one shadow only. Left-aligned. Split into multiple cards rather than overcrowd.

### Navigation
- **Purpose:** top-level movement between major sections; orientation.
- **Style:** top bar or side rail on `bg.surface` or `bg.cool`, `z.sticky`. Brand left; items `type.label`. Active = accent label + 2–3px indicator bar; inactive = `text.secondary` (or `text.onColor` @ 80% on color fields). Item gap `space.6`; bar padding `space.5`.
- **States:** default, hover (`text.primary`/`onColor`), active (accent + indicator), focus (ring), disabled (40%).
- **Responsive:** ≤`768px` collapses to a hamburger menu; drawer uses `z.modal` + scrim.
- **Rules:** exactly one active item, marked by color **and** indicator. Persistent order across screens.

### Tabs
- **Purpose:** switch between peer views in place (never page navigation).
- **Style:** horizontal row, `type.label`. Active = `text.primary` label + `action.accent` underline (2–3px); or `radius.full` surface pill on color fields. Inactive = `text.secondary`. Label gap `space.5`; vertical padding `space.3`; content panel below at `space.6`.
- **States:** default, hover (label → primary), active (underline/pill), focus (ring), disabled (40%).
- **Rules:** 2–5 tabs; overflow → menu. Underline color is always `action.accent`, never an imagery accent.

### Badges
- **Purpose:** label status, category, count, or ordered step.
- **Style:** *numbered/step* = `radius.full` circle, `action.accent` fill, `text.onColor`, `type.label`. *Status* = `radius.sm` pill, padding `space.1`/`space.3`, `type.caption` (700); status variants use `status.*` at ~15% tint fill with matching text; neutral uses `border.subtle` fill + `text.primary`.
- **States:** static by default; interactive (filter) badges add hover + selected (filled) + focus.
- **Rules:** 1–2 words or a number. Circular badges always `radius.full`; never share card radius.

### Modals
- **Purpose:** focus the user on a single interrupting decision/task.
- **Style:** centered `bg.surface` card, `radius.lg`, `shadow.raised`, `z.modal`; scrim `color.overlay.scrim` at `z.overlay`. Sizes: `sm 400px`, `md 520px` (default), `lg 720px`; max-height `90vh` with body scroll. Padding `space.6`; title `type.h2`; title-to-body `space.5`; actions bottom-right, gap `space.3`.
- **States:** opening (fade + scale from 0.98, `motion.slow`, `easing.standard`), open (focus trapped), closing (reverse).
- **Rules:** one primary action; secondary is ghost/secondary. Dismiss via close icon, scrim click, Esc. Never nest modals. Restore focus to the trigger on close.

### Empty states
- **Purpose:** guide the user when there is no content; offer the next action.
- **Style:** centered block on `bg.surface`: palette-graded rounded 3D/illustration graphic + `type.h2` headline + `type.body` line + one primary button. Vertical padding `space.7`; gaps `space.4`.
- **Variants:** first-use (encouraging + primary CTA); no-results (offers "clear filters"); error (neutral tone, `status.error` icon, retry action).
- **Rules:** always include a next action (never a dead end). Copy is specific/instructive. Text never sits on a busy render — keep it on surface.

---

## Motion

Restrained and uniform.

- Durations: `motion.fast 120ms` · `motion.base 200ms` · `motion.slow 320ms`
- Easing: `easing.standard cubic-bezier(0.2,0,0,1)` (enter/move) · `easing.emphasis cubic-bezier(0.3,0,0,1)` (hover/press) · `easing.exit cubic-bezier(0.4,0,1,1)`
- Default transition: `all motion.base easing.standard`.
- Component defaults: hover/press/focus = `motion.base`; modal open/close = `motion.slow` (fade + scale 0.98→1); toast = `motion.base`.
- Property scope: animate `opacity`, `transform`, `background-color`, `box-shadow` only — never layout (width/height/top/left).

Use `motion.base` + `easing.standard` for state changes everywhere unless specified.

---

## Accessibility

- **Contrast:** meet WCAG AA (4.5:1 body, 3:1 large text and UI borders). Use only pairings in the "Color usage by background" table. Never place body text on busy imagery.
- **Focus:** every interactive element shows `border.focus` (2px), offset 2px, using the field mapping's ring color.
- **Color independence:** status/errors always include text and/or an icon — never color alone.
- **Labels:** all inputs have persistent visible labels; icon-only buttons have `aria-label`.
- **Targets:** minimum interactive size 44×44px (pad the `sm` button/icon targets accordingly).
- **Motion:** honor `prefers-reduced-motion` — reduce transforms to opacity-only or none.
- **Semantics:** correct roles/landmarks; one active nav item; tabs use tablist/tab/tabpanel; modals trap focus and restore it on close.

---

## Do / Don't

**Do**
- Use saturated orange/blue as full background fields; pick text/action colors from the field mapping table.
- Make the primary action blue on orange/surface, and orange on blue.
- Keep one geometric sans; drive hierarchy with weight + size; label weight is 700.
- Round cards/inputs (`radius.md`/`lg`) and circular badges (`radius.full`).
- Use exactly one soft shadow (`shadow.card` resting / `shadow.raised` hover-overlay).
- Grade all imagery to the palette; frame in rounded containers.
- Left-align content; keep 2–4 blocks; use the 40/60 split; cap body at 66ch.
- Define all six states on every interactive component; always show focus rings.
- One primary action per view/modal.

**Don't**
- Use magenta/violet for buttons, text, borders, or indicators.
- Place an orange primary action or orange accent text on an orange field.
- Add a second typeface, or use color where weight/size signals hierarchy.
- Stack shadows or use borders for depth.
- Mix sharp corners into UI chrome.
- Place body text directly on 3D renders/busy imagery.
- Overcrowd a screen — split into blocks/screens instead.
- Ship placeholder-only inputs or color-only error states.
- Nest modals or animate layout properties.

---

## Project Case Study Pages

Case-study pages document individual portfolio projects (e.g. `PulseFit/index.html`). They inherit portfolio nav/footer and tokens, but use a dedicated long-form layout. **Reference:** `PulseFit/index.html`.

### File & asset structure (MUST)

```
{ProjectName}/
├── index.html          # case-study page
├── content.md          # source copy (frontmatter + sections)
└── assets/             # ALL project media lives here
    ├── cover_{slug}.png
    ├── mockup_hero_{slug}.png
    ├── sketch1_{slug}.png
    ├── sketch2_{slug}.png
    ├── moodboard.png
    ├── Web structure.png
    └── screenshot1_{slug}.png … screenshot6_{slug}.png
```

- Home project card cover: `{ProjectName}/assets/cover_{slug}.png`
- URL-encode spaces in filenames (e.g. `Web%20structure.png`)
- Gallery uses **screenshots only** — never repeat cover or hero mockup

### Page structure (MUST)

Top-to-bottom order:

1. **Back link** — `← Back to projects` above title (`.pulsefit-case__back`)
2. **Page header** — `type-h1` title, `type-subhead` tagline, 3-column meta row (Role / Timeline / Tools), primary **View live app →** CTA
3. **Hero image** — full-width mockup in `.pulsefit-case__hero-figure` (`radius.lg`, `shadow.card`)
4. **Content cards** — stacked `.card` sections inside `.project-content__grid`, gap `space.6`:
   - Overview (eyebrow + lead)
   - Challenge, Solution, Process (+ stepper), Outcomes
   - Optional: Sketching, Information architecture, Visual development, Style guide, Gallery, Deployment
5. **Project nav** — `.pulsefit-project-nav` footer links

Body class: `project-page pulsefit-case`. One `h1` per page.

### Meta row

| Column | Label style | Value style |
|--------|-------------|-------------|
| Role | `.pulsefit-meta__label` — uppercase, `text.secondary` | `.pulsefit-meta__value` — bold, `text.primary` |
| Timeline | same | `{year} · {category}` |
| Tools | same | comma-separated stack |

Grid: 3 equal columns desktop; single column at ≤768px.

### Process stepper

Horizontal `.pulsefit-stepper` with 4 numbered circles connected by a line. Default steps: Design System → User Flows → Component Build → Data Layer. Final step gets `.pulsefit-stepper__step--active` (charcoal marker). Process body copy follows below.

### Gallery

`.pulsefit-gallery.pulsefit-gallery--screenshots` — 2-column grid of phone screenshots; each item is `.pulsefit-case__figure` with `type-caption` figcaption. Max screenshot width 390px, centered.

### Style guide card (optional)

When the documented project has its own design system, show tokens inside `.pulsefit-style-guide__panel` (dark inset). **Project tokens only** — never replace portfolio tokens on the page chrome.

### External links (MUST)

- `liveUrl` from `content.md` → header CTA, deployment section, home card **Live app →**
- All external links: `target="_blank" rel="noopener noreferrer"`

### Home project card (MUST)

Prepend to `.projects__grid`. Include:

- Cover image from `assets/cover_{slug}.png`
- **View case study →** linking to `{ProjectName}/index.html`
- **Live app →** when `liveUrl` is set
- Wrap links in `.project-card__links`

### Case-study CSS

Shared styles in `styles.css` under `/* PulseFit case study */`. Class prefix `pulsefit-*` is used for all case-study pages. Do not modify portfolio color tokens when extending case-study styles.

### content.md frontmatter

```yaml
title, category, year, subhead, cardDescription, coverAlt
liveUrl, repoUrl          # optional URLs
role, tools, processSteps # optional overrides
```

Sections: Overview, Challenge, Solution, Process, Outcomes (required); Sketching, Information architecture, Visual development, Style guide, Gallery, Deployment (optional).
