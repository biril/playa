/* eslint-env es6, mocha */

'use strict';

// const _ = require('underscore');
const chai = require('chai');
// const sinon = require('sinon');
// chai.use(require('sinon-chai'));
const expect = chai.expect;
const React = require('react');
const enzyme = require('enzyme');

const If = require('./if.js'); // CUT

describe('The If Component', () => {

  it('should render element returned by thenRender if isTrue', () => {
    const component = enzyme.render(<If isTrue thenRender={() => <div className='child' />} />);
    expect(component.find('.child')).to.have.lengthOf(1);
  });

  it('should render element returned by elseRender if not isTrue and elseRender is given', () => {
    const component = enzyme.render(
      <If
        isTrue={false}
        thenRender={() => <div className='childOne' />}
        elseRender={() => <div className='childTwo' />} />
    );

    expect(component.find('.childOne')).to.have.lengthOf(0);
    expect(component.find('.childTwo')).to.have.lengthOf(1);
  });

  // (~1) ## Rendering (based on props) ## Static
  it('(~1) should render component returned by thenRender if isTrue (static rendering)', () => {
    const SomeComponent = () => <div className='someComponent' />;
    const component = enzyme.render(<If isTrue thenRender={() => <SomeComponent />} />);
    expect(component.find('.someComponent')).to.have.lengthOf(1);
  });

  // (~2) ## Rendering (based on props) ## Shallow version of (~1)
  it('(~2) should render component returned by thenRender if isTrue (shallow rendering version of ~1)', () => {
    const SomeComponent = () => <div className='someComponent' />;
    const component = enzyme.shallow(<If isTrue thenRender={() => <SomeComponent />} />);

    // find()ing the child Component by constructor works - however finding it by class name
    //  doesn't. That is, `component.find('.someComponent') has length 0
    expect(component.find(SomeComponent)).to.have.lengthOf(1);
  });

  // ## Rendering (based on props) ##
  it('should render component returned by elseRender if not isTrue and elseRender is given', () => {
    const ChildOne = () => <div className='childOne' />;
    const ChildTwo = () => <div className='childTwo' />;

    const component = enzyme.render(
      <If
        isTrue={false}
        thenRender={() => <ChildOne />}
        elseRender={() => <ChildTwo />} />
    );

    expect(component.find('.childOne')).to.have.lengthOf(0);
    expect(component.find('.childTwo')).to.have.lengthOf(1);
  });

  // ## Rendering (based on props) ##
  it('should render nothing if not isTrue and elseRender is not given', () => {
    const SomeComponent = () => <div className='someComponent' />;
    const elm = enzyme.render(<If isTrue={false} thenRender={() => <SomeComponent />} />);
    expect(elm.find('.comeComponent')).to.have.lengthOf(0);
  });
});
