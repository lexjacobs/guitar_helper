const ADJUST_STRING = 'ADJUST_STRING';
const ADD_STRING = 'ADD_STRING';
const DELETE_STRING = 'DELETE_STRING';
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
export function addString() {
  return {
    type: ADD_STRING
  };
}
export function deleteString(stringNumber) {
  return {
    type: DELETE_STRING,
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
