'use strict';

(function () {
  var DELAY = 500;

  var timer;

  var setDebounce = function (callback) {
    if (timer) {
      window.clearTimeout(timer);
    }

    timer = window.setTimeout(callback, DELAY);
  };

  window.debounce = {
    set: setDebounce
  };
})();
