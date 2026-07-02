/* "The Decline Beneath the Activity" — the Holiness page's single, severe
   chart. Grayscale, three indexed lines, four historical markers. One graph,
   one paragraph, one button: the searchable tool lives on the data page.
   The text alternative (indexed table) is static HTML in the page. */

import { YEARS, NATIONAL } from './decline-summary-data.js';

const SVGNS = 'http://www.w3.org/2000/svg';
const SERIES = [
  { key: 'inf', stroke: '#2b2b27', dash: 'none' },
  { key: 'tmar', stroke: '#6b6656', dash: '7 4' },
  { key: 'rec', stroke: '#9a927c', dash: '2 3' },
];
const MARKERS = [
  { year: 1962, label: 'Second Vatican Council opens' },
  { year: 1970, label: 'New Roman Missal implemented' },
  { year: 2000, label: 'Great Jubilee conversion bulge' },
  { year: 2026, label: 'Reported conversion increase' },
];

function el(name, attrs, text) {
  const n = document.createElementNS(SVGNS, name);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  if (text !== undefined) n.textContent = text;
  return n;
}

export function initDeclineMini() {
  const mount = document.getElementById('decline-mini-mount');
  if (!mount) return;

  const W = 900, H = 440;
  const M = { l: 48, r: 16, t: 52, b: 40 };
  const x = (yr) => M.l + ((yr - 1918) / (2028 - 1918)) * (W - M.l - M.r);
  const y = (v) => H - M.b - (v / 132) * (H - M.t - M.b);

  const svg = el('svg', {
    viewBox: `0 0 ${W} ${H}`,
    role: 'img',
    'aria-label': 'Indexed per-capita sacramental participation, 1921 to 2025. Infant baptisms, total marriages, and receptions into full communion per Catholic all decline substantially before the Second Vatican Council opens in 1962 and continue declining after it. The indexed figures are in the table below this chart.',
  });

  // 100 reference line + axis
  svg.appendChild(el('line', { x1: M.l, x2: W - M.r, y1: y(100), y2: y(100), stroke: '#c9c2ae', 'stroke-dasharray': '4 3' }));
  svg.appendChild(el('text', { x: M.l - 8, y: y(100) + 4, 'text-anchor': 'end', 'font-size': 13, fill: '#6b6656' }, '100'));
  svg.appendChild(el('text', { x: M.l - 8, y: y(0) + 4, 'text-anchor': 'end', 'font-size': 13, fill: '#6b6656' }, '0'));
  svg.appendChild(el('line', { x1: M.l, x2: W - M.r, y1: H - M.b, y2: H - M.b, stroke: '#6b6656' }));
  for (let yr = 1920; yr <= 2020; yr += 20) {
    svg.appendChild(el('line', { x1: x(yr), x2: x(yr), y1: H - M.b, y2: H - M.b + 5, stroke: '#6b6656' }));
    svg.appendChild(el('text', { x: x(yr), y: H - M.b + 21, 'text-anchor': 'middle', 'font-size': 13, fill: '#6b6656' }, String(yr)));
  }

  // markers: quiet vertical lines with numbered discs
  MARKERS.forEach((m, i) => {
    svg.appendChild(el('line', { x1: x(m.year), x2: x(m.year), y1: M.t, y2: H - M.b, stroke: '#b5ad97', 'stroke-width': 1, 'stroke-dasharray': '5 4' }));
    svg.appendChild(el('circle', { cx: x(m.year), cy: M.t - 14, r: 10, fill: '#faf6ee', stroke: '#8a8471' }));
    svg.appendChild(el('text', { x: x(m.year), y: M.t - 10, 'text-anchor': 'middle', 'font-size': 12, fill: '#2b2b27' }, String(i + 1)));
  });

  // three grayscale lines
  for (const s of SERIES) {
    const rates = NATIONAL[s.key].rates;
    const base = rates.find((v) => v != null);
    const pts = YEARS.map((yr, i) => (rates[i] == null ? null : [x(yr), y((100 * rates[i]) / base)])).filter(Boolean);
    svg.appendChild(el('path', {
      d: pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' '),
      fill: 'none', stroke: s.stroke, 'stroke-width': 2.25,
      'stroke-dasharray': s.dash, 'stroke-linejoin': 'round',
    }));
  }

  mount.appendChild(svg);

  const legend = document.createElement('div');
  legend.className = 'sd-legend';
  for (const s of SERIES) {
    const item = document.createElement('span');
    item.className = 'sd-legend-item';
    const sw = document.createElementNS(SVGNS, 'svg');
    sw.setAttribute('viewBox', '0 0 28 6');
    sw.setAttribute('class', 'sd-swatch-line');
    sw.setAttribute('aria-hidden', 'true');
    sw.appendChild(el('line', { x1: 0, x2: 28, y1: 3, y2: 3, stroke: s.stroke, 'stroke-width': 3, 'stroke-dasharray': s.dash }));
    item.append(sw, ` ${NATIONAL[s.key].label}`);
    legend.appendChild(item);
  }
  const events = document.createElement('p');
  events.className = 'sd-legend-events';
  events.textContent = MARKERS.map((m, i) => `${i + 1} — ${m.label} (${m.year})`).join('  ·  ');
  mount.append(legend, events);
}
