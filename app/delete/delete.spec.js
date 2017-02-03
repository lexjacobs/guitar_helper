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
    expect(actions.treeMaker(3)).to.be.a.object;
    expect(new actions.treeMaker(3).value).to.equal(3);
    expect(new actions.treeMaker(3)).to.be.an.instanceOf(actions.treeMaker);
    expect(new actions.treeMaker(3)).to.have.property('value');
    expect(new actions.treeMaker(3)).to.have.property('addLeft');
    expect(new actions.treeMaker(3)).to.have.property('addRight');
    expect(new actions.treeMaker(3)).to.have.property('walkTree');
    expect(new actions.treeMaker(3).walkTree()).to.deep.equal([3]);

    /*
       1
    2     3
  4  5   6  7
     */
    let tree = new actions.treeMaker(1);
    tree.addLeft(2);
    tree.addRight(3);
    expect(tree.walkTree()).to.deep.equal([2, 1, 3]);
    tree.left.addLeft(4);
    tree.left.addRight(5);
    tree.right.addLeft(6);
    tree.right.addRight(7);
    expect(tree.walkTree()).to.deep.equal([4, 2, 5, 1, 6, 3, 7]);


    /*
         1
     2       3
  4    5    6  7
8  9
*/
    tree = new actions.treeMaker(1);
    tree.addLeft(2);
    tree.addRight(3);
    expect(tree.walkTree()).to.deep.equal([2, 1, 3]);
    tree.left.addLeft(4);
    tree.left.addRight(5);
    tree.right.addLeft(6);
    tree.right.addRight(7);
    tree.left.left.addLeft(8);
    tree.left.left.addRight(9);
    expect(tree.walkTree()).to.deep.equal([8, 4, 9, 2, 5, 1, 6, 3, 7]);

  });
});
