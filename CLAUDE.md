# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development

```bash
# Prerequisites: Hugo extended + Dart Sass
brew install hugo sass/sass/sass

# Development server (use --noHTTPCache to always see CSS changes)
hugo server --noHTTPCache

# Production build
hugo --gc --minify

# Force full rebuild (clears SCSS cache)
hugo server --ignoreCache --disableFastRender
```

Deployment is automated via GitHub Actions (`.github/workflows/hugo.yml`) — push to `main` triggers build and deploy to GitHub Pages.

## Architecture

This is a Hugo static site with no JavaScript build toolchain. SCSS is compiled via Hugo Pipes using Dart Sass.

### SCSS Design System

`assets/scss/` uses modern `@use` syntax (not `@import`). Each partial imports variables with `@use 'variables' as *`. The `_layout.scss` file additionally imports `@use 'sass:color'` for color functions.

Key design tokens are in `_variables.scss`: gold (#C5A044) for headings/accents, parchment (#F5F0E8) for backgrounds, deep-purple-charcoal (#2A1F3D) for hero/footer, sepia (#3D3228) for alternate sections. Typography: Cormorant Garamond (headings), EB Garamond (body), Cinzel (labels/nav) — loaded via Google Fonts in `partials/head.html`.

When styling components that appear in both light and dark sections, add `.section--alt` overrides (see `_components.scss` for the essay-card pattern).

### Content Sections

- **`content/writings/`** — Essays ordered by `weight` (1–14), matching the theological reading order from the List of Articles. Front matter includes `number`, `weight`, `summary`, and optionally `featured: true` for homepage display.
- **`content/book/`** — Book chapters as flat files (not in a `chapters/` subdirectory). Filenames are zero-padded with prefix (`00-preface.md`, `01-...`). Excurses use suffix `a` (`03a-`, `08a-`). Front matter uses `weight` for ordering and `chapter_num` for display labels.
- **`content/framework/`** — 8S Framework overview (`_index.md`) and history subpage.
- **`content/evaluate/`** — Placeholder for future AI diagnostic tool.

### Layout Hierarchy

Each content section has its own `layouts/{section}/list.html` and `layouts/{section}/single.html` that extend `_default/baseof.html`. The homepage uses `layouts/index.html` directly. Partials: `head.html` (meta, fonts, SCSS pipeline), `nav.html`, `footer.html`, `hero.html`, `essay-card.html`, `prev-next.html`.

The book and writings sections use `prev-next.html` for chapter/essay navigation, which relies on pages having `weight` set in front matter.

### Content Authorship

The author (Stephen Gajdosik) works directly in the markdown files. There is no separate source document directory — the content/ files are the single source of truth. Preserve the author's text faithfully when making structural or formatting changes.
