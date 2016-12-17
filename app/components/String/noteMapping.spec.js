/*
global describe it
*/
/*eslint no-dupe-keys: 0*/ // needed for duplicate key test 

import {expect} from 'chai';
import * as methods from './noteMapping.js';

describe('scale constants are built up as expected', () => {
  it('can handle an empty string', () => {
    let testScale = {'sample scale': ''};
    let test = methods.scaleTransform(testScale);
    expect(test).to.deep.equal({'sample scale': []});
  });
  it('transforms a short "," delimited scale', () => {
    let testScale = {'sample scale': 'a,b'};
    let test = methods.scaleTransform(testScale);
    expect(test).to.deep.equal({'sample scale': ['a', 'b']});
  });
  it('transforms a scale with sharps and flats', () => {
    let testScale = {'sample scale': 'a,b#,c,db,e'};
    let test = methods.scaleTransform(testScale);
    expect(test).to.deep.equal({'sample scale': ['a', 'b#', 'c', 'db', 'e']});
  });
  it('transforms a scale of length 1', () => {
    let testScale = {'sample scale': 'f'};
    let test = methods.scaleTransform(testScale);
    expect(test).to.deep.equal({'sample scale': ['f']});
  });
  it('handles multiple scales', () => {
    let testScale = {'sample scale': 'a,b,c', 'epic-scale': 'd,e,f'};
    let test = methods.scaleTransform(testScale);
    expect(test).to.deep.equal({'sample scale': ['a', 'b', 'c'], 'epic-scale': ['d', 'e', 'f']});
  });
  it('overwrites duplicate scale names', () => {
    let testScale = {'sample scale': 'a,b,c', 'sample scale': 'd,e,f'};
    let test = methods.scaleTransform(testScale);
    expect(test).to.deep.equal({'sample scale': ['d', 'e', 'f']});
  });
});

describe('scale name keys can be matched to the value of their notes', () => {

  var scaleMap = {
    standard: ['e', 'a', 'd', 'g', 'b', 'e'],
    'drop d': ['d', 'a', 'd', 'g', 'b', 'e'],
    dadgad: ['d', 'a', 'd', 'g', 'a', 'd'],
    daddad: ['d', 'a', 'd', 'd', 'a', 'd'],
    'all fourths': ['e', 'a', 'd', 'g', 'c', 'f'],
    mandoguitar: ['c', 'g', 'd', 'a', 'e', 'b'],
    mandolin: ['g', 'd', 'a', 'e'],
    ukulele: ['g', 'c', 'e', 'a'],
    'open a': ['e', 'a', 'c#', 'e', 'a', 'e'],
    'open a slide': ['e', 'a', 'e', 'a', 'c#', 'e'],
    'open b': ['b', 'f#', 'b', 'f#', 'b', 'd#'],
    'open c': ['c', 'g', 'c', 'g', 'c', 'e'],
    'open d': ['d', 'a', 'd', 'f#', 'a', 'd'],
    'open e': ['e', 'b', 'e', 'g#', 'b', 'e'],
    'open f': ['c', 'f', 'c', 'f', 'a', 'c'],
    'open g': ['d', 'g', 'd', 'g', 'b', 'd'],
    ostrich: ['e', 'e', 'e', 'e', 'e', 'e'],
    '7 string': ['b', 'e', 'a', 'd', 'g', 'b', 'e'],
    'custom': []
  };

  it('matches scales as expected', () => {
    let test = methods.scaleNameFromNotes(['e', 'a', 'd', 'g', 'c', 'f'], scaleMap);
    expect(test).to.equal('all fourths');

    test = methods.scaleNameFromNotes(['d', 'a', 'd', 'g', 'a', 'd'], scaleMap);
    expect(test).to.equal('dadgad');
  });

  it('matches an empty scale as expected', () => {
    let test = methods.scaleNameFromNotes([], scaleMap);
    expect(test).to.equal('custom');
  });

  it('matches an unknown scale as expected', () => {
    let test = methods.scaleNameFromNotes(['pac-man-qbert'], scaleMap);
    expect(test).to.equal('custom');
  });
});
