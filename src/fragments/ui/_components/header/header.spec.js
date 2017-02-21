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

const routes = [{clsKey: 'navAbout', path: '/about'}, {clsKey: 'navPlay', path: '/play'}];

describe('The UiHeader Component', () => {

  // ## Upward data flow ## Shallow
  it('should request navigate("/") when logo clicked', () => {
    const dispatchRequest = sinon.spy();
    const header = enzyme.shallow(<UiHeader dispatchRequest={dispatchRequest} />);
    const logoElm = header.find(cls.logo);

    logoElm.simulate('click', createFauxEvent());

    expect(dispatchRequest).to.have.been.calledWith('navigate', '/');
  });

  const routeSpec = route => {
    return () => {
      const dispatchRequest = sinon.spy();
      const header = enzyme.shallow(<UiHeader dispatchRequest={dispatchRequest} />);
      const nav = header.find(cls[route.clsKey]);

      nav.simulate('click', createFauxEvent());

      expect(dispatchRequest).to.have.been.calledWith('navigate', route.path);
    };
  };

  // ## Upward data flow ##
  // Relies on the `routeSpec` helper above. For each known route, expect that clicking on the
  //  element of the class that matches the route will trigger an appropriate 'navigate' event
  _.each(routes, route =>
    it(`should request navigate("${route.path}") when ${route.clsKey} clicked`, routeSpec(route)));
});
