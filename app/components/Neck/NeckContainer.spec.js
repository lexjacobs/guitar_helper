/*
global describe it
*/

import configureMockStore from 'redux-mock-store';
import React from 'react';
import {expect} from 'chai';
import {Neck} from './NeckContainer.jsx';
import {Provider} from 'react-redux';
import {mount} from 'enzyme';
import * as actions from '../../actions/actions.js';
import {DEFAULT_NOTE_SET} from '../String/noteMapping.js';

const mockStore = configureMockStore();

describe('testing neck component', () => {

  let store = mockStore({
    neckState: {
      neckNotes: ['e','a','d','g','b','e'],
      neckFlavor: 'withSharps',
      noteSet: DEFAULT_NOTE_SET
    }
  });

  const wrapper = mount(
    <Provider store={store}>
      <Neck/>
    </Provider>
  );

  store.dispatch(actions.setFlavor('#'));
  store.dispatch(actions.makeNeck(['a', 'b', 'c']));

  it('renders a redux wrapped component', () => {
    expect(wrapper.find(Neck).length).to.equal(1);
  });
  it('dispatches the expected action', () => {
    expect(store.getActions()).to.deep.equal([
      {
        type: 'SET_FLAVOR',
        flavor: '#'
      }, {
        type: 'MAKE_NECK',
        notes: ['a', 'b', 'c']
      }
    ]);
  });
});
