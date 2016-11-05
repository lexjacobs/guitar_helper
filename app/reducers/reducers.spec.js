/*
global describe it
*/

import {expect} from 'chai';
import * as reducer from './reducers.js';

describe('testing reducers', () => {
  it('exampleState reducer passes through unknown action', () => {
    expect(reducer.exampleState(undefined, {type: ''})).to.deep.equal({count: 0});
  });
  it('exampleState sets and increments default state', () => {
    expect(reducer.exampleState(undefined, {type: 'EXAMPLE_ACTION_INCREASE'})).to.deep.equal({count: 1});
    expect(reducer.exampleState({count: 1}, {type: 'EXAMPLE_ACTION_INCREASE'})).to.deep.equal({count: 2});
    expect(reducer.exampleState({count: 2}, {type: 'EXAMPLE_ACTION_INCREASE'})).to.deep.equal({count: 3});
  });
  it('exampleState sets and increments existing state', () => {
    expect(reducer.exampleState({count: 41}, {type: 'EXAMPLE_ACTION_INCREASE'})).to.deep.equal({count: 42});
  });
});
