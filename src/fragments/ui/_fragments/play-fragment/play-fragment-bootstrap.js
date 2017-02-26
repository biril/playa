'use strict';

var React = require('react');
var pt = require('playa/prop-types');

var PlayFragment = require('./play-fragment');
var componentStore = require('./component-store');

var PlayFragmentBootstrap = function(props) {
  return (
    <PlayFragment
      componentStore={componentStore}
      dispatchRequest={props.dispatchRequest}
    />
  );
};

PlayFragmentBootstrap.propTypes = {
  dispatchRequest: pt.func.isRequired
};

module.exports = PlayFragmentBootstrap;
