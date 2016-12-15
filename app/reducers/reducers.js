import { combineReducers } from 'redux';
import {DEFAULT_NOTE_SET} from '../components/String/noteMapping.js';

// default state must be included
export function neckState(state = {neckNotes: ['e', 'a', 'd', 'g', 'b', 'e'], neckFlavor: 'withSharps', noteSet: DEFAULT_NOTE_SET}, action) {
  switch (action.type) {
  case 'MAKE_NECK':

    // pass-through all other state, and increment count
    return {
      ...state,
      neckNotes: action.notes
    };

  case 'SET_FLAVOR':

    var flavorKey = {
      '#': 'withSharps',
      'b': 'withFlats'
    };

    return {
      ...state,
      neckFlavor: flavorKey[action.flavor]
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
