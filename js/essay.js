/* Long-essay enhancements: reading progress bar and TOC scrollspy. */

export function initEssay() {
  initProgressBar();
  initScrollspy();
}

function initProgressBar() {
  const bar = document.createElement('div');
  bar.className = 'progress-bar';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);

  let ticking = false;
  const update = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.width = `${pct}%`;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  update();
}

function initScrollspy() {
  const tocLinks = document.querySelectorAll('.essay-toc-rail a[href^="#"]');
  if (!tocLinks.length || !('IntersectionObserver' in window)) return;

  const byId = new Map();
  tocLinks.forEach((a) => byId.set(a.hash.slice(1), a));

  const sections = [...byId.keys()]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        tocLinks.forEach((a) => a.classList.remove('active'));
        byId.get(entry.target.id)?.classList.add('active');
      }
    });
  }, { rootMargin: '-10% 0px -70% 0px' });

  sections.forEach((s) => io.observe(s));
}
