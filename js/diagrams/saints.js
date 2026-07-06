/* "The Saints God Sends" — century frieze. Renders the essay's five-column
   table as a procession of saint chips grouped by century; selecting a chip
   fills the adjacent detail panel with the crisis, the error confronted, and
   the form of holiness God gave in answer. The full table also lives in the
   page's text-version <details>, which is the no-JS fallback.
   Plain buttons (no SVG), so the frieze stays legible at every width.

   Keyboard: the frieze is one tab stop (roving tabindex); arrow keys move
   along it, Home/End jump to the ends, Enter/Space select.
   Deep links: saints.html#<id> (ids from saints-data.js, e.g. #margaret-mary)
   selects that chip on load and on hashchange — other pages link specific
   rows this way. The ids exist only once the frieze renders; without JS the
   fragment is simply ignored and the reader has the static table. */

import { SAINTS } from './saints-data.js';

export function initSaints() {
  const mount = document.getElementById('saints-frieze-mount');
  const panel = document.getElementById('saints-panel');
  if (!mount || !panel) return;

  /* Group consecutive entries by century — the data is chronological. */
  const groups = [];
  for (const s of SAINTS) {
    const last = groups[groups.length - 1];
    if (last && last.century === s.century) last.saints.push(s);
    else groups.push({ century: s.century, saints: [s] });
  }

  const rail = document.createElement('ol');
  rail.className = 'frieze-rail';
  rail.setAttribute('aria-label',
    'The saints God sends, century by century. Once a saint has focus, the arrow keys move along the frieze.');

  const buttons = [];
  const byId = new Map();
  /* Below this width the panel sits under the ledger, so a tap should bring
     it into view; above it the panel stands sticky alongside. */
  const wide = window.matchMedia ? window.matchMedia('(min-width: 900px)') : { matches: true };

  for (const group of groups) {
    const era = document.createElement('li');
    era.className = 'frieze-era';

    const label = document.createElement('span');
    label.className = 'frieze-era-label';
    label.textContent = group.century;
    era.appendChild(label);

    const chips = document.createElement('span');
    chips.className = 'frieze-chips';
    for (const saint of group.saints) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.id = saint.id;
      btn.className = saint.open ? 'frieze-chip frieze-chip-open' : 'frieze-chip';
      btn.textContent = saint.name;
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-controls', 'saints-panel');
      btn.setAttribute('tabindex', buttons.length === 0 ? '0' : '-1');
      btn.addEventListener('click', () => {
        select(saint, btn);
        setRoving(buttons.indexOf(btn));
        if (!wide.matches) panel.scrollIntoView({ block: 'nearest' });
      });
      btn.addEventListener('keydown', (e) => {
        const idx = buttons.indexOf(btn);
        let next = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = Math.min(buttons.length - 1, idx + 1);
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = Math.max(0, idx - 1);
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = buttons.length - 1;
        if (next !== null && next !== idx) {
          e.preventDefault();
          setRoving(next);
          buttons[next].focus();
        } else if (next !== null) {
          e.preventDefault();
        }
      });
      chips.appendChild(btn);
      buttons.push(btn);
      byId.set(saint.id, { saint, btn });
    }
    era.appendChild(chips);
    rail.appendChild(era);
  }

  mount.appendChild(rail);

  function setRoving(index) {
    buttons.forEach((b, i) => b.setAttribute('tabindex', i === index ? '0' : '-1'));
  }

  function select(saint, btn) {
    for (const b of buttons) {
      b.classList.remove('selected');
      b.setAttribute('aria-expanded', 'false');
    }
    btn.classList.add('selected');
    btn.setAttribute('aria-expanded', 'true');

    const sub = saint.open
      ? 'The row still being written'
      : `${saint.century} century`;
    const openFields = saint.open
      ? `<dt>Already given</dt><dd><em>${saint.saint.replace('Already given: ', '')}</em></dd>`
      : '';
    /* The open row is wired to the substitutes taxonomy: its errors are the
       ones holiness.html#why-replaced examines one by one. */
    const more = saint.open
      ? `<p class="frieze-panel-more">These errors are the substitutes this site names. They are examined one by one in <a href="holiness.html#why-replaced">Why Holiness Is Replaced</a>.</p>`
      : '';

    panel.innerHTML = `
      <h3 class="diagram-panel-title">${saint.name}</h3>
      <p class="diagram-panel-sub">${sub}</p>
      <dl class="diagram-panel-fields">
        <dt>Crisis addressed</dt>
        <dd>${saint.crisis}</dd>
        <dt>Heresy or error confronted</dt>
        <dd>${saint.error}</dd>
        ${openFields}
        <dt>Characteristic form of holiness</dt>
        <dd>${saint.open ? `<em>${saint.holiness}</em>` : saint.holiness}</dd>
      </dl>
      ${more}`;
  }

  /* Deep links: select the chip named by the URL fragment, now and whenever
     the fragment changes (in-page links, back/forward). */
  function applyHash() {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const hit = byId.get(id);
    if (!hit) return;
    select(hit.saint, hit.btn);
    setRoving(buttons.indexOf(hit.btn));
    hit.btn.scrollIntoView({ block: 'center' });
  }
  applyHash();
  window.addEventListener('hashchange', applyHash);
}
