/* eslint react/no-set-state: 0 */

'use strict';

var _ = require('underscore');
var React = require('react');
var pt = require('playa/prop-types');

var requestDispatcherFactory = require('playa/request-dispatcher-factory');

var COMPONENT_NAME_FOR_SECTION_ID = Object.freeze({
  about: 'AboutFragment',
  play: 'PlayFragment'
});

var STATUS_MESSAGE_READY = 'Ready. Enter a URL to fetch remote data';

var UiFragment = React.createClass({
  propTypes: {
    route: pt.route.isRequired,
    fetchRemoteData: pt.func.isRequired,
    componentStore: pt.componentStore(['AboutFragment', 'PlayFragment']).isRequired,
    dispatchRequest: pt.func.isRequired
  },

  getInitialState: function() {
    return {
      remoteDataUrl: this.props.route.params.remoteDataUrl || '',
      statusMessage: STATUS_MESSAGE_READY,
      mpegData: null
    };
  },

  componentWillMount: function() {
    this.createRequestDispatcher();
    this.startListeningOnRequestDispatcher();
    this.curFrdTask = {abandon: _.noop}; // Dummy

    var route = this.props.route;
    if (route.name === 'play' && route.params.remoteDataUrl) {
      this.fetchRemoteData(route.params.remoteDataUrl);
    }
  },

  componentWillReceiveProps: function(nextProps) {
    var nr = nextProps.route;
    if (nr.name === 'play' && nr.params.remoteDataUrl) {
      this.setState({remoteDataUrl: nr.params.remoteDataUrl});
      this.fetchRemoteData(nr.params.remoteDataUrl);
    }
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
      fetchRemoteData: function(remoteDataUrl) {
        this.props.dispatchRequest('navigate', '/#play/' + _.encodeURIComponent(remoteDataUrl));
      }
    }, this);
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

  createFrdTask: function(remoteDataUrl) {
    var task = {
      fetch: this.frdTaskFetch,
      showFetched: this.frdTaskShowFetched,
      fail: this.frdTaskFail,
      fin: this.frdTaskFin
    };

    task.run = function() {
      console.log('FetchRemoteData Task: Running ' + remoteDataUrl);
      task.fetch(remoteDataUrl)
      .then(task.showFetched)
      .fail(task.fail)
      .fin(task.fin);
      return task;
    };

    task.abandon = _.partial(_.each, _.functions(this.curFrdTask), function(subTaskName) {
      console.log('FetchRemoteData Task: Abandoning ' + remoteDataUrl);
      task[subTaskName] = _.noop;
    });

    return task;
  },

  frdTaskFetch: function(remoteDataUrl) {
    this.setState({statusMessage: '[…] Fetching remote data'});
    return this.props.fetchRemoteData(remoteDataUrl);
  },

  frdTaskShowFetched: function(mpegData) {
    this.setState({
      statusMessage: '[✔] Fetched remote data',
      mpegData: mpegData
    });
  },

  frdTaskFail: function(error) {
    this.setState({statusMessage: '[✘] Error fetching remote data ► ' + error});
  },

  frdTaskFin: function() {
    // TODO: ..
  },

  //
  fetchRemoteData: function(remoteDataUrl) {
    remoteDataUrl = remoteDataUrl.trim();

    if (!remoteDataUrl) {
      return;
    }

    this.curFrdTask.abandon();
    this.curFrdTask = this.createFrdTask(remoteDataUrl).run();
  },

  render: function() {
    var childSectionId = this.props.route.name; // The route's name is a good enough child-section id
    var ChildComponent = this.getChildComponentForSectionId(childSectionId);
    var dispatchRequest = this.requestDispatcher.dispatch.bind(this.requestDispatcher);
    var Ui = this.props.componentStore.Ui;

    return (
      <Ui
        remoteDataUrl={this.state.remoteDataUrl}
        dispatchRequest={dispatchRequest}
        componentStore={this.props.componentStore}
      >
        <ChildComponent
          mpegData={this.state.mpegData}
          statusMessage={this.state.statusMessage}
          dispatchRequest={dispatchRequest}
          componentStore={this.props.componentStore}
        />
      </Ui>
    );
  }
});

module.exports = UiFragment;
