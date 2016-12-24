/*global require*/
var React = require('react');
import {Button} from 'react-bootstrap';
// import {SCALE_MAPPING, scaleNameFromNotes} from '../String/noteMapping.js';

export const TuningAdjuster = function(props){

  return (
    <div>
        <Button onClick={() => {props.dispatch(props.actions.adjustEntireNeck('up'));}}>Neck Up</Button>{' '}
        <Button onClick={() => {props.dispatch(props.actions.adjustEntireNeck('down'));}}>Neck Down</Button>
    </div>
  );
};
