# CLAUDE.md — The Holiness Institute Website

## What this is

Static website for The Holiness Institute ("Called to the Fullness of Love"), founded by Steve Gajdosik. Pure HTML/CSS/JS — no build step, no framework, no dependencies. Deployed via GitHub Pages from `main`, root folder. Steve is the client; content originates from his documents in `client-documents/`.

## Working with this project

- **No build step.** Edit HTML/CSS/JS directly; test with `python3 -m http.server 8000`.
- **Shared nav/header/footer** is injected by `js/include.js`. Edit chrome there, never per-page.
- **Diagram content** lives in `js/diagrams/*-data.js` (data) separate from rendering (`path.js`, `substitutes.js`, `causality.js`). Change text in the data files.
- **Relative paths only** — the site must work at both `username.github.io/repo/` and a custom domain.
- **Accessibility is a hard requirement:** every diagram keyboard-operable with a text alternative, animation respects `prefers-reduced-motion`, site fully readable without JS.
- **Fonts are self-hosted** (Cormorant Garamond, EB Garamond) in `assets/fonts/`.
- **Voice:** the site's prose is drawn from Steve's writing — measured, theological, literary. Match it; don't paraphrase into marketing copy. Pages drafted from his notes carry a "Draft for review" band. Open questions for Steve are marked `NOTE for client review` in HTML comments (currently in `begin-laity.html`, `how-you-see-god.html`, `retreats.html`).
- `client-documents/` is **gitignored** — source material, never published.

## Site map

| Page | Role |
|---|---|
| `index.html` | Landing: scripture, six questions, three doors (laity / priests / bishops) |
| `begin-laity/priests/bishops.html` | "Before You Go Further" threshold pages per audience |
| `laity.html`, `priests.html`, `bishops.html` | Audience hubs with suggested reading paths |
| `how-you-see-god.html` | Foundational page |
| `about.html`, `holiness.html`, `fatherhood.html`, `holiness-guide.html`, `path-to-renewal.html`, `retreats.html`, `causality.html` | Main content pages; `holiness` has three interactive diagrams, `causality` has the inversion diagram |
| `sacramental-data.html` | The data page: indexed per-capita chart (1921–2025), interpretive essay, searchable per-diocese explorer, methodology notes. Chart/explorer render from `js/diagrams/decline-data.js` (generated — see below) via `js/diagrams/decline.js` |
| `404.html` | Not found |

## client-documents/ — source material from Steve

### Original batch (June 2025 — already reflected in the site)

- `Outline.docx` — Steve's site outline; the current structure follows it
- `Fatherhood.docx` / `Fatherhood.txt` → `fatherhood.html`
- `Holiness Page.docx` → `holiness.html`
- `PIU Full Map.png`, `Substitutes Image.png`, `Already But Not Yet.png` — diagram references
- `HI Logo transparent.png` → `assets/images/hi-logo.png`

### New batch (added July 2, 2026 — partially incorporated)

Updates sent by Steve Gajdosik. An essay series plus supporting material.

**Incorporated July 2, 2026:**

- `About Us.docx` → `about.html` rebuilt — but from a **newer version of the copy Steve sent by email** (adds "What the Institute Offers", "Holiness Planning in Brief", "The Hope Before Us", bios), plus six interactive elements he approved: John Paul's Rule callout, expandable principle cards, Consecration→Mission flow strip, Holiness Planning wheel (7 S's around the Superordinate Goal; diagnostic question wording is drafted — see NOTE for client review), sacramental-decline timeline strip (its button points at `causality.html` until a data page exists), collapsible bios. All expandable elements use native `<details>` (no JS needed).
- `retreat-page.txt` → `retreats.html` rebuilt as **"Abba"**, thirty-three days — resolves the old retreat-naming NOTE. The former page's Eudes/Caussade material was dropped; a NOTE in the page asks Steve whether to keep it anywhere. Hub path-cards on `laity/priests/bishops.html` updated to match.
- `Interpreting__Sacramental_Decline.docx` + `Sacramental Data w updated 21-41.xlsx` + `sacramental_decline_normalized.png` → **`sacramental-data.html`** (new page). The essay text is used nearly verbatim. `js/diagrams/decline-data.js` is **generated from the xlsx** (national per-1,000 rates + all per-diocese rows; regenerate from the workbook rather than hand-editing — the header names vary per sheet and are mapped in the generation script). Steve's png is kept at `assets/images/sacramental-decline-normalized.png` as the no-JS fallback. Independently verified: the computed indexed series reproduces Steve's png. About-page decline button now targets this page; `causality.html` links to it. Data cautions (coverage growth 69→195 dioceses, blank-cell exclusion, 2016 sheet = 2015 data, 2021 = COVID) are documented on-page under "Reading the Data".

**Background context — NOT to become new pages (per Parker, July 2, 2026):**

The essay series is source material that informs the site's thinking and voice. Draw on it when writing or revising site content; do not publish it as pages unless Steve asks.

- `Before_the_Visible_Crisis.docx` — first essay in the series: interior decline preceded the visible 1960s crisis (same thesis as `sacramental-data.html`)
- `Fathers_Not_Managers.docx` — second essay (references the first): priesthood, its inversion, the structure the Church has been given
- `The_Grace_We_No_Longer_Trust.docx` — "pseudo-modernism" in parish and home
- `The_Seminary_of_Love.docx` — the family as the first seminary (theme already present on `holiness.html` / `fatherhood.html`)
- `Put_out_into_the_deep.docx` — the bishop's charge for the holiness of priests and faithful (bishop-facing)
- `The_Leadership_Illusion_FrGiertych_bolded.docx` — long piece with its own table of contents: how "leadership" supplanted fatherhood (the inversion theme of `causality.html`; also named under "What the Institute Offers" on `about.html` as a publication of the Institute)

