'use strict';

(function () {
  var openOverlay = function (overlayElement) {
    overlayElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
  };

  var closeOverlay = function (overlayElement) {
    overlayElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
  };

  window.overlay = {
    open: openOverlay,
    close: closeOverlay,
  };
})();
