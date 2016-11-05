/*
global describe it
*/

import {expect} from 'chai';
import * as actions from './actions.js';

describe('testing action creators', () => {
  it('returns advanceTutorial actions with an argument correctly', () => {
    expect(actions.exampleActionIncrease(undefined)).to.deep.equal({type: 'EXAMPLE_ACTION_INCREASE'});
    expect(actions.exampleActionIncrease(-1)).to.deep.equal({type: 'EXAMPLE_ACTION_INCREASE'});
    expect(actions.exampleActionIncrease(1)).to.deep.equal({type: 'EXAMPLE_ACTION_INCREASE'});
    expect(actions.exampleActionIncrease(1000000)).to.deep.equal({type: 'EXAMPLE_ACTION_INCREASE'});
    expect(actions.exampleActionIncrease('1000000')).to.deep.equal({type: 'EXAMPLE_ACTION_INCREASE'});
    expect(actions.exampleActionIncrease('abc')).to.deep.equal({type: 'EXAMPLE_ACTION_INCREASE'});
  });
});
