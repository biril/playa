'use strict';

var React = require('react');
var pt = require('playa/prop-types');
var cn = require('./play.scss.json');

var Play = function(props) {
  // var mpegTags = props.mpegData && JSON.stringify(props.mp3Parser.readTags(props.mpegData), null, 2);
  var mpegSections = props.mpegData && props.mp3Parser.readTags(props.mpegData);

  return (
    <div className={cn.play}>
      <div className={cn.statusMessage}>{props.statusMessage}</div>
      {mpegSections &&
        <section className={cn.sectionsAsTable}>
          <props.componentStore.MpegSectionsAsTable mpegSections={mpegSections} componentStore={props.componentStore}/>
        </section>
      }
      {mpegSections &&
        <section className={cn.sectionsAsJson}>
          <props.componentStore.MpegSectionsAsJson mpegSections={mpegSections} />
        </section>
      }
    </div>
  );
};

Play.propTypes = {
  mpegData: pt.object,
  statusMessage: pt.string,
  mp3Parser: pt.shape({readTags: pt.func.isRequired}).isRequired,
  componentStore: pt.componentStore(['MpegSectionsAsTable', 'MpegSectionsAsJson']).isRequired
};

module.exports = Play;
