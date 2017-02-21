'use strict';

// var React = require('react');
var pt = require('playa/prop-types');

//
var If = function(props) {
  if (props.isTrue) {
    return props.thenRender();
  }

  if (props.elseRender) {
    return props.elseRender();
  }

  return null;
};
If.propTypes = {
  isTrue: pt.bool.isRequired,
  thenRender: pt.func.isRequired,
  elseRender: pt.func
};

module.exports = If;
