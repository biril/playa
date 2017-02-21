/* eslint-env es6, mocha */

'use strict';

const expect = require('chai').expect;

const _ = require('./underscore-extensions.js').get(); // MUT

describe('_.cloneArray', () => {
  it('should return a copy of given array', () => {
    const array = ['firstThing', 'secondThing'];
    const clone = _.cloneArray(array);

    expect(clone).to.deep.equal(['firstThing', 'secondThing']);
  });

  it('should return a copy that is shallow', () => {
    const array = [{someProp: 'someOriginalValue'}, 0];

    const clone = _.cloneArray(array);
    clone[0].someProp = 'anEditedValue';

    expect(array[0].someProp).to.equal('anEditedValue');
  });
});

describe('_.deepClone', () => {
  it('should return a copy of given array', () => {
    const array = ['firstThing', 'secondThing'];
    const clone = _.deepClone(array);

    expect(clone).to.deep.equal(['firstThing', 'secondThing']);
  });

  it('should return a copy of given object', () => {
    const obj = {foo: {bar: {baz: ['maybe']}}};
    const clone = _.deepClone(obj);

    expect(clone).to.deep.equal({foo: {bar: {baz: ['maybe']}}});
  });

  it('should return a copy that is deep', () => {
    const obj = {foo: {bar: {baz: ['maybe']}}};
    const clone = _.deepClone(obj);

    clone.foo.bar.baz[0] = 'certainly';

    expect(obj.foo.bar.baz[0]).to.equal('maybe');
  });
});

describe('_.findIndexWhere', () => {
  it('should return the index of the first element that matches all given properties', () => {
    const haystack = [
      {yes: true, one: 1},
      {yes: true, one: 2},
      {yes: true, one: 1, two: 'two', stuff: []},
      {yes: true, one: 1, two: 'two'}
    ];

    const needleIndex = _.findIndexWhere(haystack, {yes: true, one: 1, two: 'two'});

    expect(needleIndex).to.equal(2);
  });

  it('should return -1 if no element matches all given properties', () => {
    const haystack = [{yes: true, one: 1, stuff: []}];
    const needleIndex = _.findIndexWhere(haystack, {yes: true, one: 1, two: 'two'});
    expect(needleIndex).to.equal(-1);
  });
});

describe('_.withoutIndex', () => {
  it('should return array in which the element of given index is not present', () => {
    const array = ['nil', 'one', 'two'];

    const oneTwo = _.withoutIndex(array, 0);
    const nilTwo = _.withoutIndex(array, 1);
    const nilOne = _.withoutIndex(array, 2);

    expect(oneTwo).to.deep.equal(['one', 'two']);
    expect(nilTwo).to.deep.equal(['nil', 'two']);
    expect(nilOne).to.deep.equal(['nil', 'one']);
  });

  it('should return a copy of given array', () => {
    const array = ['one', 'two'];
    _.withoutIndex(array, 0);
    expect(array).to.have.lengthOf(2);
  });

  it('should return a copy that is shallow', () => {
    const array = [{someProp: 'someOriginalValue'}, 0];

    const copy = _.withoutIndex(array, 1);
    copy[0].someProp = 'anEditedValue';

    expect(array[0].someProp).to.equal('anEditedValue');
  });
});

describe('_.offsetIndex', () => {
  it('should return array in which the element of given index is offset by given +offset', () => {
    const array = ['a', 'b', 'c', 'd', 'e'];
    const res = _.offsetIndex(array, 1, 2);
    expect(res).to.deep.equal(['a', 'c', 'd', 'b', 'e']);
  });

  it('should return array in which the element of given index is offset by given -offset', () => {
    const array = ['a', 'b', 'c', 'd', 'e'];
    const res = _.offsetIndex(array, 3, -2);
    expect(res).to.deep.equal(['a', 'd', 'b', 'c', 'e']);
  });

  it('should return array identical to given if given offset is 0', () => {
    const array = ['a', 'b', 'c', 'd', 'e'];
    const res = _.offsetIndex(array, 2, 0);
    expect(res).to.deep.equal(array);
  });

  it('should not offset elements past the end of the array', () => {
    const array = ['a', 'b', 'c', 'd'];
    const res = _.offsetIndex(array, 1, 3);
    expect(res).to.deep.equal(['a', 'c', 'd', 'b']);
  });

  it('should not offset elements past the beginning of the array', () => {
    const array = ['a', 'b', 'c', 'd'];
    const res = _.offsetIndex(array, 2, -3);
    expect(res).to.deep.equal(['c', 'a', 'b', 'd']);
  });

  it('should return a copy of given array', () => {
    const array = ['one', 'two'];
    _.offsetIndex(array, 0, 1);
    expect(array).to.deep.equal(['one', 'two']);
  });

  it('should return a copy that is shallow', () => {
    const array = ['one', 'two', {someProp: 'someOriginalValue'}];

    const copy = _.offsetIndex(array, 0, 1);
    copy[2].someProp = 'anEditedValue';

    expect(array[2].someProp).to.equal('anEditedValue');
  });
});
