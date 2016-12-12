/*global require*/
var React = require('react');
// var _ = require('lodash');
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from '../../actions/actions.js';
import * as methods from '../String/stringMaker.js';
import {DEFAULT_NOTE_SET} from '../String/noteMapping.js';

// requiring modular css definition is as easy as requiring the file!
require('./style.scss');

// example stateless component made stateful through redux connect function
const _Neck = ({neckNotes, dispatch}) => {

  let neck = methods.neckMaker(neckNotes, DEFAULT_NOTE_SET);
  let strings = neck.map((str) => str.stringNotes);
  let testStrings = strings.map((str, i) => {
    return <div key={i}>string: {methods.revealNotes(str, 'withSharps')}</div>;
  });

  return (

    <div className={'mainContainer'}>

      <Button onClick={() => dispatch(actions.makeNeck(['d', 'a', 'd', 'g', 'a', 'd']))}>DADGAD</Button>
      <Button onClick={() => dispatch(actions.makeNeck(['e', 'a', 'd', 'g', 'b', 'e']))}>Standard Tuning</Button>

      <div className={'currentCount'}>Current neckNotes: {neckNotes}
      </div>

      {testStrings}

    </div>
  );
};

export const Neck = connect((state) => state.neckState)(_Neck);
