/* Entry point. Wires features according to <body data-*> attributes and
   which mount elements exist on the page. Diagram modules load on demand so
   contemplative pages stay near zero-JS. */

import { injectChrome } from './include.js';
import { initNav } from './nav.js';
import { initReveal } from './reveal.js';

document.documentElement.classList.add('js');

injectChrome();
initNav();
initReveal();

if (document.body.dataset.essay !== undefined) {
  import('./essay.js').then((m) => m.initEssay());
}

const diagrams = [
  ['substitutes-figure', './diagrams/substitutes.js', 'initSubstitutes'],
  ['path-figure', './diagrams/path.js', 'initPath'],
  ['causality-figure', './diagrams/causality.js', 'initCausality'],
];

for (const [id, mod, fn] of diagrams) {
  if (document.getElementById(id)) {
    import(mod).then((m) => m[fn]());
  }
}
