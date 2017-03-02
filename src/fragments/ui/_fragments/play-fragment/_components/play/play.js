'use strict';

var React = require('react');
var pt = require('playa/prop-types');
var cn = require('./play.scss.json');

var Play = function(props) {
  var mpegTags = props.mpegData && JSON.stringify(props.mp3Parser.readTags(props.mpegData), null, 2);
  return (
    <div className={cn.play}>
      <div className={cn.statusMessage}>{props.statusMessage}</div>
      <pre className={cn.mpegTags}>{mpegTags}</pre>
    </div>
  );
};

Play.propTypes = {
  mpegData: pt.object,
  statusMessage: pt.string,
  mp3Parser: pt.shape({readTags: pt.func.isRequired}).isRequired,
  componentStore: pt.componentStore([]).isRequired
};

module.exports = Play;
