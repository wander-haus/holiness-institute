/* Causality diagram — two states. "Rightly ordered": holiness as final cause
   governing every means. "Inverted": a secondary good takes the governing
   position and holiness is demoted to a hoped-for byproduct. The page's
   text-version <details> is the no-JS fallback. */

import { SUBSTITUTES } from './substitutes-data.js';

const MEANS = ['Prayer', 'Doctrine', 'Liturgy', 'Moral Life', 'Apostolate', 'Administration'];

/* The selectable inversions, drawn from the substitutes data. */
const INVERSIONS = [
  { id: 'managerialism', name: 'Managerialism' },
  { id: 'apostolate', name: 'Activism' },
  { id: 'doctrine', name: 'Orthodoxism' },
  { id: 'morality', name: 'Moralism' },
];

const CAPTIONS = {
  ordered: 'Holiness governs as final cause. Every good — prayer, doctrine, liturgy, moral life, apostolate, administration — is judged by whether it disposes souls for union with God in love. The goods remain themselves, but they are transfigured by their true end, and the Church’s action proceeds from union. Mission follows holiness.',
  inverted: (name) => `${name} now governs in practice, even while holiness remains in the vocabulary. The same goods remain visible — the parish is active, the diocese functions — but they are ordered to what can be managed, measured, and sustained by human effort. Holiness becomes a hoped-for byproduct, and the fruit proper to divine life recedes: less faith, less hope, less love.`,
};

export function initCausality() {
  const mount = document.getElementById('causality-mount');
  if (!mount) return;

  let state = 'ordered';
  let inversion = INVERSIONS[0];

  const root = document.createElement('div');
  root.className = 'causality';

  const controls = document.createElement('div');
  controls.className = 'causality-controls';
  controls.innerHTML = `
    <div class="causality-toggle" role="group" aria-label="Diagram state">
      <button type="button" class="causality-state-btn active" data-state="ordered" aria-pressed="true">Rightly Ordered</button>
      <button type="button" class="causality-state-btn" data-state="inverted" aria-pressed="false">Inverted</button>
    </div>
    <label class="causality-select-label" hidden>
      What governs instead:
      <select class="causality-select">
        ${INVERSIONS.map((inv) => `<option value="${inv.id}">${inv.name}</option>`).join('')}
      </select>
    </label>`;

  const stage = document.createElement('div');
  stage.className = 'causality-stage';
  stage.setAttribute('aria-live', 'polite');

  const caption = document.createElement('p');
  caption.className = 'causality-caption';

  root.appendChild(controls);
  root.appendChild(stage);
  root.appendChild(caption);
  mount.appendChild(root);

  const stateButtons = controls.querySelectorAll('.causality-state-btn');
  const selectLabel = controls.querySelector('.causality-select-label');
  const select = controls.querySelector('.causality-select');

  stateButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      state = btn.dataset.state;
      stateButtons.forEach((b) => {
        const active = b === btn;
        b.classList.toggle('active', active);
        b.setAttribute('aria-pressed', String(active));
      });
      selectLabel.hidden = state !== 'inverted';
      render();
    });
  });

  select.addEventListener('change', () => {
    inversion = INVERSIONS.find((inv) => inv.id === select.value);
    render();
  });

  function render() {
    if (state === 'ordered') {
      stage.innerHTML = `
        <div class="causality-diagram ordered">
          <div class="causality-node governing">
            <span class="causality-node-kicker">Final Cause — governs</span>
            <strong>Holiness</strong>
            <span class="causality-node-sub">union with God in love</span>
          </div>
          <div class="causality-arrows" aria-hidden="true">${'<span>↓</span>'.repeat(3)}</div>
          <ul class="causality-means">
            ${MEANS.map((m) => `<li>${m}</li>`).join('')}
          </ul>
          <div class="causality-arrows" aria-hidden="true">${'<span>↓</span>'.repeat(3)}</div>
          <div class="causality-node fruit">
            <strong>Fruit</strong>
            <span class="causality-node-sub">souls disposed for grace — faith, hope, and love abound</span>
          </div>
        </div>`;
      caption.textContent = CAPTIONS.ordered;
    } else {
      const sub = SUBSTITUTES.find((s) => s.id === inversion.id);
      stage.innerHTML = `
        <div class="causality-diagram inverted">
          <div class="causality-node governing usurper">
            <span class="causality-node-kicker">Governing in practice</span>
            <strong>${inversion.name}</strong>
            <span class="causality-node-sub">${sub.sublabel} — closed upon itself</span>
          </div>
          <div class="causality-arrows strained" aria-hidden="true">${'<span>↓</span>'.repeat(3)}</div>
          <ul class="causality-means strained">
            ${MEANS.map((m) => `<li>${m}</li>`).join('')}
          </ul>
          <div class="causality-side dotted">
            <span class="causality-node-kicker">Hoped-for byproduct</span>
            <strong>Holiness</strong>
          </div>
          <div class="causality-arrows strained" aria-hidden="true">${'<span>↓</span>'.repeat(3)}</div>
          <div class="causality-node fruit withered">
            <strong>Fruit recedes</strong>
            <span class="causality-node-sub">activity continues, but less faith, less hope, less love</span>
          </div>
        </div>`;
      caption.textContent = CAPTIONS.inverted(inversion.name);
    }
  }

  render();
}
