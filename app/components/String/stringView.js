/*global require*/
var React = require('react');
import {noteInSet} from './stringMaker.js';
import * as methods from './stringMaker.js';
import {StringAdjuster} from '../Tuning/tuningAdjuster.js';
require('./stringViewCss.scss');

export const Letter = function(props) {
  return <span className={props.highlight ? 'letter' : 'letter-off'}>{props.letter.toUpperCase()}</span>;
};

export const StringNoteBox = function(props) {
  var letter = <Letter highlight={props.inScale ? true : false} letter={props.letter} />;
  return(
    <span className="standard">
      {letter}
    </span>
  );
};

export const StringView = function(props) {

  var string = props.string.map((note, i) => {

    if (noteInSet(note, props.scaleNotes)) {
      return <StringNoteBox key={i} inScale={true} letter={note} />;
    } else {
      return (<StringNoteBox key={i} letter={note} />);
    }
  });

  return (<span className="string-row">{string}</span>);
};

var style={ height: 32 };

export const StringAndTuner = function(props) {
  var scaleNotes = methods.makeScaleFromRootAndIntervals(props.scaleStart, props.scaleSet[props.scaleName], props.noteSet);

  var neck = methods.neckMaker(props.neckNotes, props.noteSet);

  var reverseNeck = neck.slice().reverse();

  var stringSet = reverseNeck.map((str, i) => {
    return (
      <div style={style} key={i}>
        <StringAdjuster actions={props.actions} dispatch={props.dispatch} stringNumber={i} neckNotes={reverseNeck} />
        <StringView string={methods.revealNotes(str.stringNotes, props.neckFlavor)} stringNumber={i} scaleNotes={scaleNotes} />
      </div>
    );
  });
  return <div>{stringSet}</div>;

};
