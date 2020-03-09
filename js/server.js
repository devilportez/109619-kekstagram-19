'use strict';

(function () {
  var loadData = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    var url = 'https://js.dump.academy/kekstagram/data';

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('GET', url);
    xhr.send();
  };

  var sendData = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    var url = 'https://js.dump.academy/kekstagram';

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
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

    xhr.timeout = 10000;

    xhr.open('POST', url);
    xhr.send(data);
  };

  window.server = {
    loadData: loadData,
    sendData: sendData
  };
})();
