# CLAUDE.md — The Holiness Institute Website

## What this is

Static website for The Holiness Institute ("Called to the Fullness of Love"), founded by Steve Gajdosik. Pure HTML/CSS/JS — no build step, no framework, no dependencies. Deployed via GitHub Pages from `main`, root folder. Steve is the client; content originates from his documents in `client-documents/`.

## Working with this project

- **No build step.** Edit HTML/CSS/JS directly; test with `python3 -m http.server 8000`.
- **Shared nav/header/footer** is injected by `js/include.js`. Edit chrome there, never per-page.
- **Diagram content** lives in `js/diagrams/*-data.js` (data) separate from rendering (`path.js`, `substitutes.js`, `causality.js`, `saints.js`). Change text in the data files.
- **Relative paths only** — the site must work at both `username.github.io/repo/` and a custom domain.
- **Accessibility is a hard requirement:** every diagram keyboard-operable with a text alternative, animation respects `prefers-reduced-motion`, site fully readable without JS.
- **Fonts are self-hosted** (Cormorant Garamond, EB Garamond) in `assets/fonts/`.
- **Always italicize Latin text and titles** (Steve's rule, July 5, 2026): encyclical/document titles (*Novo Millennio Ineunte*, *Lumen Gentium*…), Latin phrases (*Nemo dat quod non habet*, *munus sanctificandi*), Latin honors (*Pro Pontifice et Ecclesia*). Use `<em>`; skip attribute values and `<cite>` elements (already italic).
- **Voice:** the site's prose is drawn from Steve's writing — measured, theological, literary. Match it; don't paraphrase into marketing copy. Open questions for Steve are marked `NOTE for client review` in HTML comments (grep for them; currently across `begin-laity`, `retreats`, `sacramental-data`, `holiness`, `about`, `index`, `saints`, `path-to-renewal`, `causality`, `fatherhood`, and `js/diagrams/substitutes-data.js`).
- `client-documents/` is **gitignored** — source material, never published.

## Site map

| Page | Role |
|---|---|
| `index.html` | Landing: scripture, six questions, three doors (laity / priests / bishops) |
| `begin-laity/priests/bishops.html` | "Before You Go Further" threshold pages per audience |
| `laity.html`, `priests.html`, `bishops.html` | Audience hubs with suggested reading paths |
| `how-you-see-god.html` | Foundational page |
| `saints.html` | "The Saints God Sends, and the God Who Comes" (July 6, 2026): Steve's essay nearly verbatim, in the reading path between `how-you-see-god` and `holiness` (nav label "Saints"). Interactive century frieze renders the essay's 33-row table from `js/diagrams/saints-data.js` via `saints.js`; full static table beneath as text version / no-JS fallback |
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

### The Saints God Sends (arrived July 6, 2026 — incorporated same day)

- `The_Saints_God_Sends_1.docx` → **`saints.html`** (see the July 6 section below). Unlike the essay series above, Steve asked for this one to enter the site as a page — "as governing witness rather than as a resource in a library," placed in the reading path, per the plan he worked out in conversation with Fable and forwarded with the file. The essay's five-column table is the source for `js/diagrams/saints-data.js`.

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

## Deficit section moved up on About (July 5, 2026 — DONE)

Steve asked for "The Deficit Beneath the Activity" to hit the reader early —
before "Our Theological Principles", or before "The Problem We Name" if that
read better. Placed before **Principles** (his first instinct): "The Problem
We Name" names the decline in words and ends "The Institute exists to keep
that question before the Church"; the deficit section then shows it in data,
and the Principles follow as the response. Before "The Problem We Name" it
would have made that section's opening ("weakening for roughly a century")
read as a repeat. The whole ensemble moved together: comment + NOTEs, prose,
chart figure, arc strip, conversion-hope prose, and the `.btn-row`. Page now
runs … Problem We Name → Deficit (chart/arc/buttons) → Principles → Offers →
Holiness Planning in Brief → Who We Are.

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

## Design & code review pass (July 5, 2026 — DONE)

Full visual + code review with Parker; all findings fixed the same day:

- **Skip link first again**: `include.js` injects the header *after* `.skip-link` (was `afterbegin`, which buried the link behind the nav in tab order).
- **Fleuron divider restored**: a stale second `.fleuron` block in `main.css` (display:block) was overriding the designed flex divider and killing its flanking gold rules — removed; dividers sitewide now render ✦ flanked by rules.
- **Latin fixes**: `fatherhood.html`'s "ipsus Christus" ×4 corrected to *ipse Christus*; italics added per Steve's rule to *alter Christus*, *ipse Christus*, *in persona Christi Capitis*, *Regula Pastoralis*, *munera* (fatherhood + holiness), Mary's *fiat*.
- **h1s**: landing title is now an `h1.landing-title` (CSS pins the body face so it renders unchanged); `404.html` gained a small-caps "Page Not Found" h1.
- **Explorer sort**: `decline.js` sets `aria-sort` on `th`s and `.sorted-asc/desc` classes; `diagrams.css` renders a gold ↑/↓ on the active column.
- **No-JS**: `.sd-controls` hidden unless `html.js` (dead Year/Measure/search inputs no longer render above the noscript notice).
- **Macro strip**: invalid `aria-label` on `<p>` replaced by a visually-hidden lead-in; inactive step opacity 0.55→0.7 (4.5:1 on both creams); `MACROS` renamed Faith→**Belief** to match section VI + the path-strip (static stage list updated in sync); `.path-strip` div → `<nav>`.
- **Charts on phones**: axis ticks/marker discs carry `.sd-tick`/`.sd-marker-disc`/`.sd-marker-num` classes; a ≤600px media query in `diagrams.css` enlarges them (CSS beats SVG presentation attributes) and hides the deficit-wash annotation (`.sd-note`) which can't fit at that scale. **Keep the classes when regenerating chart code.**
- **Layout shift**: `#deficit-chart-mount`/`#decline-mini-mount`/`#sd-chart-mount` reserve height via `aspect-ratio` matching their viewBoxes (keep in sync); noscript imgs carry width/height.
- **deficit.js hardened**: null cells are filtered and series bases use first non-null (mirrors decline-mini) — a blank cell in a future workbook regeneration degrades gracefully instead of crashing the chart.
- **Assets**: `hi-logo.png` resized 400→344px and quantized (158KB→33KB, visually identical; source PNG remains in `client-documents/`); font preload corrected sitewide to Cormorant 500 *normal* (headings' actual face — pages were preloading the italic).
- **404 home link**: guesses `/'+first-segment+'/` then verifies by probing `assets/favicon-32.png`, falling back to `/` — works on github.io project sites, subpath deployments (wander.haus/holiness-institute/), and root custom domains.
- **Typography nits**: straight quote in holiness §I (*Gaudium et Spes* quote), straight apostrophes in `path-data.js` lens text + the static stage list, "St Paul" → "St. Paul" (retreats).

## The Saints God Sends — new page and sitewide weave (July 6, 2026 — DONE)

Steve's new essay (`The_Saints_God_Sends_1.docx`), built per the plan he worked out with Fable and forwarded: a page of its own at the hinge of the reading path, the table made interactive, the heresy column joined to the substitutes taxonomy, three pressure-point insertions, and entry as governing witness (reading path + full nav) rather than under any "Resources" heading. All decisions confirmed by Parker (full nav entry, `saints.html` / "Saints", century frieze + panel, full weave in one pass).

- **`saints.html`** — essay text nearly verbatim (straight apostrophes normalized to curly per site convention; Latin/title italics per Steve's rule). Holiness-style essay layout: `data-essay` (progress bar + scrollspy), TOC rail, mobile TOC, section kickers I–V under Steve's own headings (Pattern in History / Particular Remedy / When God Himself Comes / Mercy, Trust… / What God Is Already Showing). Epigraph Amos 3:7. Illuminated rhythm applied (drop caps on section openers; four pull-quotes, verbatim lines; one examen quoting the essay's own question). Vatican.va links added on first reference — *Haurietis Aquas*, *The Message of Fatima*, the Divine Mercy Sunday homily (22 April 2001), *Novo Millennio Ineunte* — all four URLs fetched and verified live. NMI 38 set as `blockquote.quote`.
- **Century frieze** (`js/diagrams/saints-data.js` + `js/diagrams/saints.js`, wired in `main.js`): the essay's 33-row table verbatim as button-chips grouped by century (15 era groups) → `.diagram-panel` with crisis / heresy or error / characteristic form of holiness. No SVG — plain buttons, keyboard-operable at any width. The last row ("Our own") renders as a rubricated italic chip; its panel adds the "Already given: Thérèse, Faustina, John Paul II" field and links to `holiness.html#why-replaced` — the essay's heresy column joined to the substitutes taxonomy. Full static table lives in the figure's `.diagram-text` details (reuses `.reorder-table` dress incl. stacked mobile cards; `.saints-table` adds column tints + open-row rule); `html:not(.js) .saints-layout` hides the empty mount/panel so no-JS reads caption → table. **Verified:** three-way diff docx table ↔ data module ↔ static HTML table = 0 mismatches across all 33×5 cells; DOM smoke test (groups, chips, selection, open-row panel); links/anchors and tag balance across all touched pages.
- **Reading path**: `how-you-see-god.html` Continue → `saints.html` (resolves the old "Continue untargeted" NOTE); saints Continue → `holiness.html`, quiet-link back to How You See God. Drafted bridge paragraph at the top of the essay ("the page behind this one ends with the saints…") → NOTE.
- **Closing move** (drafted → NOTE): vertical flow figure Mercy→Trust→Abandonment→Grace→Holiness→Renewal with a quiet-link to `path-to-renewal.html`, then a paragraph fusing the open row with the substitutes and the already-indicated remedy ("What the Sacred Heart was for the seventeenth century, this witness is for ours").
- **Nav**: `Saints` added to `NAV_LINKS` between About and Holiness (mirrors reading order). Footer columns are now 4/5/6 (Explore = About…Holiness Guide, Go Deeper picks up Path to Renewal). Noscript navs updated on all full pages + `index.html` + `how-you-see-god.html` (Saints before Holiness); `begin-*` noscripts unchanged (threshold flow goes through How You See God first).
- **Pressure points** (each drafted → NOTE for client review): `index.html` — one sentence + link closing the "the answer is not new" paragraph ("God has answered every age this way — see how"); `path-to-renewal.html` — saints link added to the practice chain + a providential-pedigree paragraph before "Nothing on that path is new"; `causality.html` — instrumental-causality paragraph (saint as secondary cause of a prior divine initiative) between the four-causes answers and "Notice what is absent"; `holiness.html` — doorway line under the "Saints Show the Path" strip.
- **Hubs**: a "The Saints God Sends" step added after How You See God on `laity/priests/bishops.html`, notes tailored per audience (drafted, like all hub copy).

**Round 2 (same day, per Parker — "implement your recommendations"):**

- **Substitutes fusion made bidirectional**: `ancestor` field on every entry in `substitutes-data.js` (drafted from the essay's last-row analysis — Pelagius returned / Gnostic instinct / Jansenism's residue / trust in technique → NOTE at top of that file), rendered in the wheel panel as "Old error, new name" between "stops short" and "restored". The text-version details on `holiness.html` carries a matching drafted summary paragraph + `saints.html` link (→ NOTE).
- **Frieze deep links**: chips carry ids from `saints-data.js`, so `saints.html#margaret-mary` (etc.) selects that chip on load and on hashchange and scrolls it into view. These anchors are JS-generated — not in the static HTML; without JS the fragment is ignored and the reader has the static table. A link checker must treat `saints.html#<saint-id>` as valid against `saints-data.js` ids.
- **Frieze keyboard**: roving tabindex — the frieze is a single tab stop; Arrow keys move along it, Home/End jump, Enter/Space select (33 chips are no longer 33 tab stops).
- **Holiness saint cards retargeted** to `saints.html#augustine/#teresa-avila/#john-cross/#therese`; their old in-page fallback anchors are recorded in a NOTE for Steve to revert if preferred.
- **Fourth pressure point**: drafted paragraph near the end of `fatherhood.html` §X — "its final column keeps saying fatherhood: Peter… Gregory… Borromeo… Vianney… Bosco" → NOTE.
- **Pedigree names linked**: the path-to-renewal drafted paragraph now deep-links the Sacred Heart / Faustina / John Paul II to their frieze rows.
- **Bridge reworded** ("Behind this page in the site's reading path stands How You See God…") so it reads correctly for both arrivals — reading path and top nav.

**Frieze layout revision (same day, per Parker — the centered wrap read as jagged):**

- The frieze is now a **vertical century ledger**: one continuous gold spine (`.frieze-rail::before` at `left: 5.2rem`), era labels right-aligned in the gutter (small-caps gold; the "Our own" label rubricated red like its chip), chips left-aligned to the right of the spine, chronology reading top to bottom. Same DOM — CSS only, plus one JS line.
- **≥900px**: `.saints-layout` becomes a two-column grid; the detail panel stands to the right and is `position: sticky` (top `--space-3`), keeping pace as the ledger scrolls. **<900px**: panel sits under the ledger as before, and a chip tap calls `panel.scrollIntoView({block:'nearest'})` so selection is never invisible (guarded `window.matchMedia`, no scroll on hash-apply).

## Navigation slimmed to five (July 6, 2026 — DONE)

Per Parker: the 8-link header read as crowded once Saints joined. Restructured in `include.js`:

- **Header** (`NAV_LINKS`, 5): About · Saints · Holiness · Fatherhood · Retreats — the reading arc plus the front door (About) and the concrete instrument (Abba). Holiness Guide, Path to Renewal, and Causality left the header.
- **Footer**: Explore = the five header links, same order. Go Deeper = new `DEEPER_LINKS` const — Holiness Guide, Path to Renewal, Causality, **Sacramental Data** (its first nav home; that page's NOTE now asks Steve to confirm footer placement instead of asking where it should go) — plus the three audience hubs. Columns now 4/5/7.
- Pages no longer in the header (`holiness-guide`, `path-to-renewal`, `causality`) keep their `data-page` attributes; they simply match no header link (like `sacramental-data` always has). Noscript navs were left complete — they are per-page sitemaps, not header mirrors.

## CCC citations linked (July 6, 2026 — DONE)

All three Catechism references now link the Vatican's IntraText archive, per the site's convention of linking magisterial sources: CCC 67 → `ENG0015/__PH.HTM` (saints.html), CCC 2014 → `__P71.HTM` and CCC 826 → `__P29.HTM` (holiness.html). All three URLs fetched and verified to contain their paragraphs. The archive has no per-paragraph anchors — links open the section page holding the paragraph. For future CCC references, find the right section page via the index at `vatican.va/archive/ENG0015/_INDEX.HTM`.

## Outstanding items

- Resolve the `NOTE for client review` comments (laity threshold kicker, Eudes/Caussade question in `retreats.html`, footer-placement confirmation + data-source attribution in `sacramental-data.html`, drafted prompts/rows/lenses in `holiness.html` + `path-data.js`, deficit-chart population-line departure + Jubilee strip region + medal name in `about.html`, "Start Here" door label on `index.html`)
- Steve to confirm the slimmed navigation (July 6, 2026): five header links (About · Saints · Holiness · Fatherhood · Retreats), with Holiness Guide / Path to Renewal / Causality / Sacramental Data in the footer's Go Deeper
- Steve to review the July 6 saints weave: the drafted bridge + closing move on `saints.html`, the frieze panel hint and "Our Own Age" chip label, the pressure-point insertions on `index.html` / `path-to-renewal.html` / `causality.html` / `holiness.html` / `fatherhood.html`, the hub path notes, the "Old error, new name" ancestor lines on the substitutes wheel, and the saint-card retarget on `holiness.html`. The landing-page sentence is the most sensitive of these (Steve is protective of that page — see the July 4 revert)
- Ask Steve (July 6, 2026): should the frieze also mark the comings — Rue du Bac 1830 and Fatima 1917 — as quiet non-button markers inside their century groups (§III of the essay is about them, but the table is saints-only)? And should the site anywhere say explicitly that the Jansenism→Sacred Heart model case is the site's own seal (e.g. one sentence on `about.html` or in the saints-page closing)?
- Steve to review the causality page's four-causes section (closely paraphrases his book) and confirm the *Leadership Illusion* pointer should live there until a dedicated essay page exists
- "Draft for review" bands removed sitewide per Parker (July 5, 2026); the `.draft-notice` CSS remains in `main.css` for future draft pages
- README TODO: set absolute `og:image` URLs after deploy (may be done — check `git log`; last commit set OG meta)
