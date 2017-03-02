'use strict';

var componentStoreFactory = require('playa/component-store-factory');

var store = componentStoreFactory.create({
  Play: require('./_components/play/play'),
  MpegSectionsAsJson: require('./_components/play/mpeg-sections-as-json/mpeg-sections-as-json'),
  MpegSectionsAsTable: require('./_components/play/mpeg-sections-as-table/mpeg-sections-as-table'),
  MpegSectionAsTable: require('./_components/play/mpeg-sections-as-table/mpeg-section-as-table/mpeg-section-as-table')
});

module.exports = store;
