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
      <a className={cn.logo} onClick={reqNav('/')} href="/">
        <props.componentStore.Logo />
      </a>
      {/*
      <nav className={cn.nav}>
        <a className={cn.navAbout} onClick={reqNav('/')}     href="/about"> About</a>
        <a className={cn.navPlay}  onClick={reqNav('/play')} href="/play">  Play</a>
      </nav>
      */}
      <div className={cn.searchSection}>
        <input type='text' className={cn.searchSectionInput} />
      </div>
      <button className={cn.showMenuButton}>
        <svg width="24px" height="24px" viewBox="0 0 48 48">
          <path d="M6 36h36v-4H6v4zm0-10h36v-4H6v4zm0-14v4h36v-4H6z" />
        </svg>
      </button>
    </div>
  );
};

UiHeader.propTypes = {
  componentStore: pt.componentStore(['Logo']).isRequired,
  dispatchRequest: pt.func.isRequired
};

module.exports = UiHeader;
