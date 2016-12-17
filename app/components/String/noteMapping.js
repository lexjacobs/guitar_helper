/* global require */
var _ = require('lodash');

// ♭♯
export const DEFAULT_NOTE_SET = [{
  withSharps: 'a',
  withFlats: 'a'
}, {
  withSharps: 'a#',
  withFlats: 'bb'
}, {
  withSharps: 'b',
  withFlats: 'b'
}, {
  withSharps: 'c',
  withFlats: 'c'
}, {
  withSharps: 'c#',
  withFlats: 'db'
}, {
  withSharps: 'd',
  withFlats: 'd'
}, {
  withSharps: 'd#',
  withFlats: 'eb'
}, {
  withSharps: 'e',
  withFlats: 'e'
}, {
  withSharps: 'f',
  withFlats: 'f'
}, {
  withSharps: 'f#',
  withFlats: 'gb'
}, {
  withSharps: 'g',
  withFlats: 'g'
}, {
  withSharps: 'g#',
  withFlats: 'ab'
}];

export const SCALE_MAPPING = {
  standard: ['e', 'a', 'd', 'g', 'b', 'e'],
  'drop d': ['d', 'a', 'd', 'g', 'b', 'e'],
  dadgad: ['d', 'a', 'd', 'g', 'a', 'd'],
  daddad: ['d', 'a', 'd', 'd', 'a', 'd'],
  'all fourths': ['e', 'a', 'd', 'g', 'c', 'f'],
  mandoguitar: ['c', 'g', 'd', 'a', 'e', 'b'],
  'open a': ['e', 'a', 'c#', 'e', 'a', 'e'],
  'open a slide': ['e', 'a', 'e', 'a', 'c#', 'e'],
  'open b': ['b', 'f#', 'b', 'f#', 'b', 'd#'],
  ostrich: ['e', 'e', 'e', 'e', 'e', 'e'],
  '7 string': ['b', 'e', 'a', 'd', 'g', 'b', 'e'],
  '-': [],
};

export function scaleNameFromNotes (notes, mapping) {
  for (var scale in mapping) {
    if (_.isEqual(mapping[scale], notes)) {
      return scale;
    }
  }
  return '-';
}
