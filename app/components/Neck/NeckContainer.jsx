/*global require*/
var React = require('react');
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from '../../actions/actions.js';
import * as methods from '../String/stringMaker.js';
import {StringView} from '../String/stringView.js';
import {ScaleChooser, ScaleStartChooser, TuningChooser} from '../Tuning/tuningChooser.js';
import {StringAdjuster, TuningAdjuster } from '../Tuning/tuningAdjuster.js';
import {SCALE_SET} from '../String/noteMapping.js';

// requiring modular css definition
require('./style.scss');

// stateless component made stateful through redux connect function
const _Neck = ({dispatch, neckNotes, neckFlavor, noteSet, scaleName, scaleStart}) => {

  let neck = methods.neckMaker(neckNotes, noteSet);
  let strings = neck.map((str) => str.stringNotes);
  let testStrings = strings.map((str, i) => {
    return <StringView key={i} string={methods.revealNotes(str, neckFlavor)} />;
  });

  var scaleNotes = methods.makeScaleFromRootAndIntervals(scaleStart, SCALE_SET[scaleName], noteSet);

  for(var notes in scaleNotes){
    console.log(scaleNotes[notes]);
  }

  let StringAdjusters = neckNotes.map((string, i) => <StringAdjuster actions={actions} dispatch={dispatch} key={i} stringNumber={i} />);

  return (

    <div className={'mainContainer'}>
      <ScaleStartChooser actions={actions} dispatch={dispatch} scaleName={scaleName} scaleStart={scaleStart}  neckFlavor={neckFlavor} />
      <ScaleChooser actions={actions} dispatch={dispatch} scaleName={scaleName}/>
      <TuningChooser actions={actions} dispatch={dispatch} neckNotes={neckNotes}/>
      <TuningAdjuster actions={actions} dispatch={dispatch} />
      {StringAdjusters}
      <Button onClick={() => dispatch(actions.makeNeck(['d', 'a', 'd', 'g', 'a', 'd']))}>DADGAD</Button>
      <Button onClick={() => dispatch(actions.makeNeck(['c', 'a', 'd', 'g', 'a', 'd']))}>CADGAD</Button>
      <Button onClick={() => dispatch(actions.makeNeck(['e', 'a', 'd', 'g', 'b', 'e']))}>Standard Tuning</Button>
      <Button onClick={() => dispatch(actions.setFlavor('b'))}>Flat</Button>
      <Button onClick={() => dispatch(actions.setFlavor('#'))}>Sharp</Button>

      <div className={'currentCount'}>Current neckNotes: {neckNotes}
      </div>

      {testStrings}

    </div>
  );
};

export const Neck = connect((state) => state.neckState)(_Neck);
