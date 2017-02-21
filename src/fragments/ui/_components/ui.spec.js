/* eslint-env es6, mocha */

'use strict';

const _ = require('underscore');
const chai = require('chai');
// const sinon = require('sinon');
// chai.use(require('sinon-chai'));
const expect = chai.expect;
const React = require('react');
const enzyme = require('enzyme');

const Ui = require('./ui'); // CUT
// const cn = require('./ui.scss.json');
// const cls = _.mapObject(cn, v => `.${v}`);

const componentStore = {
  UiHeader: () => <div className='theUiHeader' />,
  UiFooter: () => <div className='theUiFooter' />
};

// The UI Component requires that a child element is passed to it (to be rendered as the UI's main
//  content). This is a dummy Component to be used for that purpose
const Dummy = () => <div className='justADummy' />;

describe('The Ui Component', () => {
  it('should render UiHeader child', () => {
    const ui = enzyme.shallow(
      <Ui
        isEditable={false}
        dispatchRequest={_.noop}
        uiContentElement={<div />}
        componentStore={componentStore}>
        <Dummy />
      </Ui>
    );

    expect(ui.find(componentStore.UiHeader).length).to.equal(1);
  });

  it('should render UiFooter child propagating isEditable prop', () => {
    const ui = enzyme.shallow(
      <Ui
        isEditable
        dispatchRequest={_.noop}
        uiContentElement={<div />}
        componentStore={componentStore}>
        <Dummy />
      </Ui>
    );

    const uiFooter = ui.find(componentStore.UiFooter);
    expect(uiFooter.length).to.equal(1);
    expect(uiFooter.prop('isEditable')).to.be.true;
  });
});
