const ADJUST_STRING = 'ADJUST_STRING';
const MAKE_NECK = 'MAKE_NECK';
const SET_FLAVOR = 'SET_FLAVOR';

export function adjustString(direction, stringNumber) {
  return {
    type: ADJUST_STRING,
    direction,
    stringNumber
  };
}

export function makeNeck(startingNotes) {
  return {
    type: MAKE_NECK,
    notes: startingNotes
  };
}
export function setFlavor(flavor) {
  return {
    type: SET_FLAVOR,
    flavor
  };
}
