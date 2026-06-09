/* The Path of Holiness — seven stages across the three classical ways,
   with the rows of the source map: path of prayer, growth of love, and
   notion (seeing God rightly), plus the macro movement of the soul. */

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
    prayer: 'Vocal prayer', love: 'Fear', notion: 'Judge', macro: 'Faith',
    note: 'The soul begins its journey.',
  },
  {
    numeral: 'II', name: 'Struggle', way: 'purgative',
    prayer: 'Meditation', love: 'Obedience', notion: 'Almighty God', macro: 'Faith',
    note: 'Faith deepening toward trust.',
  },
  {
    numeral: 'III', name: 'Ordered Life', way: 'purgative',
    prayer: 'Affective prayer', love: 'Filial trust', notion: 'Friend', macro: 'Trust',
    note: 'The soul relies on God and His goodness.',
  },
  {
    numeral: 'IV', name: 'Recollection', way: 'illuminative',
    prayer: 'Recollection', love: 'Abandonment', notion: 'Redeemer', macro: 'Abandonment',
    note: 'The soul yields to God’s will and lives without reserve.',
  },
  {
    numeral: 'V', name: 'Union Begins', way: 'illuminative',
    prayer: 'Prayer of quiet', love: 'Charity', notion: 'Merciful Father', macro: 'Abandonment',
    note: 'Abandonment flowering into self-gift.',
  },
  {
    numeral: 'VI', name: 'Purifying Love', way: 'unitive',
    prayer: 'Union', love: 'Cruciform self-gift', notion: 'Bridegroom', macro: 'Self-Gift',
    note: 'The soul is one with God and gives God’s love to others.',
  },
  {
    numeral: 'VII', name: 'Spiritual Marriage', way: 'unitive',
    prayer: 'Spiritual marriage', love: 'Union', notion: 'Indwelling Love', macro: 'Union',
    note: '“It is no longer I who live, but Christ who lives in me.” (Gal 2:20) Union overflows into mission; love becomes the life of the soul and the gift to the world.',
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

export const MACROS = ['Faith', 'Trust', 'Abandonment', 'Self-Gift'];
