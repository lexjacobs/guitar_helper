/*
global describe it
*/

import configureMockStore from 'redux-mock-store';
import React from 'react';
import {expect} from 'chai';
import {Neck} from './NeckContainer.jsx';
import {Provider} from 'react-redux';
import {mount} from 'enzyme';

const mockStore = configureMockStore();

describe('testing component', () => {

  let store = mockStore({
    exampleState: {
      count: 1
    }
  });

  const wrapper = mount(
    <Provider store={store}>
      <Neck/>
    </Provider>
  );

  it('renders a redux wrapped component', () => {
    expect(wrapper.find(Neck).length).to.equal(1);
  });
});
