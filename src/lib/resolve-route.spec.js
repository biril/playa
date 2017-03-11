/* eslint-env es6, mocha */

'use strict';

const _ = require('underscore');
const chai = require('chai');
const expect = chai.expect;

const resolveRoute = require('./resolve-route');

var testRoutes = [
  {path: '/', params: {}, name: 'about'},
  {path: '/#play/someFetchDataUrl', params: {fetchDataUrl: 'someFetchDataUrl'}, name: 'play'},
  {path: '/#play/!@#$%^&*()_=,./<>?', params: {fetchDataUrl: '!@#$%^&*()_=,./<>?'}, name: 'play'}
];

describe.only('The resolveRoute function', () => {
  _.each(testRoutes, testRoute => {
    it(`should resolve route '${testRoute.name}', of path '${testRoute.path}'`, () => {
      const actualRoute = resolveRoute(testRoute.path);
      expect(actualRoute.name).to.equal(testRoute.name);
      expect(actualRoute.params).to.deep.equal(testRoute.params);
    });
  });

  it('should not resolve (= return falsy for) unknown routes', () => {
    const actualRoute = resolveRoute('/#unexpected');
    expect(actualRoute).to.not.be.ok;
  });
});
