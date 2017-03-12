/* eslint react/no-set-state: 0 */

'use strict';

var _ = require('underscore');
var React = require('react');
var pt = require('playa/prop-types');

var AboutFragment = React.createClass({
  propTypes: {
    encodeURIComponent: pt.func.isRequired,
    componentStore: pt.componentStore(['About']),
    dispatchRequest: pt.func.isRequired,
    requestDispatcher: pt.requestDispatcher.isRequired
  },

  componentDidMount: function() {
    this.props.requestDispatcher.on({
      'fetchRemoteData': _.partial(this.props.dispatchRequest, 'fetchRemoteData')
    }, this);
  },

  componentWillUnmount: function() {
    this.props.requestDispatcher.off(null, null, this);
  },

  render: function() {
    return (
      <this.props.componentStore.About
        encodeURIComponent={this.props.encodeURIComponent}
        componentStore={this.props.componentStore}
        dispatchRequest={this.props.requestDispatcher.dispatch}
      />
    );
  }
});

module.exports = AboutFragment;
