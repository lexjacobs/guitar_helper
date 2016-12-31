/*global require*/
var React = require('react');
import {Button} from 'react-bootstrap';
var FontAwesome = require('react-fontawesome');

// adjust single string, includes parameter of string number
export const StringAdjuster = function(props){

  // neck notes have been reversed, but
  // need to correspond to original array positions
  var adjustedString = (props.neckNotes.length - props.stringNumber - 1);

  var style={width: 50, height: 30, lineHeight: 1};
  var deleteStyle={width: 25, height: 30, lineHeight: 1, color: 'white', textAlign: 'center', backgroundColor: 'red', padding: 0};

  return (
    <span>
      <Button style={deleteStyle} onClick={() => {props.dispatch(props.actions.deleteString(adjustedString));}}>
        <FontAwesome name='remove' />
      </Button>{' '}
      <Button style={style} onClick={() => {props.dispatch(props.actions.adjustString('down', adjustedString));}}>{props.stringNumber + 1} <FontAwesome name='arrow-down
' /></Button>{' '}
      <Button style={style} onClick={() => {props.dispatch(props.actions.adjustString('up', adjustedString));}}>{props.stringNumber + 1} <FontAwesome name='arrow-up
' /></Button>
    </span>
  );
};

// adjust entire neck, second parameter undefined
export const NeckTuningAdjuster = function(props){
  return (
    <div>
        <Button onClick={() => {props.dispatch(props.actions.adjustString('up'));}}>Neck Up</Button>{' '}
        <Button onClick={() => {props.dispatch(props.actions.adjustString('down'));}}>Neck Down</Button>{' '}
        <Button onClick={() => {props.dispatch(props.actions.addString());}}><FontAwesome name='plus' /> Add String</Button>
    </div>
  );
};
