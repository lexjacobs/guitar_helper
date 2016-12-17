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
  console.log('note not in scale: "', note, '"');
  return null;
}

export function makeStringFromNumber(firstNote, noteSet) {
  var result = [];
  for (var i = 0; i < noteSet.length; i++) {
    result.push(noteSet[(i + firstNote) % noteSet.length]);
  }
  return result;
}

export function makeStringFromLetter(firstNote, noteSet) {
  var result = [];
  firstNote = getNumberFromNote(firstNote, noteSet);
  for (var i = 0; i < noteSet.length; i++) {
    result.push(noteSet[(i + firstNote) % noteSet.length]);
  }
  return result;
}

export function revealNotes(noteSet = [], noteFlavor) {
  // must explicitly declare 'withFlats'
  noteFlavor = noteFlavor || 'withSharps';
  return noteSet.map((note) => note[noteFlavor]);
}

export function stringMaker(options = {}, noteSet) {
  let stringNotes;
  if (typeof options.stringStart === 'string') {
    stringNotes = makeStringFromLetter(options.stringStart, noteSet);
  }
  if (typeof options.stringStart === 'number') {
    stringNotes = makeStringFromNumber(options.stringStart, noteSet);
  }
  return {
    stringNotes
  };
}

export function neckMaker(startNotes, noteSet=DEFAULT_NOTE_SET) {
  return startNotes.map((note) => stringMaker({stringStart: note}, noteSet));
}

/*
StringMaker({stringStart: 0}) produces: { stringNotes:
   [ { withSharps: 'a', withFlats: 'a' },
     { withSharps: 'a#', withFlats: 'bb' },
      ...
     { withSharps: 'g#', withFlats: 'ab' } ] }

StringMaker({stringStart: 'c'}) produces: { stringNotes:
  [ { withSharps: 'c', withFlats: 'c' },
    { withSharps: 'c#', withFlats: 'db' },
      ...
    { withSharps: 'b', withFlats: 'b' } ] }
 */
