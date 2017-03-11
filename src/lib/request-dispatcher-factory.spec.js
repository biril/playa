/* eslint-env es6, mocha */

'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
chai.use(require('sinon-chai'));

const requestDispatcherFactory = require('./request-dispatcher-factory.js'); // MUT

describe('The requestDispatcherFactory', () => {
  it('should expose a .create() method that returns a requestDispatcher instance', () => {
    const requestDispatcher = requestDispatcherFactory.create();
    expect(requestDispatcher).to.have.property('dispatch').that.is.a('function');
  });
});

describe('requestDispatcher.dispatch', () => {
  it('should invoke listeners registered with requestDispatcher.on', () => {
    const requestDispatcher = requestDispatcherFactory.create();
    const onSomeEvent = sinon.spy();

    requestDispatcher.on('someEvent', onSomeEvent);
    requestDispatcher.dispatch('someEvent');

    expect(onSomeEvent).to.have.been.calledOnce;
  });

  it('should invoke listeners with given payload', () => {
    const requestDispatcher = requestDispatcherFactory.create();
    const onSomeEvent = sinon.spy();

    requestDispatcher.on('someEvent', onSomeEvent);
    requestDispatcher.dispatch('someEvent', {some: 'payload'}, 1);

    expect(onSomeEvent).to.have.been.calledWith({some: 'payload'}, 1);
  });

it('should not invoke listeners unregistered with requestDispatcher.off', () => {
    const requestDispatcher = requestDispatcherFactory.create();
    const onSomeEvent = sinon.spy();

    requestDispatcher.on('someEvent', onSomeEvent);
    requestDispatcher.off('someEvent');
    requestDispatcher.dispatch('someEvent');

    expect(onSomeEvent).to.not.have.been.called;
  });

  it('should invoke listeners registered with requestDispatcher.once only once', () => {
    const requestDispatcher = requestDispatcherFactory.create();
    const onSomeEvent = sinon.spy();

    requestDispatcher.once('someEvent', onSomeEvent);
    requestDispatcher.dispatch('someEvent');
    requestDispatcher.dispatch('someEvent');

    expect(onSomeEvent).to.have.been.calledOnce;
  });
});
