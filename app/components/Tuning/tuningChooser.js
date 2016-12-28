/*global require*/
var React = require('react');
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {DEFAULT_NOTE_SET, SCALE_MAPPING, scaleNameFromNotes, SCALE_SET} from '../String/noteMapping.js';

export const ScaleChooser = function(props){

  var scales = [];
  for (var scale in SCALE_SET) {
    scales.push(<option key={scale} value={scale}>{scale}</option>);
  }
  return (
    <div>
      <form>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Select Scale</ControlLabel>
          <FormControl value={props.scaleName} componentClass="select" placeholder="select" onChange={ (event) => {
            props.dispatch(props.actions.setScaleName(event.target.value, 'scaleName'));
          }}>
            {scales}
          </FormControl>
        </FormGroup>
      </form>
    </div>
  );
};

export const ScaleStartChooser = function(props){

  var notes = [];

  for (var i = 0; i < DEFAULT_NOTE_SET.length; i++) {
    var note = DEFAULT_NOTE_SET[i];
    notes.push(<option key={i} value={note[props.neckFlavor]}>{note[props.neckFlavor]}</option>);
  }



  return (
    <div>
      <form>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Select Root Note</ControlLabel>
          <FormControl value={props.scaleStart} componentClass="select" placeholder="select" onChange={ (event) => {
            props.dispatch(props.actions.setScaleName(event.target.value, 'scaleStart'));
          }}>
            {notes}
          </FormControl>
        </FormGroup>
      </form>
    </div>
  );
};

export const TuningChooser = function(props){

  var tunings = [];
  for (var scale in SCALE_MAPPING) {
    tunings.push(<option key={scale} value={scale}>{scale}</option>);
  }

  return (
    <div>
      <form>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Select Neck Tuning</ControlLabel>
          <FormControl value={scaleNameFromNotes(props.neckNotes, SCALE_MAPPING)} componentClass="select" placeholder="select" onChange={ (event) => {
            props.dispatch(props.actions.makeNeck(SCALE_MAPPING[event.target.value]));
          }}>
            {tunings}
          </FormControl>
        </FormGroup>
      </form>
    </div>
  );
};
