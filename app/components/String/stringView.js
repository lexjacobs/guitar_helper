/*global require*/
var React = require('react');
import {noteInSet} from './stringMaker.js';
import * as methods from './stringMaker.js';
import {StringAdjuster} from '../Tuning/tuningAdjuster.js';
require('./stringViewCss.scss');

export const Letter = function(props) {

  var fretNumber = <span className={'fret-number'}>{props.noteNumber}</span>;

  // only capitalize first character so as to render 'Bb', not 'BB'
  var finalLetterDisplay = props.letter.split('').map((letter, i) => (i === 0 ? letter.toUpperCase() : letter));

  return (
    <span>
      <span className={props.highlight ? 'letter' : 'letter-off'}>{finalLetterDisplay}</span>
      {props.finalNote ? fretNumber : null}
    </span>);
};

export const StringNoteBox = function(props) {
  var letter = <Letter noteNumber={props.noteNumber} finalNote={props.finalNote} highlight={props.inScale} letter={props.letter} stringNumber={props.stringNumber} />;

  var nutStyle, edgeStyle;

  // first note needs a distinct marker for open string
  if (props.noteNumber === 0) {
    nutStyle = 'nut-row';
  } else {
    nutStyle = 'standard';
  }

  // first row needs a distinct style
  if (props.stringNumber === 0) {
    edgeStyle = 'top-edge';
  } else {
    edgeStyle = nutStyle;
  }

  return(
    <span className={edgeStyle}>
      {letter}
    </span>
  );
};

export const StringView = function(props) {

  var string = props.string.map((note, i) => {

    // to determine fret notes in scale
    var noteInScale = noteInSet(note, props.scaleNotes);

    return <StringNoteBox stringNumber={props.stringNumber} finalNote={props.finalNote} key={i} inScale={noteInScale ? true : false} noteNumber={i} letter={note} />;

  });

  return (<span className='string-row'>{string}</span>);
};

export const StringAndTuner = function(props) {
  var scaleNotes = methods.makeScaleFromRootAndIntervals(props.scaleStart, props.scaleSet[props.scaleName], props.noteSet);

  var neck = methods.neckMaker(props.neckNotes, props.noteSet);

  var reverseNeck = neck.slice().reverse();

  var StringAndTunerSet = reverseNeck.map((str, i) => {
    return (
      <div style={{ height: 32 }} key={i}>
        <StringAdjuster actions={props.actions} dispatch={props.dispatch} stringNumber={i} neckNotes={reverseNeck} />
        <StringView finalNote={i === (reverseNeck.length - 1)} string={methods.revealNotes(str.stringNotes, props.neckFlavor)} stringNumber={i} scaleNotes={scaleNotes} />
      </div>
    );
  });
  return <div>{StringAndTunerSet}</div>;

};
