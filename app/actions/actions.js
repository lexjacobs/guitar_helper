const ADJUST_STRING = 'ADJUST_STRING';
const MAKE_NECK = 'MAKE_NECK';
const SET_FLAVOR = 'SET_FLAVOR';
const SET_SCALE = 'SET_SCALE';

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
export function setScaleName(nameOrScale, adjustment) {
  return {
    type: SET_SCALE,
    nameOrScale,
    adjustment
  };
}
