'use strict';

var q = require('q');

var buildError = function (status, statusText) {
  var msg = 'Status: ' + status;
  if (statusText) { msg += ', ' + statusText; }
  return new Error(msg);
};

var fetchRemoteData = function(url) {
  var deferredData = q.defer();

  var request = new window.XMLHttpRequest();
  request.responseType = 'arraybuffer';

  request.onerror = function(event) {
    deferredData.reject(buildError(request.status, request.statusText));
  };

  request.onload = function(event) {
    if (request.readyState !== 4 || request.status !== 200) {
      deferredData.reject(buildError(request.status, request.statusText));
    }
    deferredData.resolve(new window.DataView(request.response));
  };

  try {
    request.open('GET', url, true);
    request.send(null);
  }
  catch (error) {deferredData.reject(error);}

  return deferredData.promise;
};

module.exports = fetchRemoteData;
