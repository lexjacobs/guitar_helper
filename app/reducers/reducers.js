import { combineReducers } from 'redux';
import * as methods from '../components/String/stringMaker.js';
import {DEFAULT_NOTE_SET} from '../components/String/noteMapping.js';

// default state must be included
export function neckState(state = {neckNotes: ['e', 'a', 'd', 'g', 'b', 'e'], neckFlavor: 'withSharps', noteSet: DEFAULT_NOTE_SET}, action) {
  switch (action.type) {
  case 'ADJUST_STRING':

    return {
      ...state,
      neckNotes: state.neckNotes.map((note, i) => {

        if(action.stringNumber !== undefined && action.stringNumber !== i){
          return note;
        }

        var adjustedNote = methods.getNumberFromNote(note, state.noteSet);
        adjustedNote = adjustedNote + (action.direction === 'up' ? 1 : -1);
        while (adjustedNote < 0) {
          adjustedNote += state.noteSet.length;
        }

        while (adjustedNote > state.noteSet.length-1) {
          adjustedNote -= state.noteSet.length;
        }

        adjustedNote = methods.getNoteFromNumber(adjustedNote, state.noteSet);
        return adjustedNote[state.neckFlavor];
      })
    };

  case 'MAKE_NECK':

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
