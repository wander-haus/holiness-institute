/* Header and footer injection — replaces a templating engine across the
   site's static pages. Pages declare what they need via body attributes:
     data-nav="none|minimal|full"   chrome level
     data-page="holiness"           which nav link is current
   All page *content* is static HTML; only this chrome is JS-injected,
   and every page carries a <noscript> nav fallback. */

const NAV_LINKS = [
  { id: 'about', href: 'about.html', label: 'About' },
  { id: 'holiness', href: 'holiness.html', label: 'Holiness' },
  { id: 'fatherhood', href: 'fatherhood.html', label: 'Fatherhood' },
  { id: 'holiness-guide', href: 'holiness-guide.html', label: 'Holiness Guide' },
  { id: 'path-to-renewal', href: 'path-to-renewal.html', label: 'Path to Renewal' },
  { id: 'retreats', href: 'retreats.html', label: 'Retreats' },
  { id: 'causality', href: 'causality.html', label: 'Causality' },
];

const BEGIN_LINKS = [
  { href: 'begin-laity.html', label: 'Start Here' },
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

function footerHTML(navMode) {
  const minimal = navMode === 'minimal';
  const cols = minimal ? '' : `
    <div class="footer-cols">
      <div>
        <h2>Begin</h2>
        <ul>
          ${BEGIN_LINKS.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join('\n')}
          <li><a href="how-you-see-god.html">How You See God Determines Everything</a></li>
        </ul>
      </div>
      <div>
        <h2>Explore</h2>
        <ul>
          ${NAV_LINKS.slice(0, 4).map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join('\n')}
        </ul>
      </div>
      <div>
        <h2>Go Deeper</h2>
        <ul>
          ${NAV_LINKS.slice(4).map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join('\n')}
          <li><a href="laity.html">For the Laity</a></li>
          <li><a href="priests.html">For Priests</a></li>
          <li><a href="bishops.html">For Bishops</a></li>
        </ul>
      </div>
    </div>`;
  // The contemplative pages (minimal footer) already close with scripture in
  // their own content, so the footer there is a quiet institutional sign-off
  // rather than a second repetition of the same verse.
  const motto = minimal ? '' : `<p>“Remain in my love.” <cite>(Jn 15:9)</cite></p>`;
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
  const { nav = 'full', page = '' } = document.body.dataset;
  // The landing (nav="none") carries its masthead and closing gateway in its
  // own markup; a footer there would only repeat what is already on the page.
  if (nav === 'none') return;
  document.body.insertAdjacentHTML('afterbegin', headerHTML(nav, page));
  document.body.insertAdjacentHTML('beforeend', footerHTML(nav));
}
