/*
global describe it
*/

import {
  expect
} from 'chai';
import * as reducer from './reducers.js';
import {DEFAULT_NOTE_SET} from '../components/String/noteMapping.js';

describe('testing reducers', () => {
  it('adds a string successfully', () => {
    expect(reducer.neckState({neckNotes: ['e']}, {type: 'ADD_STRING'})).to.deep.equal({neckNotes: ['e', 'a']});
    expect(reducer.neckState({neckNotes: []}, {type: 'ADD_STRING'})).to.deep.equal({neckNotes: ['a']});
    var longTest = [];
    for (var i = 0; i < 100; i++) {
      longTest.push('marlon brando');
    }
    expect(reducer.neckState({neckNotes: longTest}, {type: 'ADD_STRING'})['neckNotes'][100]).to.equal('a');
  });
  it('deletes a solo string successfully', () => {
    expect(reducer.neckState({neckNotes: ['e']}, {type: 'DELETE_STRING', stringNumber: 0})).to.deep.equal({neckNotes: []});
  });
  it('deletes a target string successfully', () => {
    expect(reducer.neckState({neckNotes: ['e', 'a', 'd']}, {type: 'DELETE_STRING', stringNumber: 0})).to.deep.equal({neckNotes: ['a', 'd']});
  });
  it('deletes a string and handles missing index', () => {
    expect(reducer.neckState({neckNotes: ['e']}, {type: 'DELETE_STRING', stringNumber: 300502}).doesNotThrow);
  });
  it('neckState reducer passes through unknown action', () => {
    expect(reducer.neckState(undefined, {
      type: ''
    })).to.deep.equal({
      neckNotes: ['e', 'a', 'd', 'g', 'b', 'e'],
      neckFlavor: 'withSharps',
      noteSet: DEFAULT_NOTE_SET,
      scaleStart: 'c',
      scaleName: 'major'
    });
  });
  it('neckState sets notes appropriately', () => {
    expect(reducer.neckState(undefined, {
      type: 'MAKE_NECK',
      notes: ['e', 'a', 'd', 'g', 'b', 'e']
    })).to.deep.equal({
      neckNotes: ['e', 'a', 'd', 'g', 'b', 'e'],
      neckFlavor: 'withSharps',
      noteSet: DEFAULT_NOTE_SET,
      scaleStart: 'c',
      scaleName: 'major'
    });
    expect(reducer.neckState(undefined, {
      type: 'MAKE_NECK',
      notes: ['e']
    })).to.deep.equal({
      neckNotes: ['e'],
      neckFlavor: 'withSharps',
      noteSet: DEFAULT_NOTE_SET,
      scaleStart: 'c',
      scaleName: 'major'
    });
    expect(reducer.neckState(undefined, {
      type: 'MAKE_NECK',
      notes: [0, 1, 2]
    })).to.deep.equal({
      neckNotes: [0, 1, 2],
      neckFlavor: 'withSharps',
      noteSet: DEFAULT_NOTE_SET,
      scaleName: 'major',
      scaleStart: 'c'
    });
  });
  it('neckState sets and increments existing state', () => {
    expect(reducer.neckState({
      neckNotes: ['a', 'b', 'c']
    }, {
      type: 'MAKE_NECK',
      notes: ['d', 'e', 'f']
    })).to.deep.equal({
      neckNotes: ['d', 'e', 'f']
    });
  });
  it('neckState sets and updates neck flavor appropriately', () => {
    expect(reducer.neckState(undefined, {
      type: 'SET_FLAVOR',
      flavor: '#'
    })).to.deep.equal({
      neckFlavor: 'withSharps',
      neckNotes: ['e', 'a', 'd', 'g', 'b', 'e'],
      noteSet: DEFAULT_NOTE_SET,
      scaleName: 'major',
      scaleStart: 'c'
    });
  });
  it('neckState sets and updates neck flavor appropriately', () => {
    expect(reducer.neckState(undefined, {
      type: 'SET_FLAVOR',
      flavor: 'b'
    })).to.deep.equal({
      neckFlavor: 'withFlats',
      neckNotes: ['e', 'a', 'd', 'g', 'b', 'e'],
      noteSet: DEFAULT_NOTE_SET,
      scaleName: 'major',
      scaleStart: 'c'
    });
  });
  it('neckState sets and updates neck flavor appropriately', () => {
    expect(reducer.neckState({neckFlavor: 'withSharps'}, {
      type: 'SET_FLAVOR',
      flavor: 'b'
    })).to.deep.equal({
      neckFlavor: 'withFlats',
    });
    expect(reducer.neckState({neckFlavor: 'withFlats'}, {
      type: 'SET_FLAVOR',
      flavor: '#'
    })).to.deep.equal({
      neckFlavor: 'withSharps',
    });
    expect(reducer.neckState({neckFlavor: 'withFlats'}, {
      type: 'SET_FLAVOR',
      flavor: 'b'
    })).to.deep.equal({
      neckFlavor: 'withFlats',
    });
    expect(reducer.neckState({neckFlavor: 'withSharps'}, {
      type: 'SET_FLAVOR',
      flavor: '#'
    })).to.deep.equal({
      neckFlavor: 'withSharps',
    });
  });
  it('neckState changes the tuning of individual strings accordingly', () => {
    // stringNumber designated
    var answerKey = {
      0: ['a#', 'a', 'a'],
      1: ['a', 'a#', 'a'],
      2: ['a', 'a', 'a#']
    };
    for (var i = 0; i < 3; i++) {
      expect(reducer.neckState({neckNotes: ['a', 'a', 'a'], neckFlavor: 'withSharps', noteSet: DEFAULT_NOTE_SET}, {
        type: 'ADJUST_STRING',
        stringNumber: i,
        direction: 'up'
      })).to.deep.equal({
        neckNotes: answerKey[i],
        neckFlavor: 'withSharps',
        noteSet: DEFAULT_NOTE_SET
      });
    }
  });
  it('neckState changes the tuning of individual strings and can go over the edge', () => {
    var answerKey = {
      0: ['g#', 'a', 'a'],
      1: ['a', 'g#', 'a'],
      2: ['a', 'a', 'g#']
    };
    for (var i = 0; i < 3; i++) {
      expect(reducer.neckState({neckNotes: ['a', 'a', 'a'], neckFlavor: 'withSharps', noteSet: DEFAULT_NOTE_SET}, {
        type: 'ADJUST_STRING',
        stringNumber: i,
        direction: 'down'
      })).to.deep.equal({
        neckNotes: answerKey[i],
        neckFlavor: 'withSharps',
        noteSet: DEFAULT_NOTE_SET
      });
    }
    answerKey = {
      0: ['a', 'g#', 'g#'],
      1: ['g#', 'a', 'g#'],
      2: ['g#', 'g#', 'a']
    };
    for (i = 0; i < 3; i++) {
      // stringNumber designated
      expect(reducer.neckState({neckNotes: ['g#', 'g#', 'g#'], neckFlavor: 'withSharps', noteSet: DEFAULT_NOTE_SET}, {
        type: 'ADJUST_STRING',
        stringNumber: i,
        direction: 'up'
      })).to.deep.equal({
        neckNotes: answerKey[i],
        neckFlavor: 'withSharps',
        noteSet: DEFAULT_NOTE_SET
      });
    }
  });
  it('neckState changes the tuning of individual strings and doesn\'t care how many repetitions are made', () => {
    var directionKey = {
      0: 'down',
      1: 'up',
      2: 'down',
    };
    for (var i = 0; i < 3; i++) {

      var testState = {neckNotes: ['a', 'a', 'a'], neckFlavor: 'withSharps', noteSet: DEFAULT_NOTE_SET};
      var testReducer = {
        type: 'ADJUST_STRING',
        stringNumber: i,
        direction: directionKey[i]
      };
      // does multiples of 12s
      for (var j = 0; j < (120 * (i+1)); j++) {
        testState = reducer.neckState(testState, testReducer);
      }

      expect(testState).to.deep.equal({
        neckNotes: ['a', 'a', 'a'],
        neckFlavor: 'withSharps',
        noteSet: DEFAULT_NOTE_SET
      });
    }
  });
  it('neckState changes the tuning of the entire neck and doesn\'t care how many repetitions are made', () => {
    var directionKey = {
      0: 'down',
      1: 'up',
      2: 'down',
    };
    for (var i = 0; i < 3; i++) {
      // no stringNumber designated
      var testState = {neckNotes: ['a', 'a', 'a'], neckFlavor: 'withSharps', noteSet: DEFAULT_NOTE_SET};
      var testReducer = {
        type: 'ADJUST_STRING',
        direction: directionKey[i]
      };
      // does multiples of 12s
      for (var j = 0; j < (120 * (i+1)); j++) {
        testState = reducer.neckState(testState, testReducer);
      }

      expect(testState).to.deep.equal({
        neckNotes: ['a', 'a', 'a'],
        neckFlavor: 'withSharps',
        noteSet: DEFAULT_NOTE_SET
      });
    }
  });
  it('neckState changes the tuning of the entire neck accordingly', () => {
    // no stringNumber designated
    expect(reducer.neckState({neckNotes: ['a', 'a', 'a'], neckFlavor: 'withSharps', noteSet: DEFAULT_NOTE_SET}, {
      type: 'ADJUST_STRING',
      direction: 'up'
    })).to.deep.equal({
      neckNotes: ['a#', 'a#', 'a#'],
      neckFlavor: 'withSharps',
      noteSet: DEFAULT_NOTE_SET
    });
    // no stringNumber designated
    expect(reducer.neckState({neckNotes: ['g#', 'g#', 'g#'], neckFlavor: 'withSharps', noteSet: DEFAULT_NOTE_SET}, {
      type: 'ADJUST_STRING',
      direction: 'up'
    })).to.deep.equal({
      neckNotes: ['a', 'a', 'a'],
      neckFlavor: 'withSharps',
      noteSet: DEFAULT_NOTE_SET
    });
    // no stringNumber designated
    expect(reducer.neckState({neckNotes: ['g#', 'g#', 'g#'], neckFlavor: 'withSharps', noteSet: DEFAULT_NOTE_SET}, {
      type: 'ADJUST_STRING',
      direction: 'down'
    })).to.deep.equal({
      neckNotes: ['g', 'g', 'g'],
      neckFlavor: 'withSharps',
      noteSet: DEFAULT_NOTE_SET
    });
    // no stringNumber designated
    expect(reducer.neckState({neckNotes: ['a', 'a', 'a'], neckFlavor: 'withSharps', noteSet: DEFAULT_NOTE_SET}, {
      type: 'ADJUST_STRING',
      direction: 'down'
    })).to.deep.equal({
      neckNotes: ['g#', 'g#', 'g#'],
      neckFlavor: 'withSharps',
      noteSet: DEFAULT_NOTE_SET
    });
  });
});
