'use strict';

var React = require('react');
var pt = require('playa/prop-types');
var cn = require('./ui.scss.json');

var Ui = function(props) {
  var content = React.Children.only(props.children);
  return (
    <div className={cn.ui}>
      <header className={cn.header}>
        <props.componentStore.UiHeader
          remoteDataUrl={props.remoteDataUrl}
          componentStore={props.componentStore}
          dispatchRequest={props.dispatchRequest}
        />
      </header>
      <main className={cn.content}>{content}</main>
      <footer className={cn.footer}>
        <props.componentStore.UiFooter
          componentStore={props.componentStore}
          dispatchRequest={props.dispatchRequest}
        />
      </footer>
    </div>
  );
};

Ui.propTypes = {
  remoteDataUrl: pt.string.isRequired,
  dispatchRequest: pt.func.isRequired,
  componentStore: pt.componentStore(['UiHeader', 'UiFooter']).isRequired,
  children: pt.element.isRequired // We expect a single child - the UI's content
};

module.exports = Ui;
