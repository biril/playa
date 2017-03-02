'use strict';

var React = require('react');
var pt = require('playa/prop-types');
var cn = require('./mpeg-sections-as-json.scss.json');

var MpegSectionsAsJson = function(props) {
  var mpegSections = JSON.stringify(props.mpegSections, null, 2);
  return (
    <div className={cn.mpegSectionsAsJson}>
      <pre className={cn.json}>{mpegSections}</pre>
    </div>
  );
};

MpegSectionsAsJson.propTypes = {
  mpegSections: pt.arrayOf(pt.shape({
    _section: pt.shape({type: pt.string.isRequired}).isRequired
  })).isRequired
};

module.exports = MpegSectionsAsJson;
