'use strict';

var React = require('react');
var pt = require('playa/prop-types');
var cn = require('./about.scss.json');

var REMOTE_DATA_EXAMPLE_URL =
  'https://raw.githubusercontent.com/biril/audio-test-data/master/layer3/v2/16000_032_m.mp3';

var About = function(props) {
  var fetchRemoteDataUrl = '/#play/' + props.encodeURIComponent(REMOTE_DATA_EXAMPLE_URL);

  var onClickedRemoteDataExampleUrl = function(event) {
    event.preventDefault();
    props.dispatchRequest('fetchRemoteData', REMOTE_DATA_EXAMPLE_URL);
  };

  return (
    <div className={cn.about}>
      Try fetching remote data.
      For example <a href={fetchRemoteDataUrl} onClick={onClickedRemoteDataExampleUrl}>this</a>.
    </div>
  );
};

About.propTypes = {
  encodeURIComponent: pt.func.isRequired,
  dispatchRequest: pt.func.isRequired
};

module.exports = About;
