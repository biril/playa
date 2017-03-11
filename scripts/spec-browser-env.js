// Create a 'browser environment' for the specs (executed in Node) to run in. This is done by
//  use of jsdom. According to enzyme documentation React's source code makes several assumptions
//  about the environment it is running in, and one of them is that the global.document that is
//  found at "require time" is going to be the one and only document it ever needs to worry about'.
//  Therefore, the browser environment needs to be set up _once_, _before_ any specs (or React
//  itself for that matter) is loaded. We achieve this by having mocha `--require spec-broser-env`
//  as part of its invocation. For further information on this, see
//  https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md

/* global document */

const jsdom = require('jsdom').jsdom;

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};
