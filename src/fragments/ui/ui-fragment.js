'use strict';

var _ = require('underscore');
var React = require('react');
var pt = require('playa/prop-types');

var componentStore = require('./component-store');
var requestDispatcherFactory = require('playa/request-dispatcher-factory');

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

// Get UI Fragment's Child Component, that is appropriate for section of given id, `sectionId`. For
//  each child-section that may be the current one, inside the UI, there's an appropriate child
//  Component which will be acquired by this function. Will return falsy if no Component is found
//  for given section-id
var getChildComponentForSectionId = (function() {
  var childSectionIdToComponentName = Object.freeze({about: 'AboutFragment', play: 'PlayFragment'});

  return function(sectionId) {
    return componentStore[childSectionIdToComponentName[sectionId]] || (function() {
      console.log('uiFragment: Cannot get Component for unexpected section id "' + sectionId + '"');
    }());
  };
}());

var UiFragment = React.createClass({
  propTypes: {
    curRoute: pt.shape({path: pt.string.isRequired}),
    dispatchRequest: pt.func.isRequired
  },

  componentWillMount: function() {
    this.blitState();
    this.createRequestDispatcher();
    this.startListeningOnRequestDispatcher();
  },

  componentWillReceiveProps: function(nextProps) {
    // TODO: We don't expect any props to change _except the current-route_. Is there any way to
    //  make this constraint more explicit - at least throw if it is violated?

    if (this.props.curRoute.path !== nextProps.curRoute.path) {
      this.setState(this.extractStateFromRoute(nextProps.curRoute)); // eslint-disable-line react/no-set-state
    }
  },

  componentWillUnmount: function() {
    this.stopListeningOnRequestDispatcher();
  },

  createRequestDispatcher: function() {
    this.requestDispatcher = requestDispatcherFactory.create();
  },

  startListeningOnRequestDispatcher: function() {
    // Forward 'navigate' requests to parent (the application)
    this.requestDispatcher.on('navigate', function(routePath) {
      this.props.dispatchRequest('navigate', routePath); // Delegate to some parent
    }, this);
  },

  stopListeningOnRequestDispatcher: function() {
    this.requestDispatcher.off(null, null, this);
  },

  extractStateFromRoute: function(routeAttrs) {
    // Just fall back onto the current child section, in the case that the given route can't be
    //  matched to a new child section
    return {
      curChildSectionId:
        getChildSectionIdForRoutePath(routeAttrs.path) || this.state.curChildSectionId
    };
  },

  blitState: function() {
    var state = _.extend({}, this.extractStateFromRoute(this.props.curRoute));
    this.setState(state); // eslint-disable-line react/no-set-state
  },

  render: function() {
    var curChildSectionId = this.state.curChildSectionId;
    var ChildComponent = getChildComponentForSectionId(curChildSectionId);

    var dispatchRequest = this.requestDispatcher.dispatch.bind(this.requestDispatcher);

    var Ui = componentStore.Ui;

    return (
      <Ui
        dispatchRequest={dispatchRequest}
        componentStore={componentStore}
      >
        <ChildComponent
          curRoute={this.props.curRoute}
          dispatchRequest={dispatchRequest}
          componentStore={componentStore}
        />
      </Ui>
    );
  }
});

module.exports = UiFragment;
