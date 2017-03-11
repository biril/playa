/* eslint-env es6, mocha */

'use strict';

const _ = require('underscore');
const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));
const expect = chai.expect;
const React = require('react');
const enzyme = require('enzyme');

const UiFooter = require('./footer.js'); // CUT
const cn = require('./footer.scss.json');
const cls = _.mapObject(cn, v => `.${v}`);

const noOp = () => (() => {}); // Helper that returns a no-op to reuse

describe('The UiFooter Component', () => {
  // TODO ..
});
