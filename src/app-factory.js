'use strict';

var _ = require('underscore');
_.mixin(require('./lib/underscore-extensions').get());
_.mixin(_.pick(require('./lib/global-scope'), 'encodeURIComponent', 'decodeURIComponent'));

var React = require('react');
var ReactDom = require('react-dom');

// The top-level request-dispatcher. The current implementation only expects UI-dispatched
//  'navigate' requests to reach this level of the app
var requestDispatcher = require('playa/request-dispatcher-factory').create();

// Set up a navigator to handle 'navigate' requests dispatched by the UI. Fail loudly if env
//  doesn't provide required APIs. This should be revised to tolerate envs that don't
var navigator = (function() {
  if (!_.isObject(window.history)) {
    throw new Error('Cannot build navigator: Expected history API to be available but is not');
  }
  if (!window.hasOwnProperty('onpopstate')) {
    throw new Error('Cannot build navigator: Expected popstate event to be supported but is not');
  }

  return require('./lib/navigator-factory').create({
    isRoutePathWithHash: true,
    pushStateProvider: window.history,
    popStateProvider: window
  });
}());

var resolveRoute = require('./lib/resolve-route');

// The application's top-level Fragment. It's a _routed_ UI Fragment - basically a thin wrapper
//  around the UI Fragment, which listens on the given `route` and passes it into the wrapped UI
//  Fragment as a prop
var UiFragment = require('./fragments/ui/ui-fragment-bootstrap');

// Render the UI, at given route
var renderUi = function(route) {
  if (!(route = resolveRoute(route.path))) {
    return;
  }
  var elmUi = document.getElementById('playaUi');
  var ui = <UiFragment route={route} dispatchRequest={requestDispatcher.dispatch} />;
  ReactDom.render(ui, elmUi);
};

// `runApp` preloads all needed resources and kicks off the app
var runApp = function() {
  // Peek into current `window.location` and pluck `hash` to use as path of the app's initial route
  var initialRoute = {path: '/' + window.location.hash};

  renderUi(initialRoute);

  // On a request to navigate, delegate to `navigator.navigate`
  requestDispatcher.on('navigate', navigator.navigate); // The 'navigate' request carries the target route-path as payload

  // Re-render UI on new route, after navigation
  navigator.on('navigated', renderUi); // The 'navigated' event carries the target route as payload
};

//
var createApp = function() {
  return {run: runApp};
};

//
var appFactory = {create: createApp};

module.exports = appFactory;
