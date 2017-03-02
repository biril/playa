// Renders given MPEG audio file sections as a table: A 'section' may be an individual frame as well
//  as an ID3v2 or Xing/Lame tags

'use strict';

var _ = require('underscore');
var React = require('react');
var pt = require('playa/prop-types');
var cn = require('./mpeg-sections-as-table.scss.json');

var MpegSectionsAsTable = function(props) {
  var sectionElms = _.map(props.mpegSections, function(mpegSection) {
    return (
      <li key={mpegSection._section.offset} className={cn.mpegSectionAsTable}>
        <props.componentStore.MpegSectionAsTable mpegSection={mpegSection} componentStore={props.componentStore} />
      </li>
    );
  });
  return <ul className={cn.mpegSectionsAsTable}>{sectionElms}</ul>;
};

MpegSectionsAsTable.propTypes = {
  mpegSections: pt.arrayOf(pt.shape({
    _section: pt.shape({type: pt.string.isRequired}).isRequired
  })).isRequired,
  componentStore: pt.componentStore(['MpegSectionAsTable']).isRequired
};

module.exports = MpegSectionsAsTable;
