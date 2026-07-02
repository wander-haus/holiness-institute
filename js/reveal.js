/* Scroll-triggered fade-ins. Enhancement only: the .reveal initial state is
   gated behind html.js in CSS, so content is never hidden without JS. */

export function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.revealDelay;
        if (delay) el.style.transitionDelay = `${delay}ms`;
        el.classList.add('is-visible');
        io.unobserve(el);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px 10% 0px' });

  els.forEach((el) => io.observe(el));
}
