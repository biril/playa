'use strict';

var _ = require('underscore');
var React = require('react');
var pt = require('playa/prop-types');
var cn = require('./header.scss.json');

var REMOTE_DATA_URL_INPUT_LAG = 300;

var UiHeader = function(props) {
  // Helper that returns a function that dispatches a 'navigate' request to the given route-path
  var nav = function() {
    var requestArguments = Array.prototype.concat.apply(['navigate'], arguments);
    return function(event) {
      event.preventDefault(); // Prevent browser from navigating - we'll be taking care of it
      props.dispatchRequest.apply(null, requestArguments);
    };
  };

  var requestFetchRemoteData = _.debounce(function(remoteDataUrl) {
    if (remoteDataUrl) {
      props.dispatchRequest('fetchRemoteData', remoteDataUrl);
    }
  }, REMOTE_DATA_URL_INPUT_LAG);

  var onInputChanged = function(event) {
    requestFetchRemoteData(event.target.value.trim());
  };

  var onInputElmRendered = function(inputElm) {
    if (inputElm) {
      inputElm.value = props.remoteDataUrl;
    }
  };

  return (
    <div className={cn.uiHeader}>
      <a className={cn.logo} onClick={nav('/')} href="/"><props.componentStore.Logo /></a>
      <div className={cn.searchRemoteDataSection}>
        <input
          type='text'
          className={cn.remoteDataUrlInput}
          onChange={onInputChanged}
          ref={onInputElmRendered}
        />
      </div>
    </div>
  );
};

UiHeader.propTypes = {
  remoteDataUrl: pt.string.isRequired,
  componentStore: pt.componentStore(['Logo']).isRequired,
  dispatchRequest: pt.func.isRequired
};

module.exports = UiHeader;
