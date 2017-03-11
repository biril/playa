/* eslint-env es6, mocha */

'use strict';

const _ = require('underscore');
const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));
const expect = chai.expect;
const React = require('react');
const enzyme = require('enzyme');

const UiHeader = require('./header'); // CUT
const cn = require('./header.scss.json');
const cls = _.mapObject(cn, v => `.${v}`);

const createFauxEvent = () => ({preventDefault() {}});

const routes = [{clsKey: 'navAbout', path: '/'}, {clsKey: 'navPlay', path: '/#play'}];

describe('The UiHeader Component', () => {
  it('TODO');
});
