'use strict';

var React = require('react');
var pt = require('playa/prop-types');
var cn = require('./header.scss.json');

var UiHeader = function(props) {
  // Helper that returns a function that dispatches a 'navigate' request to the given route-path
  var reqNav = function() {
    var requestArguments = Array.prototype.concat.apply(['navigate'], arguments);
    return function(event) {
      event.preventDefault(); // Prevent browser from navigating - we'll be taking care of it
      props.dispatchRequest.apply(null, requestArguments);
    };
  };

  return (
    <div className={cn.uiHeader}>
      <a className={cn.logo} onClick={reqNav('/')} href="/"><props.componentStore.Logo /></a>
      <div className={cn.searchRemoteDataSection}>
        <input
          type='text'
          className={cn.remoteDataUrlInput}
          onChange={function(event) {props.dispatchRequest('fetchRemoteData', event.target.value);}}
        />
      </div>
    </div>
  );
};

UiHeader.propTypes = {
  componentStore: pt.componentStore(['Logo']).isRequired,
  dispatchRequest: pt.func.isRequired
};

module.exports = UiHeader;
