/* The Sacramental Data page: indexed national chart + searchable diocesan
   table. Content lives in decline-data.js (generated from the client's
   workbook); this module only renders. The chart is a static SVG with a
   full text alternative in the page; the explorer is progressive
   enhancement — without JS the page still carries the national table. */

import { YEARS, NATIONAL, FIELDS, FIELD_LABELS, DIOCESES } from './decline-data.js';

const SVGNS = 'http://www.w3.org/2000/svg';
const SERIES = [
  { key: 'inf', color: '#1b2a4a' },
  { key: 'tmar', color: '#7a1f1f' },
  { key: 'rec', color: '#7d6326' },
];
const MARKERS = [
  { year: 1962, span: 1965, label: 'Second Vatican Council opens (1962)' },
  { year: 1970, label: 'New Roman Missal implemented (1970)' },
  { year: 2000, label: 'Great Jubilee conversion bulge (2000)' },
  { year: 2026, label: 'Reported conversion increase (2026)' },
];

function el(name, attrs, text) {
  const node = document.createElementNS(SVGNS, name);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  if (text !== undefined) node.textContent = text;
  return node;
}

function indexed(key) {
  const rates = NATIONAL[key].rates;
  const base = rates.find((v) => v != null);
  return rates.map((v) => (v == null ? null : (100 * v) / base));
}

/* ---------- Chart ---------- */

function drawChart() {
  const mount = document.getElementById('sd-chart-mount');
  if (!mount) return;

  const W = 960, H = 540;
  const M = { l: 56, r: 20, t: 56, b: 44 };
  const X0 = 1918, X1 = 2028, Y0 = 0, Y1 = 132;
  const x = (yr) => M.l + ((yr - X0) / (X1 - X0)) * (W - M.l - M.r);
  const y = (v) => H - M.b - ((v - Y0) / (Y1 - Y0)) * (H - M.t - M.b);

  const svg = el('svg', {
    viewBox: `0 0 ${W} ${H}`,
    role: 'img',
    'aria-label': 'Line chart of indexed per-capita sacramental participation in the United States, 1921 to 2025. All three lines — infant baptisms, total marriages, and receptions into full communion per Catholic — decline substantially before the Second Vatican Council opens in 1962, and continue declining after it. A full data table follows this chart.',
  });

  // gridlines + y labels
  for (let v = 0; v <= 120; v += 20) {
    svg.appendChild(el('line', { x1: M.l, x2: W - M.r, y1: y(v), y2: y(v), stroke: '#e6dcc3', 'stroke-width': v === 100 ? 1.5 : 1, 'stroke-dasharray': v === 100 ? '4 3' : 'none' }));
    svg.appendChild(el('text', { x: M.l - 8, y: y(v) + 4, 'text-anchor': 'end', 'font-size': 13, fill: '#6b6656' }, String(v)));
  }
  // x ticks each decade
  for (let yr = 1920; yr <= 2020; yr += 10) {
    svg.appendChild(el('line', { x1: x(yr), x2: x(yr), y1: H - M.b, y2: H - M.b + 5, stroke: '#6b6656' }));
    if (yr % 20 === 0) svg.appendChild(el('text', { x: x(yr), y: H - M.b + 22, 'text-anchor': 'middle', 'font-size': 13, fill: '#6b6656' }, String(yr)));
  }
  svg.appendChild(el('line', { x1: M.l, x2: W - M.r, y1: H - M.b, y2: H - M.b, stroke: '#6b6656' }));

  // Council band + event markers
  const band = MARKERS[0];
  svg.appendChild(el('rect', { x: x(band.year), y: M.t, width: x(band.span) - x(band.year), height: H - M.t - M.b, fill: 'rgba(176,141,62,0.16)' }));
  for (const m of MARKERS.slice(1)) {
    svg.appendChild(el('line', { x1: x(m.year), x2: x(m.year), y1: M.t, y2: H - M.b, stroke: '#8a8471', 'stroke-width': 1, 'stroke-dasharray': '5 4' }));
  }
  // numbered marker labels (legend below carries the text)
  MARKERS.forEach((m, i) => {
    const cx = m.span ? (x(m.year) + x(m.span)) / 2 : x(m.year);
    svg.appendChild(el('circle', { cx, cy: M.t - 16, r: 10, fill: '#faf6ee', stroke: '#8a8471' }));
    svg.appendChild(el('text', { x: cx, y: M.t - 12, 'text-anchor': 'middle', 'font-size': 12, fill: '#2b2b27' }, String(i + 1)));
  });

  // series
  for (const s of SERIES) {
    const vals = indexed(s.key);
    const pts = YEARS.map((yr, i) => (vals[i] == null ? null : [x(yr), y(vals[i]), yr, vals[i], NATIONAL[s.key].rates[i]])).filter(Boolean);
    const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
    svg.appendChild(el('path', { d, fill: 'none', stroke: s.color, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }));
    for (const p of pts) {
      const c = el('circle', { cx: p[0].toFixed(1), cy: p[1].toFixed(1), r: 3.6, fill: s.color });
      c.appendChild(el('title', {}, `${p[2]} — ${NATIONAL[s.key].label}: index ${p[3].toFixed(1)} (${p[4]} per 1,000 Catholics)`));
      svg.appendChild(c);
    }
  }

  mount.appendChild(svg);

  // HTML legend (series + event markers)
  const legend = document.createElement('div');
  legend.className = 'sd-legend';
  for (const s of SERIES) {
    const item = document.createElement('span');
    item.className = 'sd-legend-item';
    const sw = document.createElement('span');
    sw.className = 'sd-swatch';
    sw.style.background = s.color;
    item.append(sw, ` ${NATIONAL[s.key].label}`);
    legend.appendChild(item);
  }
  const events = document.createElement('p');
  events.className = 'sd-legend-events';
  events.textContent = MARKERS.map((m, i) => `${i + 1} — ${m.label}`).join('  ·  ');
  mount.append(legend, events);
}

