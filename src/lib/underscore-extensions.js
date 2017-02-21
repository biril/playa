'use strict';

var _ = require('underscore');

var extensions = {

  // Clones (creates a shallow copy of) the given array
  cloneArray: function(array) {
    return Array.prototype.slice.call(array);
  },

  // Deep copies given object. Current implementation only works on JSON-serializable objects
  deepClone: function(obj) {
    return JSON.parse(JSON.stringify(obj));
  },

  // Looks through the array and returns the index of the first value
  //  that matches all of the key-value pairs listed in properties
  findIndexWhere: function(array, attrs) {
    return _.findIndex(array, function(arrayElement) {
      return _.every(attrs, function(attrValue, attrName) {
        return arrayElement[attrName] === attrValue;
      });
    });
  },

  // Returns a copy of the array with the element of given index removed
  withoutIndex: function(array, index) {
    array = extensions.cloneArray(array);
    if (index >= 0 && index < array.length) {
      array.splice(index, 1);
    }
    return array;
  },

  // Returns a copy of the array with the element of given index offset within the array
  // `offsetIndex([a, b, c, d, e], 3, -2)` will produce
  //  +---+---+---+---+---+    +---+---+---+---+---+
  //  | a | b | c | d | e | => | a | d | b | c | e |
  //  +---+---+---+---+---+    +---+---+---+---+---+
  offsetIndex: function(array, index, offset) {
    var element = array[index];
    if (!element) {
      return extensions.cloneArray(array);
    }
    array = extensions.withoutIndex(array, index);
    index = Math.min(Math.max(0, index + offset), array.length);
    array.splice(index, 0, element);
    return array;
  },

  // Returns a copy of the array with all elements (cyclically) offset
  // `offset([a, b, c, d, e], 2)` will produce
  //  +---+---+---+---+---+    +---+---+---+---+---+
  //  | a | b | c | d | e | => | d | e | a | b | c |
  //  +---+---+---+---+---+    +---+---+---+---+---+
  // `offset([a, b, c, d, e], -2)` will produce
  //  +---+---+---+---+---+    +---+---+---+---+---+
  //  | a | b | c | d | e | => | c | d | e | a | b |
  //  +---+---+---+---+---+    +---+---+---+---+---+
  offset: function(array, offset) {
    if (!offset) {return extensions.cloneArray(array);}

    // If offset > 0 get the last offset (= 2) elements: [d, e]
    // If offset < 0 get the last length - offset (= 3) elements: [c, d, e]
    var head = array.slice(-offset);

    // If offset > 0 get the first length - offset (= 3) elements: [a, b, c]
    // If offset < 0 get the first offset (= 2) elements: [a, b]
    var tail = offset > 0 ? _.initial(array, offset) : _.first(array, -offset);

    return head.concat(tail);
  },

  // Returns a copy of the array reordered as indicated by given order-array
  // `reorder([a, b, c, d, e], [2, 4, 0, 1, 3])` will produce
  //  +---+---+---+---+---+    +---+---+---+---+---+
  //  | a | b | c | d | e | => | c | e | a | b | d |
  //  +---+---+---+---+---+    +---+---+---+---+---+
  reorder: function(array, order) {
    return _.map(order, function(index) {
      return array[index];
    });
  }
};

module.exports = {get: function() {return _.clone(extensions);}};
