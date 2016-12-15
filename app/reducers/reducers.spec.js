/*
global describe it
*/

import {
  expect
} from 'chai';
import * as reducer from './reducers.js';
import {DEFAULT_NOTE_SET} from '../components/String/noteMapping.js';

describe('testing reducers', () => {
  it('neckState reducer passes through unknown action', () => {
    expect(reducer.neckState(undefined, {
      type: ''
    })).to.deep.equal({
      neckNotes: ['e', 'a', 'd', 'g', 'b', 'e'],
      neckFlavor: 'withSharps',
      noteSet: DEFAULT_NOTE_SET
    });
  });
  it('neckState sets notes appropriately', () => {
    expect(reducer.neckState(undefined, {
      type: 'MAKE_NECK',
      notes: ['e', 'a', 'd', 'g', 'b', 'e']
    })).to.deep.equal({
      neckNotes: ['e', 'a', 'd', 'g', 'b', 'e'],
      neckFlavor: 'withSharps',
      noteSet: DEFAULT_NOTE_SET
    });
    expect(reducer.neckState(undefined, {
      type: 'MAKE_NECK',
      notes: ['e']
    })).to.deep.equal({
      neckNotes: ['e'],
      neckFlavor: 'withSharps',
      noteSet: DEFAULT_NOTE_SET
    });
    expect(reducer.neckState(undefined, {
      type: 'MAKE_NECK',
      notes: [0, 1, 2]
    })).to.deep.equal({
      neckNotes: [0, 1, 2],
      neckFlavor: 'withSharps',
      noteSet: DEFAULT_NOTE_SET
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
      noteSet: DEFAULT_NOTE_SET
    });
  });
  it('neckState sets and updates neck flavor appropriately', () => {
    expect(reducer.neckState(undefined, {
      type: 'SET_FLAVOR',
      flavor: 'b'
    })).to.deep.equal({
      neckFlavor: 'withFlats',
      neckNotes: ['e', 'a', 'd', 'g', 'b', 'e'],
      noteSet: DEFAULT_NOTE_SET
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
});
