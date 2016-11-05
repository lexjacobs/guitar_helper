/* global require */
/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "React" }]*/

var React = require('react');
var ReactDOM = require('react-dom');
import {routes} from './config/routes';

ReactDOM.render(routes, document.getElementById('root'));
