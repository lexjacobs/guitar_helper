const MAKE_NECK = 'MAKE_NECK';
const SET_FLAVOR = 'SET_FLAVOR';

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
