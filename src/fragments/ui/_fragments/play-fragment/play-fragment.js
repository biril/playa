'use strict';

var React = require('react');
var pt = require('playa/prop-types');

var PlayFragment = React.createClass({
  propTypes: {
    mpegData: pt.object,
    statusMessage: pt.string,
    mp3Parser: pt.shape({readTags: pt.func.isRequired}).isRequired,
    componentStore: pt.componentStore(['Play']).isRequired,
    dispatchRequest: pt.func.isRequired
  },

  render: function() {
    return (
      <this.props.componentStore.Play
        mpegData={this.props.mpegData}
        statusMessage={this.props.statusMessage}
        mp3Parser={this.props.mp3Parser}
        componentStore={this.props.componentStore}
      />
    );
  }
});

module.exports = PlayFragment;
