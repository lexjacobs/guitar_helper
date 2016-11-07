/*
global describe it
*/

// import React from 'react';
import {expect} from 'chai';
import * as methods from './stringMaker.js';
import {DEFAULT_NOTE_SET} from './noteMapping.js';
// import {Provider} from 'react-redux';
// import {mount} from 'enzyme';

describe('a string contains the expected properties', () => {

  it('a string is an object', () => {
    const options = {
      stringStart: 0
    };

    expect(methods.stringMaker(options)).to.be.a('object');
  });

  it('a string contains notes in the expected order', () => {
    const options = {
      stringStart: 0
    };

    expect(methods.stringMaker(options).stringNotes[0].withSharps).to.equal(DEFAULT_NOTE_SET[0].withSharps);
    expect(methods.stringMaker(options).stringNotes[0].withFlats).to.equal(DEFAULT_NOTE_SET[0].withFlats);
    expect(methods.stringMaker(options).stringNotes[DEFAULT_NOTE_SET.length - 1].withSharps).to.equal(DEFAULT_NOTE_SET[DEFAULT_NOTE_SET.length - 1].withSharps);
    expect(methods.stringMaker(options).stringNotes[DEFAULT_NOTE_SET.length - 1].withFlats).to.equal(DEFAULT_NOTE_SET[DEFAULT_NOTE_SET.length - 1].withFlats);
  });

  it('a string has a functioning getNoteFromNumber method', () => {
    const options = {
      stringStart: 0
    };

    const testString = methods.stringMaker(options);

    expect(methods.getNoteFromNumber(0, testString.stringNotes).withSharps).to.equal(DEFAULT_NOTE_SET[0].withSharps);
    expect(methods.getNoteFromNumber(DEFAULT_NOTE_SET.length - 1, testString.stringNotes).withSharps).to.equal(DEFAULT_NOTE_SET[DEFAULT_NOTE_SET.length - 1].withSharps);

    DEFAULT_NOTE_SET.forEach((note, i) => {
      let options = {
        stringStart: i
      };

      let testString = methods.stringMaker(options);
      // test the first position of the string
      expect(methods.getNoteFromNumber(0, testString.stringNotes).withSharps).to.equal(DEFAULT_NOTE_SET[i].withSharps);
      expect(methods.getNoteFromNumber(0, testString.stringNotes).withFlats).to.equal(DEFAULT_NOTE_SET[i].withFlats);

      // test every position within the string
      DEFAULT_NOTE_SET.forEach((note, j) => {
        expect(methods.getNoteFromNumber(j, testString.stringNotes).withSharps).to.equal(DEFAULT_NOTE_SET[(i + j) % DEFAULT_NOTE_SET.length].withSharps);
        expect(methods.getNoteFromNumber(j, testString.stringNotes).withFlats).to.equal(DEFAULT_NOTE_SET[(i + j) % DEFAULT_NOTE_SET.length].withFlats);
      });
    });

  });

  it('a string has a functioning getNumberFromNote method', () => {
    const options = {
      stringStart: 0
    };

    const testString = methods.stringMaker(options);

    // it will properly return for the limits of the set, using sharps or flats
    expect(methods.getNumberFromNote(DEFAULT_NOTE_SET[0].withSharps, testString.stringNotes)).to.equal(0);
    expect(methods.getNumberFromNote(DEFAULT_NOTE_SET[0].withFlats, testString.stringNotes)).to.equal(0);

    expect(methods.getNumberFromNote(DEFAULT_NOTE_SET[DEFAULT_NOTE_SET.length - 1].withSharps, testString.stringNotes)).to.equal(DEFAULT_NOTE_SET.length - 1);
    expect(methods.getNumberFromNote(DEFAULT_NOTE_SET[DEFAULT_NOTE_SET.length - 1].withFlats, testString.stringNotes)).to.equal(DEFAULT_NOTE_SET.length - 1);

    for (var i = 0; i < DEFAULT_NOTE_SET.length; i++) {
      expect(methods.getNumberFromNote(DEFAULT_NOTE_SET[i].withSharps, testString.stringNotes)).to.equal(i);
      expect(methods.getNumberFromNote(DEFAULT_NOTE_SET[i].withFlats, testString.stringNotes)).to.equal(i);
    }

    for (i = 0; i < DEFAULT_NOTE_SET.length; i++) {
      let options = {
        stringStart: i
      };

      let testString = methods.stringMaker(options);
      // test the first position of the string
      expect(methods.getNumberFromNote(DEFAULT_NOTE_SET[i].withSharps, testString.stringNotes)).to.equal(0);
      expect(methods.getNumberFromNote(DEFAULT_NOTE_SET[i].withFlats, testString.stringNotes)).to.equal(0);

      // checks each note within scale
      for (var j = 0; j < testString.stringNotes.length; j++) {
        expect(methods.getNumberFromNote(testString.stringNotes[j].withSharps, testString.stringNotes)).to.equal(j);
      }

    }

  });

  it('a string contains all of the expected notes', () => {

    // make a test string starting with every note in the DEFAULT_NOTE_SET
    for (var i = 0; i < DEFAULT_NOTE_SET.length; i++) {
      let options = {
        stringStart: i
      };
      let testString = methods.stringMaker(options);

      // make sure strings start with the expected note
      expect(testString['stringNotes'][0]).to.equal(DEFAULT_NOTE_SET[i]);

      DEFAULT_NOTE_SET.forEach((note, j) => {

        // make sure every note is as expected
        expect(testString['stringNotes'][j].withSharps).to.equal(DEFAULT_NOTE_SET[(i + j) % DEFAULT_NOTE_SET.length].withSharps);
        expect(testString['stringNotes'][j].withFlats).to.equal(DEFAULT_NOTE_SET[(i + j) % DEFAULT_NOTE_SET.length].withFlats);
      });

    }

  });

});
