/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "DEFAULT" }]*/

import {
  DEFAULT_NOTE_SET
} from './noteMapping.js';

export function getNoteFromNumber(num, noteSet) {
  return noteSet[num];
}

export function getNumberFromNote(note, noteSet) {
  for (var i = 0; i < noteSet.length; i++) {
    for (var flavor in noteSet[i]) {
      if (noteSet[i][flavor] === note) {
        return i;
      }
    }
  }
  console.log('note not in scale');
  return null;
}

export function makeString(firstNote, noteSet) {
  var result = [];
  for (var i = 0; i < noteSet.length; i++) {
    result.push(noteSet[(i + firstNote) % noteSet.length]);
  }
  return result;
}

export function stringMaker(options) {
  if (options === undefined) console.log('Missing options');

  let stringNotes = makeString(options.stringStart, DEFAULT_NOTE_SET);

  return {
    stringNotes
  };
}

/*
StringMaker({stringStart: 0}) produces: { stringNotes:
   [ { withSharps: 'a', withFlats: 'a' },
     { withSharps: 'a#', withFlats: 'bb' },
     { withSharps: 'b', withFlats: 'b' },
     { withSharps: 'c', withFlats: 'c' },
     { withSharps: 'c#', withFlats: 'db' },
     { withSharps: 'd', withFlats: 'd' },
     { withSharps: 'd#', withFlats: 'eb' },
     { withSharps: 'e', withFlats: 'e' },
     { withSharps: 'f', withFlats: 'f' },
     { withSharps: 'f#', withFlats: 'gb' },
     { withSharps: 'g', withFlats: 'g' },
     { withSharps: 'g#', withFlats: 'ab' } ] }
 */
