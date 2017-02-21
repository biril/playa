'use strict';

var React = require('react');
var pt = require('playa/prop-types');
var cn = require('./footer.scss.json');

var UiFooter = function(props) {
  return (
    <div className={cn.uiFooter}>
      <div className={cn.copyright}>All Content is ©2017. All Rights Reserved.</div>
      <div className={cn.logo}><props.componentStore.Logo /></div>
    </div>
  );
};

UiFooter.propTypes = {
  componentStore: pt.componentStore(['Logo']).isRequired,
  dispatchRequest: pt.func.isRequired
};

module.exports = UiFooter;
