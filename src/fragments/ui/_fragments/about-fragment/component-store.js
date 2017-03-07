'use strict';

var componentStoreFactory = require('playa/component-store-factory');

var store = componentStoreFactory.create({
  About: require('./_components/about/about')
});

module.exports = store;
