/*global require*/
var React = require('react');
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from '../../actions/actions.js';
import * as methods from '../String/stringMaker.js';
import {StringView} from '../String/stringView.js';
import {TuningChooser} from '../Tuning/tuningChooser.js';
import {TuningAdjuster} from '../Tuning/tuningAdjuster.js';

// requiring modular css definition
require('./style.scss');

// stateless component made stateful through redux connect function
const _Neck = ({neckNotes, neckFlavor, noteSet, dispatch}) => {

  let neck = methods.neckMaker(neckNotes, noteSet);
  let strings = neck.map((str) => str.stringNotes);
  let testStrings = strings.map((str, i) => {
    return <StringView key={i} string={methods.revealNotes(str, neckFlavor)} />;
  });

  return (

    <div className={'mainContainer'}>
      <TuningChooser actions={actions} dispatch={dispatch} neckNotes={neckNotes}/>
      <TuningAdjuster actions={actions} dispatch={dispatch} />
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
