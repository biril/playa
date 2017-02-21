// A factory for component-stores. Exports a single `create` method that facilitates the creation of
//  a compoment-store, given a hash of Components. Example use:
//
// ```
// var store = componentStoreFactory.create({
//   SomeComponent: SomeComponent,
//   MyOtherComponent: React.createClass({/* .. */}),
//   YetAnotherComponent: function(props) {/* .. */},
//   // More components follow ..
// });
//
// // To make use of a Component that is available in the store:
// return <store.SomeComponent />;
// ```

'use strict';

var _ = require('underscore');

var createComponentStore = function(components) {
  var componentStore = {};

  _.each(components, function(component, componentName) {
    Object.defineProperty(componentStore, componentName, {
      configurable: false,
      enumerable: true,
      get: function() {
        return component;
      }
    });

  });

  return componentStore;
};

var componentStoreFactory = {create: createComponentStore};

module.exports = componentStoreFactory;
