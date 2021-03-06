/*global require*/
var React = require('react');
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from '../../actions/actions.js';
import {StringAndTuner} from '../String/stringView.js';
import {ScaleChooser, ScaleStartChooser, TuningChooser} from '../Tuning/tuningChooser.js';
import {NeckTuningAdjuster } from '../Tuning/tuningAdjuster.js';
import {SCALE_SET} from '../String/noteMapping.js';

// requiring modular css definition
require('./style.scss');

// stateless component made stateful through redux connect function
const _Neck = ({dispatch, neckNotes, neckFlavor, noteSet, scaleName, scaleStart}) => {

  return (

    <div className={'mainContainer'}>
      <ScaleChooser actions={actions} dispatch={dispatch} scaleName={scaleName}/>
      <ScaleStartChooser actions={actions} dispatch={dispatch} scaleName={scaleName} scaleStart={scaleStart}  neckFlavor={neckFlavor} />
      <TuningChooser actions={actions} dispatch={dispatch} neckNotes={neckNotes}/>
      <NeckTuningAdjuster actions={actions} dispatch={dispatch} />
      <br/>

      <StringAndTuner scaleStart={scaleStart} scaleSet={SCALE_SET} noteSet={noteSet} scaleName={scaleName} neckNotes={neckNotes} neckFlavor={neckFlavor} actions={actions} dispatch={dispatch} />


      <br/>
      <br/>
      <Button onClick={() => dispatch(actions.setFlavor('b'))}>Display Flats</Button>{' '}
      <Button onClick={() => dispatch(actions.setFlavor('#'))}>Display Sharps</Button>
      <br/>

    </div>
  );
};

export const Neck = connect((state) => state.neckState)(_Neck);
