# The Holiness Institute — Website

A static website for The Holiness Institute (“Called to the Fullness of Love”).
Pure HTML/CSS/JS — no build step, no dependencies — designed for GitHub Pages.

## Structure

The site follows the founder's outline:

- **Landing** (`index.html`) — scripture, six searching questions, and three doors:
  Start Here (laity) · For Priests · For Bishops
- **Thresholds** (`begin-*.html`) — “Before You Go Further” pages for each audience
- **Hubs** (`laity.html`, `priests.html`, `bishops.html`) — suggested reading paths
- **Foundational page** — `how-you-see-god.html`
- **Main pages** — `about`, `holiness` (with three interactive diagrams), `fatherhood`,
  `holiness-guide`, `path-to-renewal`, `retreats`, `causality` (with the inversion diagram)

Pages marked with a “Draft for review” band contain text drafted from the founder's
notes and await his review. Search the HTML for `NOTE for client review` to find
specific open questions (laity threshold kicker, notion-page Continue target,
retreat naming, hub reading orders).

## Local development

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

There is no build step. Edit the HTML/CSS/JS and refresh.

Shared header/footer chrome is injected by `js/include.js` (edit the nav there,
not in each page). Diagram content lives in `js/diagrams/*-data.js`.

## Deploying to GitHub Pages

1. Create a GitHub repository and push this directory to `main`.
2. Repository **Settings → Pages → Source**: deploy from branch `main`, folder `/ (root)`.
3. The site uses only relative paths, so it works at both `username.github.io/repo/`
   and a custom domain with no changes.
4. **TODO after deploy:** set the absolute `og:image` URL in each page's `<head>`
   (search for `TODO: set absolute og:image`). The image is `assets/og-image.png`.

## Notes

- `client-documents/` (the founder's source files) is gitignored so it is not
  published with the site. Remove the line from `.gitignore` if you want it versioned.
- Fonts are self-hosted (Cormorant Garamond, EB Garamond — SIL OFL, see
  `assets/fonts/OFL.txt`).
- Accessibility: every diagram is keyboard-operable and has a text alternative;
  all animation respects `prefers-reduced-motion`; the site is fully readable
  without JavaScript.
