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
- **Always italicize Latin text and titles** (Steve's rule, July 5, 2026): encyclical/document titles (*Novo Millennio Ineunte*, *Lumen Gentium*…), Latin phrases (*Nemo dat quod non habet*, *munus sanctificandi*), Latin honors (*Pro Pontifice et Ecclesia*). Use `<em>`; skip attribute values and `<cite>` elements (already italic).
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

## About page edits from Steve's notes (July 4, 2026 — DONE)

Steve's emailed edits, implemented with Parker:

- **Flow strip moved.** The Consecration→Sanctification→Holiness→Mission `.flow-figure` left `about.html` for `holiness.html` §II (end of "What Holiness Is", before the examen); its link now targets `#journey-figure` in-page.
- **Planning wheel excised** from `about.html` per Steve ("don't go too far down the path of holiness planning on the About page"). "Holiness Planning in Brief" prose stays; `about.html#holiness-planning` anchor (linked from `holiness.html`) intact. The `.planning-*` CSS remains in `main.css` in case the wheel returns on a dedicated planning page; the markup is in git history.
- **"The Deficit Beneath the Activity"** replaced "The Hope Before Us" + arc strip + trailing paragraphs. Steve's prose nearly verbatim (he drafted it with ChatGPT as the "Visible Weakening" complement to the arc's "Hidden weakening"). New full chart `js/diagrams/deficit.js` (mount `deficit-chart-mount`, wired in `main.js`; `about.html` now also loads `css/diagrams.css`): navy Catholic-population line vs. the three grayscale indexed lines, light Sacred-Heart-red wash labeled as the spiritual deficit between them, same four markers as decline-mini. `POPULATION` (reported Catholic population totals per year, summed over reporting dioceses) added to the generated `decline-summary-data.js` — include it when regenerating from the workbook. Static indexed table incl. population as text alternative; Steve's png as noscript image. Buttons → `holiness.html` + `sacramental-data.html`. The arc strip stays with a new "Visible weakening 1960–2020" region (grid now 2fr 3fr 1fr); the out-of-chronology "2000 Jubilee bulge" region moved into adjacent prose → NOTE.
- **Range treatment → NOTE for client review.** Steve asked for "1920–2020" saying "2024 is unreliable due to Covid; 2025 useable", but the workbook years are 1921…2015, 2021 (the COVID year), 2025. Rendered as 1921–2025 with the 2021 point omitted, prose year references adjusted to match. Steve's graph arrived later and was verified: it plots the same workbook series with survey years shifted to round half-decades (1921→"1920" … 2021→"2020"), which explains his "1920–2020" phrasing. Its final "2020" point is actually the 2021 COVID data and it has no population line, contradicting his email ("Covid year unreliable, 2025 useable") and his prose (the population-vs-reception "widening space… is the most important feature"). Per Parker (July 4, 2026): kept 1921–2025-skip-2021 and the population line + deficit wash; NOTE in `about.html` explains both departures for Steve.
- **Full book bios** for Gajdosik and Zurlo swapped into the bio cards (kept collapsible, summary lines unchanged). "Pro Ponifice" typo rendered as "Pro Pontifice et Ecclesia" → NOTE (official name is "Pro Ecclesia et Pontifice").
- **In-browser design fixes** (checked live with Parker): `.decline-strip` columns rebalanced to `4fr 6fr 3fr` so "Conversion hope" no longer wraps (the wrap made the strip look clipped); the two section buttons moved out of the prose measure into a new `.btn-row` (flex, centered, wraps with a gap — the old inline pair stacked touching); the moved flow strip on `holiness.html` §II uses a new `.flow-figure.flow-column` modifier (vertical ↓ form at all widths — four boxes can't fit the essay column, and the wrapped form stranded "Mission" after a dangling arrow).

## Reception years and the 2020 cutoff (July 5, 2026 — DONE)

Steve clarified that the workbook's sheets are labeled by **submission year** — each reports the previous year's sacraments (the old "2016 sheet = 2015 data" anomaly was just this rule). Parker: end all graphs at 2020 until the final 2025 data arrives. This supersedes the July 4 range treatment (1921–2025-skip-2021).

- Generated data files (`decline-summary-data.js`, `decline-data.js`) now carry **reception years** (sheet year − 1): 1920…2015, 2020, 2024. Any regeneration from the workbook must reapply this shift.
- All three charts (`deficit.js`, `decline-mini.js`, `decline.js`) end at 2020 (`LAST_YEAR`): the 2024-receptions column (submitted 2025) stays in the data and the diocesan explorer but out of every chart; the 2026 "reported conversion increase" marker was dropped from charts (beyond the axis); x-domains are now 1918–2022. The 2020 endpoint (submitted 2021) is the COVID year — cautioned on the data page, included per Steve.
- Static alt tables and year references updated across about/holiness/sacramental-data; "Reading the Data" explains reception years, the 2020 COVID caution, and the 2024 exclusion.
- The about.html deficit-chart NOTE now covers only the one remaining departure from Steve's graph: the population line + deficit wash are kept (his prose requires them; his attached graph lacks them).

## Landing page revert (July 4, 2026 — DONE)

Steve's "Landing Page" email, superseding the design pass's "navigation everywhere" for `index.html` only:

- `index.html` is chromeless again (`data-nav="none"`) but keeps the full nav footer via `data-footer="full"` — `include.js` now injects a footer for `nav="none"` pages when `data-footer` is set. The footer motto is omitted there (same rule as threshold pages: the landing closes with "Remain in my love" in its own content).
- Footer "Begin" column: the laity threshold link is labeled "For Laity" (was "Start Here"); "Start Here" appears nowhere in the footer — per Parker, Steve reserves that label for the landing page itself. Index's noscript nav updated to match. The landing's laity *door* still reads "Start Here" → `begin-laity.html` — flagged as a NOTE for client review in `index.html`.

## Outstanding items

- Resolve the `NOTE for client review` comments (laity threshold kicker, `how-you-see-god` Continue target, Eudes/Caussade question in `retreats.html`, nav placement + data-source attribution in `sacramental-data.html`, drafted prompts/rows/lenses in `holiness.html` + `path-data.js`, deficit-chart population-line departure + Jubilee strip region + medal name in `about.html`, "Start Here" door label on `index.html`)
- Steve to review the causality page's four-causes section (closely paraphrases his book) and confirm the *Leadership Illusion* pointer should live there until a dedicated essay page exists
- Pages with "Draft for review" bands await Steve's review
- README TODO: set absolute `og:image` URLs after deploy (may be done — check `git log`; last commit set OG meta)
