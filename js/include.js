/* Header and footer injection — replaces a templating engine across the
   site's static pages. Pages declare what they need via body attributes:
     data-nav="none|minimal|full"   chrome level
     data-page="holiness"           which nav link is current
   All page *content* is static HTML; only this chrome is JS-injected,
   and every page carries a <noscript> nav fallback. */

/* The header carries the reading arc, the front door, and the charter —
   five links (July 6, 2026: the 8-link header read as crowded; Steve then
   swapped Path to Renewal in for Retreats "since we do not yet have them").
   "Saints" precedes "Holiness" to mirror the reading path:
   How You See God → The Saints God Sends → Holiness → Fatherhood.
   FAQ joined as the sixth link per Steve (July 10, 2026) — the nutshell page
   for the arriving reader, placed last as the header's reference door. */
const NAV_LINKS = [
  { id: 'about', href: 'about.html', label: 'About' },
  { id: 'saints', href: 'saints.html', label: 'Saints' },
  { id: 'holiness', href: 'holiness.html', label: 'Holiness' },
  { id: 'fatherhood', href: 'fatherhood.html', label: 'Fatherhood' },
  { id: 'path-to-renewal', href: 'path-to-renewal.html', label: 'Path to Renewal' },
  { id: 'faq', href: 'faq.html', label: 'FAQ' },
];

/* Deepening material lives in the footer's Go Deeper column only. The data
   page joined it here (its old NOTE asked where it should live in the nav);
   Retreats waits here until the retreats themselves exist (Steve, July 6,
   2026). */
const DEEPER_LINKS = [
  { href: 'holiness-guide.html', label: 'Holiness Guide' },
  { href: 'retreats.html', label: 'Retreats' },
  { href: 'causality.html', label: 'Causality' },
  { href: 'sacramental-data.html', label: 'Sacramental Data' },
];

// "Start Here" is reserved for the landing page itself (Steve, "Landing
// Page" email, July 4, 2026) — the footer names each threshold instead.
const BEGIN_LINKS = [
  { href: 'begin-laity.html', label: 'For Laity' },
  { href: 'begin-priests.html', label: 'For Priests' },
  { href: 'begin-bishops.html', label: 'For Bishops' },
];

function headerHTML(navMode, currentPage) {
  if (navMode === 'minimal') {
    return `
      <header class="site-header minimal">
        <div class="wrap">
          <a class="brand" href="index.html">
            <span class="brand-name">The Holiness Institute</span>
          </a>
        </div>
      </header>`;
  }
  const links = NAV_LINKS.map((l) => {
    const current = l.id === currentPage ? ' aria-current="page"' : '';
    return `<li><a href="${l.href}"${current}>${l.label}</a></li>`;
  }).join('\n');
  return `
    <header class="site-header">
      <div class="wrap">
        <a class="brand" href="index.html">
          <img src="assets/images/hi-logo.png" alt="" width="54" height="54">
          <span class="brand-name">The Holiness Institute</span>
        </a>
        <button class="nav-toggle" aria-expanded="false" aria-controls="site-nav">Menu</button>
        <nav class="site-nav" id="site-nav" aria-label="Site">
          <ul>
            ${links}
          </ul>
        </nav>
      </div>
    </header>`;
}

/* footerMode may differ from navMode: a contemplative page (minimal header)
   can still carry the full navigation footer via data-footer="full". */
function footerHTML(footerMode, navMode = footerMode) {
  const minimal = footerMode === 'minimal';
  const cols = minimal ? '' : `
    <div class="footer-cols">
      <div>
        <h2>Begin</h2>
        <ul>
          ${BEGIN_LINKS.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join('\n')}
          <li><a href="how-you-see-god.html">How You See God</a></li>
        </ul>
      </div>
      <div>
        <h2>Explore</h2>
        <ul>
          ${NAV_LINKS.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join('\n')}
        </ul>
      </div>
      <div>
        <h2>Go Deeper</h2>
        <ul>
          ${DEEPER_LINKS.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join('\n')}
          <li><a href="laity.html">For the Laity</a></li>
          <li><a href="priests.html">For Priests</a></li>
          <li><a href="bishops.html">For Bishops</a></li>
        </ul>
      </div>
    </div>`;
  // The contemplative pages (minimal header) already close with scripture in
  // their own content, so their footer — even when it carries the nav columns —
  // omits the motto rather than repeat the same verse twice on one page.
  const motto = navMode === 'full' ? `<p>“Remain in my love.” <cite>(Jn 15:9)</cite></p>` : '';
  return `
    <footer class="site-footer${minimal ? ' minimal' : ''}">
      <div class="wrap">
        ${cols}
        <div class="footer-motto">
          ${motto}
          <p class="footer-fine">The Holiness Institute · Called to the Fullness of Love</p>
        </div>
      </div>
    </footer>`;
}

export function injectChrome() {
  const { nav = 'full', page = '', footer } = document.body.dataset;
  // nav="none" renders a page without header chrome. It may still carry a
  // footer via data-footer="full": the landing does this (July 4, 2026 —
  // Steve asked for the original chromeless front page back, keeping the
  // nav footer). Its motto is omitted like the threshold pages', since the
  // landing closes with the same verse in its own content.
  if (nav !== 'none') {
    // Keep the static "Skip to content" link first in the tab order: inject
    // the header after it, not before it.
    const skip = document.querySelector('.skip-link');
    if (skip) skip.insertAdjacentHTML('afterend', headerHTML(nav, page));
    else document.body.insertAdjacentHTML('afterbegin', headerHTML(nav, page));
  }
  const footerMode = footer || (nav === 'none' ? '' : nav);
  if (footerMode) document.body.insertAdjacentHTML('beforeend', footerHTML(footerMode, nav));
}
