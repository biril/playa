'use strict';

var React = require('react');
var pt = require('playa/prop-types');

var AboutFragment = require('./about-fragment');
var componentStore = require('./component-store');

var AboutFragmentBootstrap = function(props) {
  return (
    <AboutFragment
      componentStore={componentStore}
      dispatchRequest={props.dispatchRequest}
    />
  );
};

AboutFragmentBootstrap.propTypes = {
  dispatchRequest: pt.func.isRequired
};

module.exports = AboutFragmentBootstrap;
