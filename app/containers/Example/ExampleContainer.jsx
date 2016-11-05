/*global require*/
var React = require('react');
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from '../../actions/actions.js';

// requiring modular css definition is as easy as requiring the file!
require('./style.scss');

// example stateless component made stateful through redux connect function
const _Example = ({count, dispatch}) => {

  return (

    <div className={'mainContainer'}>

      <Button onClick={() => dispatch(actions.exampleActionIncrease())}>Increase Count</Button>

      <div className={'currentCount'}>Current count: {count}
      </div>

      <div className={'currentCount'}>Notice, the state is persisted between the Main and Alternate routes, as well as between full page refreshes.
      </div>

    </div>
  );
};

export const Example = connect((state) => state.exampleState)(_Example);
