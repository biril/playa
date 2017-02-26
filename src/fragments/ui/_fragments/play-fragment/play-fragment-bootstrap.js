'use strict';

var React = require('react');
var pt = require('playa/prop-types');

var PlayFragment = require('./play-fragment');
var componentStore = require('./component-store');

var PlayFragmentBootstrap = function(props) {
  return (
    <PlayFragment
      statusMessage={props.statusMessage}
      componentStore={componentStore}
      dispatchRequest={props.dispatchRequest}
    />
  );
};

PlayFragmentBootstrap.propTypes = {
  statusMessage: pt.string,
  dispatchRequest: pt.func.isRequired
};

module.exports = PlayFragmentBootstrap;
