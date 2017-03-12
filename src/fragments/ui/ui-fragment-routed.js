'use strict';

var React = require('react');
var pt = require('playa/prop-types');

var areRoutesEquivalent = function(routeOne, routeTwo) {
  return routeOne.path === routeTwo.path;
};

var UiFragmentRouted = React.createClass({
  propTypes: {
    UiFragment: pt.reactComponent().isRequired,
    route: pt.route.isRequired
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    // Of all the incoming props, only a change in the route should cause the UI-Fragment to
    //  rerender. All other incoming props are expected to never change
    return !areRoutesEquivalent(this.props.route, nextProps.route);
  },

  render: function() {
    return <this.props.UiFragment {...this.props}/>;
  }
});

module.exports = UiFragmentRouted;
