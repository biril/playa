'use strict';

var _ = require('underscore');

// The routes as Regular expressions that will be reused. Remember to not do any global matching
//  as this causes problems with reused expressions. Note that the expressions _must_ be such that
//  there is a capturing group for each route param. `getParams` depends on that
var routes = {
  about: {
    exp: /^\/$/, // Just '/'
    getParams: function() {
      return {}; // No params
    }
  },

  play: {
    exp: /^\/#play\/(.+)$/, // '/#play/ABCD..3456' where 'ABCD..3456' is the remote-data URL
    getParams: function(matches) {
      return {remoteDataUrl: _.decodeURIComponent(matches[1])};
    }
  }
};

var resolveRoute = function(routePath) {
  var matches;
  var matchedRouteName = _.findKey(routes, function(route) {
    return (matches = route.exp.exec(routePath));
  });
  return matchedRouteName && {
    name: matchedRouteName,
    path: routePath,
    params: routes[matchedRouteName].getParams(matches)
  };
};

module.exports = resolveRoute;
