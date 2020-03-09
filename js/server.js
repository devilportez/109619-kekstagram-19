'use strict';

(function () {
  var TIMEOUT = 10000;
  var URL = 'https://js.dump.academy/kekstagram';
  var SUCCESS_CODE = 200;

  var createXHR = function () {
    return new XMLHttpRequest();
  };

  var loadData = function (onSuccess) {
    var xhr = createXHR();
    var url = URL + '/data';

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('GET', url);
    xhr.send();
  };

  var sendData = function (data, onSuccess, onError) {
    var xhr = createXHR();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.timeout = TIMEOUT;

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.server = {
    loadData: loadData,
    sendData: sendData
  };
})();
