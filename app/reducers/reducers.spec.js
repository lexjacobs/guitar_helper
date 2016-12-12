/*
global describe it
*/

import {expect} from 'chai';
import * as reducer from './reducers.js';

describe('testing reducers', () => {
  it('neckState reducer passes through unknown action', () => {
    expect(reducer.neckState(undefined, {type: ''})).to.deep.equal( {neckNotes: ['e', 'a', 'd', 'g', 'b', 'e']});
  });
  it('neckState sets notes appropriately', () => {
    expect(reducer.neckState(undefined, {type: 'MAKE_NECK', notes: ['e', 'a', 'd', 'g', 'b', 'e']})).to.deep.equal({neckNotes: ['e', 'a', 'd', 'g', 'b', 'e']});
    expect(reducer.neckState(undefined, {type: 'MAKE_NECK', notes: ['e']})).to.deep.equal({neckNotes: ['e']});
    expect(reducer.neckState(undefined, {type: 'MAKE_NECK', notes: [0, 1, 2]})).to.deep.equal({neckNotes: [0, 1, 2]});
  });
  it('neckState sets and increments existing state', () => {
    expect(reducer.neckState({neckNotes: ['a', 'b', 'c']}, {type: 'MAKE_NECK', notes: ['d', 'e', 'f']})).to.deep.equal({neckNotes: ['d', 'e', 'f']});
  });
});
