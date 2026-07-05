/* "The Deficit Beneath the Activity" — the About page's full-arc chart.
   The Catholic population (navy) rises nearly fourfold while indexed
   per-capita sacramental reception (grayscale) falls to a fraction of its
   starting level; the lightly shaded space between the population line and
   the sacramental lines is the spiritual deficit the section describes.
   Years are reception years; the chart ends at 2020 — the 2024 receptions
   (submitted 2025) are excluded until the final 2025 data arrives (see
   sacramental-data.html, "Reading the Data"). Text alternative: static
   indexed table in the page. */

import { YEARS, NATIONAL, POPULATION } from './decline-summary-data.js';

const SVGNS = 'http://www.w3.org/2000/svg';
const LAST_YEAR = 2020;
const SERIES = [
  { key: 'inf', stroke: '#2b2b27', dash: 'none' },
  { key: 'tmar', stroke: '#6b6656', dash: '7 4' },
  { key: 'rec', stroke: '#9a927c', dash: '2 3' },
];
const MARKERS = [
  { year: 1962, label: 'Second Vatican Council opens' },
  { year: 1970, label: 'New Roman Missal implemented' },
  { year: 2000, label: 'Great Jubilee conversion bulge' },
];

function el(name, attrs, text) {
  const n = document.createElementNS(SVGNS, name);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  if (text !== undefined) n.textContent = text;
  return n;
}

export function initDeficit() {
  const mount = document.getElementById('deficit-chart-mount');
  if (!mount) return;

  const W = 900, H = 520;
  const M = { l: 52, r: 16, t: 52, b: 40 };
  const x = (yr) => M.l + ((yr - 1918) / (2022 - 1918)) * (W - M.l - M.r);
  const y = (v) => H - M.b - (v / 410) * (H - M.t - M.b);

  const keep = YEARS.map((yr, i) => [yr, i]).filter(([yr]) => yr <= LAST_YEAR);
  const idx = (arr, base) => keep.map(([yr, i]) => (arr[i] == null ? null : [yr, (100 * arr[i]) / base]));

  const popPts = idx(POPULATION.totals, POPULATION.totals[0]);
  const infPts = idx(NATIONAL.inf.rates, NATIONAL.inf.rates[0]);

  const svg = el('svg', {
    viewBox: `0 0 ${W} ${H}`,
    role: 'img',
    'aria-label': 'Catholic population and indexed per-capita sacramental participation, 1920 to 2020, each indexed to 100 at 1920. The Catholic population rises to roughly 388 by 2020, while infant baptisms, total marriages, and receptions into full communion per Catholic fall to between roughly 14 and 22. The gap between the rising population line and the falling sacramental lines widens across the whole century. The indexed figures are in the table below this chart.',
  });

  // The deficit wash: the widening space between population and per-capita reception.
  const washPts = popPts.concat(infPts.slice().reverse());
  svg.appendChild(el('path', {
    d: washPts.map(([yr, v], i) => `${i ? 'L' : 'M'}${x(yr).toFixed(1)},${y(v).toFixed(1)}`).join(' ') + ' Z',
    fill: 'rgba(122,31,31,0.06)', stroke: 'none',
  }));
  svg.appendChild(el('text', {
    x: x(1988), y: y(190), 'text-anchor': 'middle',
    'font-size': 15, 'font-style': 'italic', fill: '#7a1f1f',
  }, 'The widening space is the spiritual deficit'));

  // reference lines + axis
  for (const v of [100, 200, 300, 400]) {
    svg.appendChild(el('line', { x1: M.l, x2: W - M.r, y1: y(v), y2: y(v), stroke: '#c9c2ae', 'stroke-dasharray': v === 100 ? '4 3' : '1 5' }));
    svg.appendChild(el('text', { x: M.l - 8, y: y(v) + 4, 'text-anchor': 'end', 'font-size': 13, fill: '#6b6656' }, String(v)));
  }
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

  const line = (pts, attrs) => el('path', {
    d: pts.map(([yr, v], i) => `${i ? 'L' : 'M'}${x(yr).toFixed(1)},${y(v).toFixed(1)}`).join(' '),
    fill: 'none', 'stroke-linejoin': 'round', ...attrs,
  });

  // population (navy) above, three grayscale sacramental lines below
  svg.appendChild(line(popPts, { stroke: '#1b2a4a', 'stroke-width': 2.75 }));
  for (const s of SERIES) {
    const base = NATIONAL[s.key].rates.find((v) => v != null);
    svg.appendChild(line(idx(NATIONAL[s.key].rates, base).filter(Boolean), {
      stroke: s.stroke, 'stroke-width': 2.25, 'stroke-dasharray': s.dash,
    }));
  }

  mount.appendChild(svg);

  const legend = document.createElement('div');
  legend.className = 'sd-legend';
  const swatches = [{ label: POPULATION.label, stroke: '#1b2a4a', dash: 'none' }]
    .concat(SERIES.map((s) => ({ label: NATIONAL[s.key].label, stroke: s.stroke, dash: s.dash })));
  for (const s of swatches) {
    const item = document.createElement('span');
    item.className = 'sd-legend-item';
    const sw = document.createElementNS(SVGNS, 'svg');
    sw.setAttribute('viewBox', '0 0 28 6');
    sw.setAttribute('class', 'sd-swatch-line');
    sw.setAttribute('aria-hidden', 'true');
    sw.appendChild(el('line', { x1: 0, x2: 28, y1: 3, y2: 3, stroke: s.stroke, 'stroke-width': 3, 'stroke-dasharray': s.dash }));
    item.append(sw, ` ${s.label}`);
    legend.appendChild(item);
  }
  const events = document.createElement('p');
  events.className = 'sd-legend-events';
  events.textContent = MARKERS.map((m, i) => `${i + 1} — ${m.label} (${m.year})`).join('  ·  ');
  mount.append(legend, events);
}
