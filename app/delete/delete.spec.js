/* global describe it */
import {expect} from 'chai';
import * as actions from './delete.js';

describe('testing functions', () => {
  // delivers in lexicographical order
  it('longestCommon', () => {
    expect(actions.longestCommon).to.be.a('function');
    let s1 = 'bertrandrussell';
    let s2 = 'lemonbertrand';
    expect(actions.longestCommon(s1, s2)).to.deep.equal(['bertrand']);
    s1 = 'aaherazzbert';
    s2 = 'aasherazberty';
    expect(actions.longestCommon(s1, s2)).to.deep.equal([ 'heraz', 'zbert' ]);
  });
});