## Holiness page rework (from Steve's email, July 2, 2026 — DONE July 2, 2026)

Implemented per Steve's approved plan ("keep the form, add consequence"). Page order is now:
Christ Speaks First (I) → What Holiness Is (II) → Governing End (III) → **The Decline Beneath the Activity (IV, new)** → Why Holiness Is Replaced (V) → Belief→Self-Gift (VI) → Saints strip → Fatherhood bridge → Prayer/CTA. Section ids were kept stable (`#why-replaced`, `#belief-to-self-gift` are linked from other pages).

What was built, and where the content lives:

1. **"The Decline Beneath the Activity"** (`#decline-beneath-activity`): Steve's email prose verbatim, grayscale indexed chart rendered by `js/diagrams/decline-mini.js` from `js/diagrams/decline-summary-data.js` (a small generated file holding only the national series; `decline-data.js` re-exports it, so the data page is unchanged and the Holiness page doesn't load the 250KB diocesan rows). Markers 1962/1970/2000/2026. No-JS fallback: Steve's png + static indexed table. Button → `sacramental-data.html`.
2. **"Where Do I Stop?"** examination cards after the substitutes figure (static `<details>`, in `holiness.html` directly — not in `substitutes-data.js`, since it must work without JS). Doctrine/Liturgy/Managerialism prompts are Steve's wording; the other five are drafted → NOTE for client review.
3. **Rule of Reordering** (`#reordering-figure`): 7-row table (CSS-only accordion-cards on mobile via `data-label`). Doctrine/Liturgy/Planning rows are Steve's; other four drafted → NOTE. Doorway links to `causality.html` (retarget to the Leadership Illusion essay page when it exists → NOTE) and `about.html#holiness-planning`.
4. **Path of Holiness lenses**: `LENSES` + per-stage `lenses:{prayer,trust,pastoral}` added to `path-data.js` (all drafted → NOTE at top of that file); toggle UI in `path.js` (aria-pressed buttons, re-renders the panel). The static no-JS stage list in `holiness.html` carries the trust + pastoral lines too — keep it in sync with `path-data.js` when lens text changes.
5. **Fatherhood bridge** (`#fatherhood-bridge`): two `.flow-strip` rows + caption, before the prayer/CTA.
6. **Four examen callouts** (`.examen`): after What Holiness Is, after Governing End, after the decline chart, after Where Do I Stop. Questions are Steve's from the email.
7. **Saints strip** (`#saints-figure`): four cards linking to in-page anchors (no saint pages exist yet).

New CSS for all of this is at the bottom of `css/diagrams.css`.

## Design pass (July 2, 2026 — DONE)

A sitewide design session with Parker (Steve's requests folded in):

- **Navigation everywhere.** `index.html` now uses `data-nav="full"` (the chromeless landing was not intentional; Steve wants routing from the front page). Threshold pages (`how-you-see-god`, `begin-*`) keep the minimal header but carry the full nav footer via a new `data-footer="full"` body attribute (`include.js`); their footer omits the "Remain in my love" motto since those pages close with scripture of their own. Footer columns rebalanced (4/5/5, "How You See God" label) and centered as a content-sized group with left-aligned text.
- **Illuminated rhythm** (the balance of Steve's simplicity and his daughter's "illuminated manuscript" suggestion): `.drop-cap` (rubricated initial, Sacred-Heart red, section openers only — never on one-liners or quote-mark openers) and `.pull-quote` (gold ✦, navy Cormorant italic, verbatim lines from adjacent prose, always `aria-hidden="true"`). Applied across holiness, retreats, fatherhood, how-you-see-god, holiness-guide, path-to-renewal, causality.
- **Fixes:** decline-mini legend (`.sd-chart-wrap > svg` — the old descendant selector blew the legend swatches to full width); flow-strip arrows now trail each box and turn ↓ in a single column under 540px; Path of Holiness lens toggle now leads the stage panel with a highlighted `.path-lens-lead` block; scroll-reveal triggers earlier; stale "30 Day Retreats" references on `path-to-renewal.html` renamed to Abba.
- **Causality page deepened** (Steve asked for work here; drawn from `The_Leadership_Illusion_FrGiertych_bolded.docx` ch. 2 and `The_Grace_We_No_Longer_Trust.docx`): new "Four Causes of Sanctification" section, "Two Answers to the Same Four Questions" comparison table (reuses `.reorder-table`), a causal ledger under the toggle diagram showing the inversion at all four levels, "The home" example, examen, and a pointer to *The Leadership Illusion* (`about.html#offers`).

## Outstanding items

- Resolve the `NOTE for client review` comments (laity threshold kicker, `how-you-see-god` Continue target, planning-wheel question wording in `about.html`, Eudes/Caussade question in `retreats.html`, nav placement + data-source attribution in `sacramental-data.html`, drafted prompts/rows/lenses in `holiness.html` + `path-data.js`)
- Steve to review the causality page's four-causes section (closely paraphrases his book) and confirm the *Leadership Illusion* pointer should live there until a dedicated essay page exists
- Pages with "Draft for review" bands await Steve's review
- README TODO: set absolute `og:image` URLs after deploy (may be done — check `git log`; last commit set OG meta)
