/* "Why Holiness Is Replaced" — interactive wheel. Builds an SVG of eight
   substitute nodes around a HOLINESS center; selecting a node fills the
   adjacent detail panel. The full content also lives in the page's
   text-version <details>, which is the no-JS fallback. */

import { SUBSTITUTES } from './substitutes-data.js';

const SIZE = 600;
const CX = SIZE / 2;
const CY = SIZE / 2;
const ORBIT = 218;
const NODE_R = 62;
const CENTER_R = 108;

const SVG_NS = 'http://www.w3.org/2000/svg';

function el(name, attrs = {}, children = []) {
  const node = document.createElementNS(SVG_NS, name);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  for (const child of children) node.appendChild(child);
  return node;
}

function text(content, attrs = {}) {
  const t = el('text', attrs);
  t.textContent = content;
  return t;
}

/* Multi-line label inside a node circle. */
function nodeLabel(label, cx, cy) {
  const words = label.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > 14) {
      lines.push(line.trim());
      line = w;
    } else {
      line = (line + ' ' + w).trim();
    }
  }
  if (line) lines.push(line);
  const lineHeight = 19;
  const startY = cy - ((lines.length - 1) * lineHeight) / 2;
  const g = el('g');
  lines.forEach((l, i) => {
    g.appendChild(text(l, {
      x: cx,
      y: startY + i * lineHeight,
      'text-anchor': 'middle',
      'dominant-baseline': 'central',
      class: 'sub-node-label',
    }));
  });
  return g;
}

export function initSubstitutes() {
  const mount = document.getElementById('substitutes-wheel');
  const panel = document.getElementById('substitutes-panel');
  if (!mount || !panel) return;

  const svg = el('svg', {
    viewBox: `0 0 ${SIZE} ${SIZE}`,
    role: 'group',
    'aria-label': 'Why Holiness Is Replaced: eight goods surrounding holiness. Use Tab to move between substitutes; press Enter to read about one.',
  });

  // Spokes
  const spokes = el('g', { class: 'sub-spokes', 'aria-hidden': 'true' });
  SUBSTITUTES.forEach((_, i) => {
    const angle = (i / SUBSTITUTES.length) * Math.PI * 2 - Math.PI / 2;
    spokes.appendChild(el('line', {
      x1: CX + Math.cos(angle) * CENTER_R,
      y1: CY + Math.sin(angle) * CENTER_R,
      x2: CX + Math.cos(angle) * (ORBIT - NODE_R),
      y2: CY + Math.sin(angle) * (ORBIT - NODE_R),
    }));
  });
  svg.appendChild(spokes);

  // Center medallion
  const center = el('g', { class: 'sub-center', 'aria-hidden': 'true' });
  center.appendChild(el('circle', { cx: CX, cy: CY, r: CENTER_R, class: 'sub-center-disc' }));
  center.appendChild(el('circle', { cx: CX, cy: CY, r: CENTER_R - 7, class: 'sub-center-ring' }));
  center.appendChild(text('HOLINESS', {
    x: CX, y: CY - 14, 'text-anchor': 'middle', class: 'sub-center-title',
  }));
  center.appendChild(text('Union with God', {
    x: CX, y: CY + 14, 'text-anchor': 'middle', class: 'sub-center-sub',
  }));
  center.appendChild(text('in Love', {
    x: CX, y: CY + 34, 'text-anchor': 'middle', class: 'sub-center-sub',
  }));
  svg.appendChild(center);

  // Nodes
  const nodes = [];
  SUBSTITUTES.forEach((item, i) => {
    const angle = (i / SUBSTITUTES.length) * Math.PI * 2 - Math.PI / 2;
    const x = CX + Math.cos(angle) * ORBIT;
    const y = CY + Math.sin(angle) * ORBIT;
    const g = el('g', {
      class: 'sub-node',
      tabindex: '0',
      role: 'button',
      'aria-expanded': 'false',
      'aria-controls': 'substitutes-panel',
      'data-id': item.id,
    });
    g.appendChild(el('circle', { cx: x, cy: y, r: NODE_R, class: 'sub-node-disc' }));
    g.appendChild(nodeLabel(item.label, x, y));
    const title = el('title');
    title.textContent = `${item.label} — ${item.sublabel}`;
    g.appendChild(title);

    const select = () => selectNode(item, g, nodes, panel);
    g.addEventListener('click', select);
    g.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        select();
      }
    });
    nodes.push(g);
    svg.appendChild(g);
  });

  mount.appendChild(svg);

  /* On phones the wheel's labels would shrink below legibility. There, hide
     the SVG and reveal the always-readable text version instead — the same
     graceful fallback the Path map uses. */
  const small = window.matchMedia('(max-width: 640px)');
  const details = document.querySelector('#substitutes-figure .diagram-text');
  const applyMode = () => {
    mount.style.display = small.matches ? 'none' : '';
    if (small.matches && details) details.open = true;
  };
  applyMode();
  small.addEventListener('change', applyMode);
}

function selectNode(item, node, nodes, panel) {
  nodes.forEach((n) => {
    n.classList.remove('selected');
    n.setAttribute('aria-expanded', 'false');
  });
  node.classList.add('selected');
  node.setAttribute('aria-expanded', 'true');

  panel.innerHTML = `
    <h3 class="diagram-panel-title">${item.label}</h3>
    <p class="diagram-panel-sub">${item.sublabel}</p>
    <dl class="diagram-panel-fields">
      <dt>What it preserves</dt>
      <dd>${item.preserves}</dd>
      <dt>Where it stops short</dt>
      <dd>${item.stops}</dd>
      <dt>Old error, new name</dt>
      <dd>${item.ancestor}</dd>
      <dt>Restored to service</dt>
      <dd>${item.restored}</dd>
    </dl>`;
}
