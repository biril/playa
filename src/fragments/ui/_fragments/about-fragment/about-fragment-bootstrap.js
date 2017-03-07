'use strict';

var React = require('react');
var pt = require('playa/prop-types');

var AboutFragment = require('./about-fragment');
var componentStore = require('./component-store');
var requestDispatcherFactory = require('playa/request-dispatcher-factory');

var AboutFragmentBootstrap = function(props) {
  return (
    <AboutFragment
      encodeURIComponent={window.encodeURIComponent}
      componentStore={componentStore}
      dispatchRequest={props.dispatchRequest}
      requestDispatcher={requestDispatcherFactory.create()}
    />
  );
};

AboutFragmentBootstrap.propTypes = {
  dispatchRequest: pt.func.isRequired
};

module.exports = AboutFragmentBootstrap;
