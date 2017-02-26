'use strict';

var _ = require('underscore');
var React = require('react');
var pt = require('playa/prop-types');

var DEFAULT_ROUTE = Object.freeze({path: '/'});

var areRoutesEquivalent = function(routeOne, routeTwo) {
  return routeOne.path === routeTwo.path;
};

// Get id of UI Fragment's child-section, given a route-path. There's a child-section that should
//  be shown within the UI, per route. Obviously, only one child section may be shown in the UI
//  at any given time. Will return falsy if no section-id is found for given route-path
var getChildSectionIdForRoutePath = function(routePath) {
  switch (routePath) {
    case '/':     return 'about';
    case '/play': return 'play';
  }

  console.log('uiFragment: Cannot get section-id for unexpected route path "' + routePath + '"');
};

var UiFragmentRouted = React.createClass({
  propTypes: {
    UiFragment: pt.reactComponent().isRequired,
    route: pt.shape({path: pt.string.isRequired})
  },

  getInitialState: function() {
    return {route: this.props.route || _.deepClone(DEFAULT_ROUTE)};
  },

  componentWillReceiveProps: function(nextProps) {
    // TODO: We don't expect any props to change _except the current-route_. Is there any way to
    //  make this constraint more explicit - at least throw if it is violated?
    var nextRoute = nextProps.route || _.deepClone(DEFAULT_ROUTE);

    if (areRoutesEquivalent(nextRoute, this.state.route)) {
      return;
    }

    this.setState({route: nextRoute}); // eslint-disable-line react/no-set-state
  },

  render: function() {
    var props = _.extend({}, this.props, {
      childSectionId: getChildSectionIdForRoutePath(this.state.route.path)
    });

    return <this.props.UiFragment {...props}/>;
  }
});

module.exports = UiFragmentRouted;
