/*
global describe it
*/

import {expect} from 'chai';
import * as actions from './actions.js';

describe('testing action creators', () => {
  it('returns the parameters for makeNeck properly',  () => {
    let testNotes = [0, 1, 2];
    expect(actions.makeNeck(testNotes)).to.deep.equal({type: 'MAKE_NECK', notes: testNotes});
  });

});