/* ---------- Explorer ---------- */

const byYear = new Map();
for (const row of DIOCESES) {
  if (!byYear.has(row[0])) byYear.set(row[0], []);
  byYear.get(row[0]).push(row);
}
const POP = FIELDS.indexOf('pop') + 2;
const fmt = new Intl.NumberFormat('en-US');

function initExplorer() {
  const mount = document.getElementById('sd-explorer-mount');
  if (!mount) return;
  const yearSel = document.getElementById('sd-year');
  const metricSel = document.getElementById('sd-metric');
  const search = document.getElementById('sd-search');
  const state = { sort: 'value', dir: -1 };

  const yearsDesc = [...byYear.keys()].sort((a, b) => b - a);
  for (const yr of yearsDesc) yearSel.appendChild(new Option(String(yr), yr));
  for (const f of FIELDS) if (f !== 'pop') metricSel.appendChild(new Option(FIELD_LABELS[f], f));
  metricSel.value = 'inf';

  const table = document.createElement('table');
  table.className = 'sd-table';
  table.innerHTML = `
    <caption class="visually-hidden">Per-diocese sacramental figures for the selected year and measure</caption>
    <thead><tr>
      <th scope="col"><button type="button" data-sort="name">Diocese</button></th>
      <th scope="col" class="num"><button type="button" data-sort="value" id="sd-col-metric">Value</button></th>
      <th scope="col" class="num"><button type="button" data-sort="pop">Catholic population</button></th>
      <th scope="col" class="num"><button type="button" data-sort="rate">Per 1,000 Catholics</button></th>
    </tr></thead>
    <tbody></tbody><tfoot></tfoot>`;
  const scroll = document.createElement('div');
  scroll.className = 'sd-table-scroll';
  scroll.appendChild(table);
  mount.appendChild(scroll);

  table.querySelectorAll('thead button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const k = btn.dataset.sort;
      state.dir = state.sort === k ? -state.dir : (k === 'name' ? 1 : -1);
      state.sort = k;
      render();
    });
  });
  yearSel.addEventListener('change', render);
  metricSel.addEventListener('change', render);
  search.addEventListener('input', render);

  function render() {
    const yr = Number(yearSel.value);
    const fi = FIELDS.indexOf(metricSel.value) + 2;
    const q = search.value.trim().toLowerCase();
    document.getElementById('sd-col-metric').textContent = FIELD_LABELS[metricSel.value];

    let rows = (byYear.get(yr) || [])
      .filter((r) => !q || r[1].toLowerCase().includes(q))
      .map((r) => {
        const v = r[fi] ?? null;
        const pop = r[POP] ?? null;
        return { name: r[1], value: v, pop, rate: v != null && pop > 0 ? (1000 * v) / pop : null };
      });
    const dir = state.dir, k = state.sort;
    rows.sort((a, b) => {
      if (k === 'name') return dir * a.name.localeCompare(b.name);
      const av = a[k], bv = b[k];
      if (av == null && bv == null) return a.name.localeCompare(b.name);
      if (av == null) return 1;
      if (bv == null) return -1;
      return dir * (av - bv);
    });

    const tbody = table.querySelector('tbody');
    tbody.textContent = '';
    for (const r of rows) {
      const tr = document.createElement('tr');
      const cells = [r.name,
        r.value == null ? '—' : fmt.format(r.value),
        r.pop == null ? '—' : fmt.format(r.pop),
        r.rate == null ? '—' : r.rate.toFixed(2)];
      cells.forEach((c, i) => {
        const td = document.createElement(i === 0 ? 'th' : 'td');
        if (i === 0) td.setAttribute('scope', 'row'); else td.className = 'num';
        td.textContent = c;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    }

    const complete = rows.filter((r) => r.value != null && r.pop > 0);
    const tv = complete.reduce((s, r) => s + r.value, 0);
    const tp = complete.reduce((s, r) => s + r.pop, 0);
    table.querySelector('tfoot').innerHTML = complete.length
      ? `<tr><th scope="row">All reporting dioceses (${complete.length})</th>
         <td class="num">${fmt.format(tv)}</td><td class="num">${fmt.format(tp)}</td>
         <td class="num">${(1000 * tv / tp).toFixed(2)}</td></tr>`
      : '';
    document.getElementById('sd-count').textContent =
      `${rows.length} diocese${rows.length === 1 ? '' : 's'} shown for ${yr}` +
      (rows.length - complete.length ? ` — ${rows.length - complete.length} without a reported figure for this measure` : '') + '.';
  }
  render();
}

export function initDecline() {
  drawChart();
  initExplorer();
}
