'use strict';

(function () {
  var ESCAPE_KEY = 'Escape';

  var renderMessage = function (selector) {
    var main = document.querySelector('main');
    var template = document.querySelector('#' + selector).content.querySelector('.' + selector);
    var node = template.cloneNode('true');
    var button = node.querySelector('.' + selector + '__button');

    var onEscapeKeydown = function (evt) {
      if (evt.key === ESCAPE_KEY) {
        closeMessage();
      }
    };

    var closeMessage = function () {
      node.remove();
      node = null;

      // node.removeEventListener('click', onBackClick);
      // button.removeEventListener('click', onButtonClick);
    };

    var onButtonClick = function () {
      closeMessage();
    };

    var onBackClick = function (evt) {
      if (evt.target && evt.target.matches('.' + selector)) {
        closeMessage();
      }
    };

    node.addEventListener('click', onBackClick);
    button.addEventListener('click', onButtonClick);
    document.addEventListener('keydown', onEscapeKeydown);
    main.appendChild(node);
  };

  window.message = {
    render: renderMessage
  };
})();
