'use strict';

var React = require('react');
var pt = require('playa/prop-types');

var UiFragmentRouted = require('./ui-fragment-routed');
var UiFragment = require('./ui-fragment');
var componentStore = require('./component-store');
var fetchRemoteData = require('playa/fetch-remote-data');
var mp3Parser = require('mp3-parser');

var UiFragmentBootstrap = function(props) {
  return (
    <UiFragmentRouted
      UiFragment={UiFragment}
      route={props.route}
      fetchRemoteData={fetchRemoteData}
      mp3Parser={mp3Parser}
      componentStore={componentStore}
      dispatchRequest={props.dispatchRequest}
    />
  );
};

UiFragmentBootstrap.propTypes = {
  route: pt.shape({path: pt.string.isRequired}),
  dispatchRequest: pt.func.isRequired
};

module.exports = UiFragmentBootstrap;
