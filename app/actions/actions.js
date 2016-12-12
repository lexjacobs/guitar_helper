const MAKE_NECK = 'MAKE_NECK';

export function makeNeck(startingNotes) {
  return {
    type: MAKE_NECK,
    notes: startingNotes
  };
}
