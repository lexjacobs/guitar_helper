/*global require*/
var React = require('react');
import {noteInSet} from './stringMaker.js';

export const StringView = function(props){

  var strings = props.string.map((note, i) => {

    if (noteInSet(note, props.scaleNotes)) {
      return (<span style={{fontSize: 'large'}} key={i}>{' '}{note}{' '}</span>);
    } else {
      return (<span key={i}>{' '}{note}{' '}</span>);
    }
  });

  return (<div>{strings}</div>);
};
