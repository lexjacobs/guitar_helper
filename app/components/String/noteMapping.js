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

const SCALES = {
  standard: 'e,a,d,g,b,e',
  'drop d': 'd,a,d,g,b,e',
  dadgad: 'd,a,d,g,a,d',
  daddad: 'd,a,d,d,a,d',
  'all fourths': 'e,a,d,g,c,f',
  mandoguitar: 'c,g,d,a,e,b',
  mandolin: 'g,d,a,e',
  ukulele: 'g,c,e,a',
  'open a': 'e,a,c#,e,a,e',
  'open a slide': 'e,a,e,a,c#,e',
  'open b': 'b,f#,b,f#,b,d#',
  'open c': 'c,g,c,g,c,e',
  'open d': 'd,a,d,f#,a,d',
  'open e': 'e,b,e,g#,b,e',
  'open f': 'c,f,c,f,a,c',
  'open g': 'd,g,d,g,b,d',
  ostrich: 'e,e,e,e,e,e',
  '7 string': 'b,e,a,d,g,b,e',
  'custom': ''
};

export function scaleTransform(scales){
  let final = {};
  for (var scale in scales) {
    let result;
    if (scales[scale] === '') {
      result = [];
    } else {
      result = scales[scale].split(',');
    }
    final[scale] = result;
  }
  return final;
}

export const SCALE_MAPPING = scaleTransform(SCALES);

// export const SCALE_MAPPING = {
//   standard: ['e', 'a', 'd', 'g', 'b', 'e'],
//   'drop d': ['d', 'a', 'd', 'g', 'b', 'e'],
//   dadgad: ['d', 'a', 'd', 'g', 'a', 'd'],
//   daddad: ['d', 'a', 'd', 'd', 'a', 'd'],
//   'all fourths': ['e', 'a', 'd', 'g', 'c', 'f'],
//   mandoguitar: ['c', 'g', 'd', 'a', 'e', 'b'],
//   mandolin: ['g', 'd', 'a', 'e'],
//   ukulele: ['g', 'c', 'e', 'a'],
//   'open a': ['e', 'a', 'c#', 'e', 'a', 'e'],
//   'open a slide': ['e', 'a', 'e', 'a', 'c#', 'e'],
//   'open b': ['b', 'f#', 'b', 'f#', 'b', 'd#'],
//   'open c': ['c', 'g', 'c', 'g', 'c', 'e'],
//   'open d': ['d', 'a', 'd', 'f#', 'a', 'd'],
//   'open e': ['e', 'b', 'e', 'g#', 'b', 'e'],
//   'open f': ['c', 'f', 'c', 'f', 'a', 'c'],
//   'open g': ['d', 'g', 'd', 'g', 'b', 'd'],
//   ostrich: ['e', 'e', 'e', 'e', 'e', 'e'],
//   '7 string': ['b', 'e', 'a', 'd', 'g', 'b', 'e'],
//   'custom': []
// };

export function scaleNameFromNotes (notes, mapping) {
  for (var scale in mapping) {
    if (_.isEqual(mapping[scale], notes)) {
      return scale;
    }
  }
  return 'custom';
}

export const SCALE_SET = {
  major: [2, 2, 1, 2, 2, 2, 1],
  minor: [2, 1, 2, 2, 1, 2, 2]
};
