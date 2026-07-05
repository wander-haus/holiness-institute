/* The Path of Holiness — seven stages across the three classical ways,
   with the rows of the source map: path of prayer, growth of love, and
   notion (seeing God rightly), plus the macro movement of the soul.

   Each stage also carries three "lenses" (per the July 2026 plan): the same
   path read as stages of prayer, as the maturation of trust, and as pastoral
   implications.
   NOTE for client review: the lens texts below are drafted from the essay's
   material and need Steve's review — especially the pastoral lens. */

export const LENSES = [
  { id: 'prayer', label: 'Stages of prayer' },
  { id: 'trust', label: 'Maturation of trust' },
  { id: 'pastoral', label: 'Pastoral implications' },
];

export const WAYS = [
  {
    id: 'purgative',
    name: 'The Purgative Way',
    desc: 'Faith awakened: conversion, repentance, vocal prayer, meditation, moral struggle, beginnings of virtue, fear of God purified into filial trust.',
  },
  {
    id: 'illuminative',
    name: 'The Illuminative Way',
    desc: 'Trust deepens: recollection, infused prayer begins, surrender grows, charity becomes more interior — the first deep transition from managing the spiritual life to receiving God’s action.',
  },
  {
    id: 'unitive',
    name: 'The Unitive Way',
    desc: 'Abandonment becomes stable; the dark nights purify the soul’s remaining self-possession; union flowers into self-gift, spiritual marriage; love becomes the form of life.',
  },
];

export const STAGES = [
  {
    numeral: 'I', name: 'Awakening', way: 'purgative',
    prayer: 'Vocal prayer', love: 'Fear', notion: 'Judge', macro: 'Belief',
    note: 'The soul begins its journey.',
    lenses: {
      prayer: 'Vocal prayer: the soul learns to speak to God at all — set prayers, honest words, the first habit of turning toward Him.',
      trust: 'Trust begins as fear seeking safety: the soul believes God exists and hopes to escape judgment.',
      pastoral: 'Souls at this stage need awakening, not administration: preaching that makes God real, and a reason to begin to pray.',
    },
  },
  {
    numeral: 'II', name: 'Struggle', way: 'purgative',
    prayer: 'Meditation', love: 'Obedience', notion: 'Almighty God', macro: 'Belief',
    note: 'Faith deepening toward trust.',
    lenses: {
      prayer: 'Meditation: the mind engages revealed truth; Scripture and the mysteries of Christ become the matter of prayer.',
      trust: 'Trust as obedience: the soul does what God commands, though it still watches Him warily.',
      pastoral: 'Souls here need patient formation: clear moral teaching joined to mercy, lest struggle harden into scrupulosity or discouragement.',
    },
  },
  {
    numeral: 'III', name: 'Ordered Life', way: 'purgative',
    prayer: 'Affective prayer', love: 'Filial trust', notion: 'Friend', macro: 'Trust',
    note: 'The soul relies on God and His goodness.',
    lenses: {
      prayer: 'Affective prayer: the heart begins to lead; prayer simplifies from many thoughts to loving attention.',
      trust: 'Filial trust: the soul begins to rely on God’s goodness, not merely His power.',
      pastoral: 'Programs can carry a soul this far — and often stop here. The danger is mistaking the ordered life for the goal.',
    },
  },
  {
    numeral: 'IV', name: 'Recollection', way: 'illuminative',
    prayer: 'Recollection', love: 'Abandonment', notion: 'Redeemer', macro: 'Abandonment',
    note: 'The soul yields to God’s will and lives without reserve.',
    lenses: {
      prayer: 'Recollection: the soul gathers inward; God’s presence begins to be received rather than produced.',
      trust: 'Abandonment begins: trusting when He is silent, yielding what prayer cannot secure.',
      pastoral: 'Here most pastoral care ends and many souls are left without guides: the passage into receptivity needs spiritual direction, not more activity.',
    },
  },
  {
    numeral: 'V', name: 'Union Begins', way: 'illuminative',
    prayer: 'Prayer of quiet', love: 'Charity', notion: 'Merciful Father', macro: 'Abandonment',
    note: 'Abandonment flowering into self-gift.',
    lenses: {
      prayer: 'Prayer of quiet: infused prayer begins; God gives what effort cannot take.',
      trust: 'Confidence deepens into charity: the soul trusts enough to stop negotiating with God.',
      pastoral: 'A parish that cannot recognize infused prayer will misread its contemplatives as idle. Shepherds must know this country to lead souls into it.',
    },
  },
  {
    numeral: 'VI', name: 'Purifying Love', way: 'unitive',
    prayer: 'Union', love: 'Cruciform self-gift', notion: 'Bridegroom', macro: 'Self-Gift',
    note: 'The soul is one with God and gives God’s love to others.',
    lenses: {
      prayer: 'Union: the will rests habitually in God; prayer and life begin to be one offering.',
      trust: 'Trust is crucified and survives: the soul trusts God against every felt evidence.',
      pastoral: 'Souls in this purification need fathers, not managers: accompaniment through a darkness no program can schedule.',
    },
  },
  {
    numeral: 'VII', name: 'Spiritual Marriage', way: 'unitive',
    prayer: 'Spiritual marriage', love: 'Union', notion: 'Indwelling Love', macro: 'Union',
    note: '“It is no longer I who live, but Christ who lives in me.” (Gal 2:20) Union overflows into mission; love becomes the life of the soul and the gift to the world.',
    lenses: {
      prayer: 'Spiritual marriage: the soul’s permanent union with God; prayer has become the soul’s very life.',
      trust: 'Trust is complete: “Father, into your hands” has become the form of the soul’s life.',
      pastoral: 'One soul here renews a parish more than a decade of initiatives: sanctity is the Church’s true pastoral strategy.',
    },
  },
];

/* Interstitial purifications: each falls after the stage at `after` (0-based index). */
export const NIGHTS = [
  {
    after: 2,
    name: 'Dark Night of the Senses',
    desc: 'Purification of appetites, consolations, and dependence on felt devotion.',
  },
  {
    after: 4,
    name: 'Dark Night of the Soul',
    desc: 'Purification of subtle pride, control, spiritual possession, and the self’s last claim on God.',
  },
];

/* Named "Belief" (not "Faith") to echo section VI of the Holiness page,
   "From Belief to Trust, Abandonment, and Self-Gift", which the path-strip
   under the substitutes figure also links to. */
export const MACROS = ['Belief', 'Trust', 'Abandonment', 'Self-Gift'];
