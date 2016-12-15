/*global require*/
var React = require('react');

export const StringView = function(props){
  return (<div>{props.string.join(', ')}</div>);
};
