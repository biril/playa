'use strict';

var _ = require('underscore');
var Backbone = require('backbone');

var createRequestDispatcher = function() {
  var eventDispatcher = _.extend({}, Backbone.Events);

  var requestDispatcher = {
    dispatch: function() {
      eventDispatcher.trigger.apply(eventDispatcher, arguments);
    }
  };

  _.each(['on', 'off', 'once'], function(funcName) {
    requestDispatcher[funcName] = function() {
      eventDispatcher[funcName].apply(eventDispatcher, arguments);
    };
  });

  return requestDispatcher;
};

var requestDispatcherFactory = {create: createRequestDispatcher};

module.exports = requestDispatcherFactory;
