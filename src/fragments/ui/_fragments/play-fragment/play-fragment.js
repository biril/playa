'use strict';

var React = require('react');
var pt = require('playa/prop-types');

var PlayFragment = React.createClass({
  propTypes: {
    componentStore: pt.componentStore(['Play']).isRequired,
    dispatchRequest: pt.func.isRequired
  },

  render: function() {
    return (
      <this.props.componentStore.Play
        componentStore={this.props.componentStore}
      />
    );
  }
});

module.exports = PlayFragment;
