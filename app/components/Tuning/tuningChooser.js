/*global require*/
var React = require('react');
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {SCALE_MAPPING, scaleNameFromNotes} from '../String/noteMapping.js';

export const TuningChooser = function(props){

  var tunings = [];
  for (var scale in SCALE_MAPPING) {
    tunings.push(<option key={scale} value={scale}>{scale}</option>);
  }

  return (
    <div>
      <form>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Select</ControlLabel>
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
