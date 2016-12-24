const ADJUST_ENTIRE_NECK = 'ADJUST_ENTIRE_NECK';
const MAKE_NECK = 'MAKE_NECK';
const SET_FLAVOR = 'SET_FLAVOR';

export function adjustEntireNeck(direction) {
  return {
    type: ADJUST_ENTIRE_NECK,
    direction
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
