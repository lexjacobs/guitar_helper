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
  it('splicePiece', () => {
    expect(actions.splicePiece).to.be.a('function');
    let s1 = 'lemonbertrand';
    let s2 = 'bert';
    expect(actions.splicePiece(s1, s2)).to.deep.equal({segment: s2, left: 'lemon', right: 'rand'});
    s1 = 'lemonbertrand';
    s2 = 'lemon';
    expect(actions.splicePiece(s1, s2)).to.deep.equal({segment: s2, left: '', right: 'bertrand'});
    s1 = 'lemonbertrand';
    s2 = 'bertrand';
    expect(actions.splicePiece(s1, s2)).to.deep.equal({segment: s2, left: 'lemon', right: ''});
  });
  it('constructString', () => {
    expect(actions.constructString).to.be.a('function');
    expect(actions.constructString([])).to.be.equal('');
    let original = 'hello';
    let updated = 'hello';
    let result = 'hello';
    expect(actions.constructString([{original: original, updated: updated}])).to.be.equal(result);
    original = 'bertrand';
    updated = 'lemon';
    result = '(bertrand)[lemon]';
    expect(actions.constructString([{original: original, updated: updated}])).to.be.equal(result);
    original = '';
    updated = 'lemon';
    result = '[lemon]';
    expect(actions.constructString([{original: original, updated: updated}])).to.be.equal(result);
    original = 'bertrand';
    updated = '';
    result = '(bertrand)';
    expect(actions.constructString([{original: original, updated: updated}])).to.be.equal(result);
    original = '';
    updated = '';
    result = '';
    expect(actions.constructString([{original: original, updated: updated}])).to.be.equal(result);
  });
  it('treeMaker', () => {
    expect(actions.treeMaker).to.be.a('function');
    
  });
});
