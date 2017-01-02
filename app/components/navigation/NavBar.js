/* global require process module */
import React, {PropTypes as T} from 'react';
var FontAwesome = require('react-fontawesome');
import NavLink from './NavLink';
require('./style.scss');

var NavBar = React.createClass({
  contextTypes: {
    router: T.object
  },
  render() {
    return <div>
      <nav className="top-bar">
        <ul>
          <li>
            <NavLink className="nav-link" to="/main"><FontAwesome className="logo-adjust" name='home' size='2x' /></NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/main">Main</NavLink>
          </li>
          {process.env.NODE_ENV === 'development' ? <li><NavLink className="nav-link" to="/main">{process.env.NODE_ENV} version</NavLink></li> : null}
        </ul>
      </nav>

      {this.props.children}

    </div>;
  }
});

module.exports = NavBar;
