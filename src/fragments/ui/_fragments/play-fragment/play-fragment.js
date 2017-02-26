'use strict';

var React = require('react');
var pt = require('playa/prop-types');

var PlayFragment = React.createClass({
  propTypes: {
    statusMessage: pt.string,
    componentStore: pt.componentStore(['Play']).isRequired,
    dispatchRequest: pt.func.isRequired
  },

  render: function() {
    return (
      <this.props.componentStore.Play
        statusMessage={this.props.statusMessage}
        componentStore={this.props.componentStore}
      />
    );
  }
});

module.exports = PlayFragment;
