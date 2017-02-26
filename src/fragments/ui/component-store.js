'use strict';

var componentStoreFactory = require('playa/component-store-factory');

var componentStore = componentStoreFactory.create({
  Ui:            require('./_components/ui'),
  UiHeader:      require('./_components/header/header'),
  UiFooter:      require('./_components/footer/footer'),
  Logo:          require('./_components/logo/logo'),
  PlayFragment:  require('./_fragments/play-fragment/play-fragment-bootstrap'),
  AboutFragment: require('./_fragments/about-fragment/about-fragment-bootstrap')
});

module.exports = componentStore;
