'use strict';

var React = require('react');
var pt = require('playa/prop-types');
var cn = require('./play.scss.json');

var Play = function(props) {
  return <div className='play' />;
};

Play.propTypes = {
  componentStore: pt.componentStore([]).isRequired
};

module.exports = Play;
