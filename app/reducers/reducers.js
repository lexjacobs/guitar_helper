import { combineReducers } from 'redux';

// default state must be included
export function neckState(state = {neckNotes: ['e', 'a', 'd', 'g', 'b', 'e']}, action) {
  switch (action.type) {
  case 'MAKE_NECK':

    // pass-through all other state, and increment count
    return {
      ...state,
      neckNotes: action.notes
    };

  // must return default case for redux
  default:
    return state;
  }
}

// provides function for combining multiple producers
export const rootReducer = combineReducers({
  neckState
});
