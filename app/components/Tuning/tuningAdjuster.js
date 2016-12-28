/*global require*/
var React = require('react');
import {Button} from 'react-bootstrap';

// adjust single string, includes parameter of string number
export const StringAdjuster = function(props){
  return (
    <div>
        <Button onClick={() => {props.dispatch(props.actions.adjustString('up', props.stringNumber));}}>String {props.stringNumber + 1} Up</Button>{' '}
        <Button onClick={() => {props.dispatch(props.actions.adjustString('down', props.stringNumber));}}>String {props.stringNumber + 1} Down</Button>
    </div>
  );
};

// adjust entire neck, second parameter undefined
export const TuningAdjuster = function(props){
  return (
    <div>
        <Button onClick={() => {props.dispatch(props.actions.adjustString('up'));}}>Neck Up</Button>{' '}
        <Button onClick={() => {props.dispatch(props.actions.adjustString('down'));}}>Neck Down</Button>
    </div>
  );
};
