/*global require*/
var React = require('react');
import {noteInSet} from './stringMaker.js';
import * as methods from './stringMaker.js';
import {StringAdjuster} from '../Tuning/tuningAdjuster.js';

export const StringView = function(props) {

  var strings = props.string.map((note, i) => {

    if (noteInSet(note, props.scaleNotes)) {
      return (<span style={{fontSize: 20, fontFamily: 'monospace', color: 'red'}} key={i}>{' '}{note}{' '}</span>);
    } else {
      return (<span style={{fontSize: 20, fontFamily: 'monospace'}} key={i}>{' '}{note}{' '}</span>);
    }
  });

  return (<span>{strings}</span>);
};

export const StringAndTuner = function(props) {
  var scaleNotes = methods.makeScaleFromRootAndIntervals(props.scaleStart, props.scaleSet[props.scaleName], props.noteSet);

  var neck = methods.neckMaker(props.neckNotes, props.noteSet);

  var reverseNeck = neck.slice().reverse();

  var stringSet = reverseNeck.map((str, i) => {
    return (
      <div key={i}>
        <StringAdjuster actions={props.actions} dispatch={props.dispatch} stringNumber={i} neckNotes={reverseNeck} />
        <StringView string={methods.revealNotes(str.stringNotes, props.neckFlavor)} scaleNotes={scaleNotes} />
      </div>
    );
  });
  return <div>{stringSet}</div>;

};
