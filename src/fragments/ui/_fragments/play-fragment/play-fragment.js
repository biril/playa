'use strict';

var React = require('react');
var pt = require('playa/prop-types');

var componentStore = require('./component-store');

var PlayFragment = React.createClass({
  propTypes: {},

  render: function() {
    return (
      <componentStore.Play
        componentStore={componentStore}
      />
    );
  }
});

module.exports = PlayFragment;
