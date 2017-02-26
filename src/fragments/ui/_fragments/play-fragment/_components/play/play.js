'use strict';

var React = require('react');
var pt = require('playa/prop-types');
var cn = require('./play.scss.json');

var Play = function(props) {
  return (
    <div className={cn.play}>
      <div className={cn.statusMessage}>{props.statusMessage}</div>
    </div>
  );
};

Play.propTypes = {
  statusMessage: pt.string,
  componentStore: pt.componentStore([]).isRequired
};

module.exports = Play;
