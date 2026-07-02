/* The Path of Holiness — desktop map. Renders a winding gold path rising
   through the three classical ways toward union, with seven focusable
   stations and two dark-night markers. On narrow viewports (and without JS)
   the pre-rendered stage list in the page carries the same content. */

import { WAYS, STAGES, NIGHTS, MACROS, LENSES } from './path-data.js';

/* The active lens: the same path read as stages of prayer, as the
   maturation of trust, or as pastoral implications. */
let currentLens = 'prayer';
let lastStage = null;

const W = 1200;
const H = 420;
const SVG_NS = 'http://www.w3.org/2000/svg';

/* Station coordinates along the rising path. */
const POINTS = STAGES.map((_, i) => ({
  x: 95 + i * 158,
  y: 330 - i * 33 + (i % 2 ? 14 : -6),
}));

/* Way band x-extents (purgative: I–III, illuminative: IV–V, unitive: VI–VII). */
const BANDS = [
  { way: WAYS[0], x: 0, w: 487 },
  { way: WAYS[1], x: 487, w: 320 },
  { way: WAYS[2], x: 807, w: W - 807 },
];

function el(name, attrs = {}) {
  const node = document.createElementNS(SVG_NS, name);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
}

function text(content, attrs = {}) {
  const t = el('text', attrs);
  t.textContent = content;
  return t;
}

function pathD() {
  let d = `M 20 365 Q 55 350 ${POINTS[0].x} ${POINTS[0].y}`;
  for (let i = 1; i < POINTS.length; i++) {
    const prev = POINTS[i - 1];
    const cur = POINTS[i];
    const mx = (prev.x + cur.x) / 2;
    d += ` C ${mx} ${prev.y}, ${mx} ${cur.y}, ${cur.x} ${cur.y}`;
  }
  d += ` Q ${POINTS[6].x + 60} ${POINTS[6].y - 15} 1148 ${POINTS[6].y - 40}`;
  return d;
}

