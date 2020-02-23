'use strict';

(function () {
  var loadData = function (onSuccess) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('GET', 'https://js.dump.academy/kekstagram/data');
    xhr.send();
  };

  window.server = {
    loadData: loadData
  };
})();
