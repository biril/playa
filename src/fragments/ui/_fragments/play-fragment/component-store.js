'use strict';

var componentStoreFactory = require('playa/component-store-factory');

var store = componentStoreFactory.create({
  Play: require('./_components/play/play')
});

module.exports = store;
