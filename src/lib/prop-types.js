'use strict';

var _ = require('underscore');
var React = require('react');

//
var withIsRequiredOption = function(createValidateFunc) {
  var validateAsRequired = function(props, propName, componentName) {
    if (props[propName] == null) { // eslint-disable-line eqeqeq
      return new Error('Required `' + propName + '` was not specified in `' + componentName + '`.');
    }
  };

  var createValidateFuncWithIsRequiredOption = function() {
    var validate = createValidateFunc.apply(null, arguments);
    validate.isRequired = validateAsRequired;
    return validate;
  };

  return createValidateFuncWithIsRequiredOption;
};

var isReactComponent = function(reactComponentMaybe) {
  // Simplistic but probably adequate check: React Components are constructor functions
  //  with a prototype that contains `render` and a couple of lifecycle methods
  // var funcNames = ['render', 'componentDidMount', 'componentWillUnmount'];
  // return _.isFunction(reactComponentMaybe) && _.all(funcNames, function(funcName) {
  //   return reactComponentMaybe.prototype.hasOwnProperty(funcName);
  // })
  //
  // Correction: The check above, _does not work_ for Components which are pure render functions
  return _.isFunction(reactComponentMaybe);
};

var customPropTypes = {
  // Ensure that prop is a Backbone Model with given attributes of given shape `attrsShape`
  backboneModel: function(attrsShape) {
    return React.PropTypes.shape({
      attributes: React.PropTypes.shape(attrsShape),
      get: React.PropTypes.func.isRequired
    });
  },

  // Ensure that prop is a Backbone Collection
  backboneCollection: function() {
    return React.PropTypes.shape({
      models: React.PropTypes.array.isRequired,
      get: React.PropTypes.func.isRequired
    });
  },

  // Ensure that prop is a component-store containing Components of given `requiredComponentTypes`
  componentStore: withIsRequiredOption(function(requiredComponentTypes) {
    if (!_.isArray(requiredComponentTypes)) {
      throw new Error('Invalid argument supplied to componentStore prop-type. Expected array.');
    }

    return function(props, propName, componentName) {
      var componentStore = props[propName];
      var nonComponentTypes = _.reject(requiredComponentTypes, function(componentType) {
        return isReactComponent(componentStore[componentType]);
      });
      if (nonComponentTypes.length) {
        nonComponentTypes = _.map(nonComponentTypes, function(type) {
          return '`' + type + '`';
        }).join(', ');
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' +
          componentName + '`. Missing or ivalid Components: ' + nonComponentTypes + '.');
      }
    };
  }),

  // Esnure that prop is a React Component - TODO: Write a proper validator for this as current
  //  one doesn't really validate much
  reactComponent: withIsRequiredOption(function() {
    return function(props, propName, componentName) {
      if (!isReactComponent(props[propName])) {
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName +
          '`. Expected a React Component.');
      }
    };
  })
};

var extendedPropTypes = _.extend(customPropTypes, React.PropTypes);

module.exports = extendedPropTypes;
