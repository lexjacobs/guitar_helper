import { combineReducers } from 'redux';

// default state must be included
export function exampleState(state = {count: 0}, action) {
  switch (action.type) {
  case 'EXAMPLE_ACTION_INCREASE':

    // pass-through all other state, and increment count
    return {
      ...state,
      count: state.count + 1
    };

  // must return default case for redux
  default:
    return state;
  }
}

// provides function for combining multiple producers
export const rootReducer = combineReducers({
  exampleState
});
