'use strict';

var _ = require('underscore');
var Backbone = require('backbone');

// Helper to extract the path from the current location. Will extract a path of '/about' from a
//  localtion of 'http://host:8765/about'
var extractPathFromCurLocation = function() {
  return window.location.pathname;
};

// Configured with:
//  * pushStateProvider: An object with a public `pushState` method. For example, `window.history`.
//     See https://developer.mozilla.org/en-US/docs/Web/API/History_API
//  * popStateProvider: An object featuring a public `onpopstate` property to be set to a handler
//     for the [popstate](https://developer.mozilla.org/en-US/docs/Web/Events/popstate) event.
//     Such as `window`.
var createNavigator = function(config) {
  var eventDispatcher = _.extend({}, Backbone.Events);
  var curRoute = {path: null}; // Initial, default route

  // Set the current route, as described by the given `route` object. The `route` object
  //  is documented as part of navigator's public `getCurRoute`. Setting the current route
  //  will always trigger a 'navigated' event with  the route's info as the event's payload
  var setCurRoute = function(route) {
    curRoute = route;
    eventDispatcher.trigger('navigated', route);
  };

  // 'popstate' is called on browser navigation that is _not_ internally initiated by navigator.
  //  E.g. when the user presses the back or forward button
  config.popStateProvider.onpopstate = function() {
    setCurRoute({path: extractPathFromCurLocation(), isNavigationInternal: false});
  };

  var navigator = {
    // Navigate to route of given path
    navigate: function(routePath) {
      if (curRoute.path === routePath) {
        // console.log('navigator: already at "' + routePath + '". Will not navigate');
        return;
      }

      // console.log('navigator: navigating to route of path "' + routePath + '"');

      // From MDN: Note that just calling `history.pushState()` or `history.replaceState()` won't
      //  trigger a popstate event. The popstate event will be triggered by doing a browser action
      //  such as a click on the back or forward button (or calling `history.back()` or
      //  `history.forward()` in JS).
      config.pushStateProvider.pushState(null, '', routePath);

      setCurRoute({path: routePath, isNavigationInternal: true});
    },

    // Get the current route. The route object will contain:
    //  * path: Path of the current route, e.g. '/home'
    //  * isNavigationInternal: a value indicating whether the navigation the invoked the current
    //     route was internal to the app or driven by the user, e.g. by use of the back or forward
    //     buttons
    // Note that returned route is a copy and cannot be changed
    getCurRoute: function() {
      return _.clone(curRoute);
    }
  };

  // Expose the events API on the navigator - for client code to be able to register listeners for
  //  the 'navigated' event. Don't expose `trigger` though as client code has no business with it -
  //  we only trigger 'navigated' and we only do it when we must
  _.each(['on', 'once', 'off', 'listenTo', 'listenToOnce', 'stopListening'], function(funcName) {
    navigator[funcName] = eventDispatcher[funcName].bind(eventDispatcher);
  });

  return navigator;
};

var NavigatorFactory = {create: createNavigator};

module.exports = NavigatorFactory;
