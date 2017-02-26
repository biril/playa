'use strict';

var _ = require('underscore');
var React = require('react');
var pt = require('playa/prop-types');

var requestDispatcherFactory = require('playa/request-dispatcher-factory');

var COMPONENT_NAME_FOR_SECTION_ID = Object.freeze({
  about: 'AboutFragment',
  play: 'PlayFragment'
});

var UiFragment = React.createClass({
  propTypes: {
    childSectionId: pt.string.isRequired,
    fetchRemoteData: pt.func.isRequired,
    componentStore: pt.componentStore(['AboutFragment', 'PlayFragment']).isRequired,
    dispatchRequest: pt.func.isRequired
  },

  getInitialState: function() {
    return {statusMessage: null};
  },

  componentWillMount: function() {
    this.createRequestDispatcher();
    this.startListeningOnRequestDispatcher();
  },

  componentWillUnmount: function() {
    this.stopListeningOnRequestDispatcher();
  },

  createRequestDispatcher: function() {
    this.requestDispatcher = requestDispatcherFactory.create();
  },

  startListeningOnRequestDispatcher: function() {
    // Forward 'navigate' requests to parent
    this.requestDispatcher.on({
      navigate: _.partial(this.props.dispatchRequest, 'navigate'),
      fetchRemoteData: this.fetchRemoteData
    });
  },

  stopListeningOnRequestDispatcher: function() {
    this.requestDispatcher.off(null, null, this);
  },

  // Get UI Fragment's Child Component, that is appropriate for section of given id, `sectionId`. For
  //  each child-section that may be the current one, inside the UI, there's an appropriate child
  //  Component which will be acquired by this function. Will return falsy if no Component is found
  //  for given section-id
  getChildComponentForSectionId: function(sectionId) {
    return this.props.componentStore[COMPONENT_NAME_FOR_SECTION_ID[sectionId]] || (function() {
      console.log('uiFragment: Cannot get Component for unexpected section id "' + sectionId + '"');
    }());
  },

  //
  fetchRemoteData: function(remoteDataUrl) {
    this.props.fetchRemoteData(remoteDataUrl)
    .then(function(data) {
      this.props.dispatchRequest('navigate', '/play');
      this.setState({statusMessage: 'Got remote data ' + data});
    }.bind(this))
    .fail(function(error) {
      this.props.dispatchRequest('navigate', '/play');
      this.setState({statusMessage: '' + error});
    }.bind(this));
  },

  render: function() {
    var ChildComponent = this.getChildComponentForSectionId(this.props.childSectionId);
    var dispatchRequest = this.requestDispatcher.dispatch.bind(this.requestDispatcher);
    var Ui = this.props.componentStore.Ui;

    return (
      <Ui
        dispatchRequest={dispatchRequest}
        componentStore={this.props.componentStore}
      >
        <ChildComponent
          statusMessage={this.state.statusMessage}
          dispatchRequest={dispatchRequest}
          componentStore={this.props.componentStore}
        />
      </Ui>
    );
  }
});

module.exports = UiFragment;
