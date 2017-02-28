'use strict';

var React = require('react');
var pt = require('playa/prop-types');
var mp3Parser = require('mp3-parser');

var PlayFragment = require('./play-fragment');
var componentStore = require('./component-store');

var PlayFragmentBootstrap = function(props) {
  return (
    <PlayFragment
      mpegData={props.mpegData}
      statusMessage={props.statusMessage}
      mp3Parser={mp3Parser}
      componentStore={componentStore}
      dispatchRequest={props.dispatchRequest}
    />
  );
};

PlayFragmentBootstrap.propTypes = {
  mpegData: pt.object,
  statusMessage: pt.string,
  dispatchRequest: pt.func.isRequired
};

module.exports = PlayFragmentBootstrap;
