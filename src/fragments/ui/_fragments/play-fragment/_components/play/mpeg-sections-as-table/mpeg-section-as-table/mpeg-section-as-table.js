// Renders given MPEG audio file section as a table. A 'section' may be an individual frame as well as
//  an ID3v2 or Xing/Lame tag

'use strict';

// var _ = require('underscore');
var React = require('react');
var pt = require('playa/prop-types');
var cn = require('./mpeg-section-as-table.scss.json');

var MpegSectionAsTable = function(props) {
  return (
    <div className={cn.mpegSectionAsTable}>
      <div className={cn.heading}>{props.mpegSection._section.type}</div>
      <div className={cn.body}>{JSON.stringify(props.mpegSection)}</div>
    </div>
  );
};

MpegSectionAsTable.propTypes = {
  mpegSection: pt.shape({
    _section: pt.shape({type: pt.string.isRequired}).isRequired
  }).isRequired
};

module.exports = MpegSectionAsTable;
