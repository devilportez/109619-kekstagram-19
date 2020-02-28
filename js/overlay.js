'use strict';

(function () {
  var openOverlay = function (overlay) {
    overlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
  };

  var closeOverlay = function (overlay) {
    overlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
  };

  window.overlay = {
    open: openOverlay,
    close: closeOverlay,
  };
})();
