import React from 'react';
import { Link } from 'react-router';

let NavLink = React.createClass({
  render() {
    return <Link {...this.props} activeClassName="active"/>;
  }
});

export default NavLink;