export function initPath() {
  const figure = document.getElementById('path-figure');
  const mount = document.getElementById('path-map-mount');
  if (!figure || !mount) return;

  const svg = el('svg', {
    viewBox: `0 0 ${W} ${H}`,
    role: 'group',
    'aria-label': 'The Path of Holiness: seven stages rising through the purgative, illuminative, and unitive ways. Use Tab or arrow keys to move between stages; press Enter to read about one.',
  });

  // Way bands
  BANDS.forEach(({ way, x, w }) => {
    svg.appendChild(el('rect', { x, y: 0, width: w, height: H, class: `path-band path-band-${way.id}` }));
    svg.appendChild(text(way.name.replace('The ', '').toUpperCase(), {
      x: x + w / 2, y: 40, 'text-anchor': 'middle', class: 'path-band-label',
    }));
  });

  // Light of union at far right
  svg.appendChild(el('circle', { cx: 1150, cy: POINTS[6].y - 50, r: 46, class: 'path-glow' }));
  svg.appendChild(el('circle', { cx: 1150, cy: POINTS[6].y - 50, r: 26, class: 'path-glow-core' }));
  svg.appendChild(text('Union with', { x: 1150, y: POINTS[6].y + 28, 'text-anchor': 'middle', class: 'path-goal-label' }));
  svg.appendChild(text('God in Love', { x: 1150, y: POINTS[6].y + 46, 'text-anchor': 'middle', class: 'path-goal-label' }));

  // The winding path
  svg.appendChild(el('path', { d: pathD(), class: 'path-road', 'aria-hidden': 'true' }));

  const panel = document.createElement('aside');
  panel.className = 'diagram-panel path-panel';
  panel.id = 'path-panel';
  panel.setAttribute('aria-live', 'polite');
  panel.innerHTML = '<p class="diagram-panel-hint">Select a stage on the path to see how prayer, love, and the soul’s vision of God grow together.</p>';

  // Dark-night markers
  NIGHTS.forEach((night) => {
    const a = POINTS[night.after];
    const b = POINTS[night.after + 1];
    const x = (a.x + b.x) / 2;
    const y = (a.y + b.y) / 2 - 38;
    const g = el('g', {
      class: 'path-night-marker',
      tabindex: '0',
      role: 'button',
      'aria-controls': 'path-panel',
      'aria-label': night.name,
    });
    const moon = el('path', {
      d: `M ${x} ${y - 9} a 9 9 0 1 0 9 13 a 7.5 7.5 0 1 1 -9 -13 Z`,
      class: 'path-night-moon',
    });
    g.appendChild(moon);
    const select = () => {
      clearSelection(svg);
      g.classList.add('selected');
      panel.innerHTML = `
        <h3 class="diagram-panel-title">${night.name}</h3>
        <p>${night.desc}</p>`;
    };
    g.addEventListener('click', select);
    g.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(); }
    });
    svg.appendChild(g);
  });

  // Stations with roving tabindex
  const stations = [];
  STAGES.forEach((stage, i) => {
    const { x, y } = POINTS[i];
    const g = el('g', {
      class: 'path-station',
      tabindex: i === 0 ? '0' : '-1',
      role: 'button',
      'aria-controls': 'path-panel',
      'aria-label': `Stage ${stage.numeral}: ${stage.name}`,
    });
    g.appendChild(el('circle', { cx: x, cy: y, r: 22, class: 'path-station-disc' }));
    g.appendChild(text(stage.numeral, { x, y: y + 1, 'text-anchor': 'middle', 'dominant-baseline': 'central', class: 'path-station-numeral' }));
    g.appendChild(text(stage.name, { x, y: y + 44, 'text-anchor': 'middle', class: 'path-station-name' }));

    const select = () => selectStage(stage, g, svg, panel);
    g.addEventListener('click', select);
    g.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        select();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const dir = e.key === 'ArrowRight' ? 1 : -1;
        const next = stations[(i + dir + stations.length) % stations.length];
        stations.forEach((s) => s.setAttribute('tabindex', '-1'));
        next.setAttribute('tabindex', '0');
        next.focus();
      }
    });
    stations.push(g);
    svg.appendChild(g);
  });

  // Lens toggle: one path, three readings
  const toolbar = document.createElement('div');
  toolbar.className = 'path-lenses';
  toolbar.setAttribute('role', 'group');
  toolbar.setAttribute('aria-label', 'Read the path through a lens');
  const lensLabel = document.createElement('span');
  lensLabel.className = 'path-lenses-label';
  lensLabel.textContent = 'Read the path as:';
  toolbar.appendChild(lensLabel);
  LENSES.forEach((lens) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'path-lens-btn';
    btn.textContent = lens.label;
    btn.setAttribute('aria-pressed', lens.id === currentLens ? 'true' : 'false');
    btn.addEventListener('click', () => {
      currentLens = lens.id;
      toolbar.querySelectorAll('.path-lens-btn').forEach((b) =>
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'));
      if (lastStage) {
        selectStage(lastStage.stage, lastStage.node, svg, panel);
      } else {
        panel.innerHTML = `<p class="diagram-panel-hint">Select a stage on the path to read it as ${lens.label.toLowerCase()}.</p>`;
      }
    });
    toolbar.appendChild(btn);
  });

  mount.appendChild(svg);
  mount.appendChild(toolbar);
  mount.appendChild(panel);
  figure.classList.add('svg-active');
}

function clearSelection(svg) {
  svg.querySelectorAll('.selected').forEach((n) => n.classList.remove('selected'));
}

function selectStage(stage, node, svg, panel) {
  clearSelection(svg);
  node.classList.add('selected');
  lastStage = { stage, node };

  const way = WAYS.find((w) => w.id === stage.way);
  const lens = LENSES.find((l) => l.id === currentLens);
  const macroStrip = MACROS.map((m) =>
    `<span class="${m === stage.macro || (stage.macro === 'Union' && m === 'Self-Gift') ? 'macro-step active' : 'macro-step'}">${m}</span>`
  ).join('<span class="macro-arrow" aria-hidden="true">→</span>');

  /* The selected lens leads the panel, so switching lenses visibly changes
     the reading; the four constant fields follow as reference. */
  panel.innerHTML = `
    <h3 class="diagram-panel-title">${stage.numeral}. ${stage.name}</h3>
    <p class="diagram-panel-sub">${way.name}</p>
    <div class="path-lens-lead">
      <span class="path-lens-lead-label">Read as ${lens.label.toLowerCase()}</span>
      <p>${stage.lenses[currentLens]}</p>
    </div>
    <dl class="diagram-panel-fields">
      <dt>Path of prayer</dt><dd>${stage.prayer}</dd>
      <dt class="love-row">Growth of love</dt><dd class="love-row">${stage.love}</dd>
      <dt>Seeing God rightly</dt><dd>${stage.notion}</dd>
      <dt>The soul’s movement</dt><dd>${stage.note}</dd>
    </dl>
    <p class="macro-strip" aria-label="The soul’s overall movement: faith, trust, abandonment, self-gift">${macroStrip}</p>`;
  const lead = panel.querySelector('.path-lens-lead');
  lead.classList.add('is-fresh');
  requestAnimationFrame(() => requestAnimationFrame(() => lead.classList.remove('is-fresh')));
}
