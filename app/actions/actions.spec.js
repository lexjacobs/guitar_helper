/*
global describe it
*/

import {expect} from 'chai';
import * as actions from './actions.js';

describe('testing action creators', () => {

  it('returns the parameters for adjustString properly', () => {
    let testDirection = 'up';
    let testStringNumber;
    expect(actions.adjustString(testDirection, testStringNumber)).to.deep.equal({type: 'ADJUST_STRING', direction: 'up', stringNumber: undefined});
    testDirection = 'up';
    testStringNumber = 0;
    expect(actions.adjustString(testDirection, testStringNumber)).to.deep.equal({type: 'ADJUST_STRING', direction: 'up', stringNumber: 0});
    testDirection = 'zippy lippy';
    testStringNumber = 'testStringNumber';
    expect(actions.adjustString(testDirection, testStringNumber)).to.deep.equal({type: 'ADJUST_STRING', direction: 'zippy lippy', stringNumber: 'testStringNumber'});

  });

  it('returns the parameters for makeNeck properly', () => {
    let testNotes = [0, 1, 2];
    expect(actions.makeNeck(testNotes)).to.deep.equal({type: 'MAKE_NECK', notes: testNotes});
  });

  it('handles the parameters for setFlavor properly', () => {
    let testFlavorFlats = 'b';
    expect(actions.setFlavor(testFlavorFlats)).to.deep.equal({type: 'SET_FLAVOR', flavor: testFlavorFlats});

    let testFlavorSharps = '#';
    expect(actions.setFlavor(testFlavorSharps)).to.deep.equal({type: 'SET_FLAVOR', flavor: testFlavorSharps});
  });

});
