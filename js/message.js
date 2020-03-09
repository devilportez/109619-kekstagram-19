'use strict';

(function () {
  var ESCAPE_KEY = 'Escape';

  var main = document.querySelector('main');

  var renderMessage = function (selector) {
    var template = document.querySelector('#' + selector).content.querySelector('.' + selector);
    var node = template.cloneNode('true');
    var button = node.querySelector('.' + selector + '__button');

    var closeMessage = function () {
      node.remove();
    };

    var onButtonClick = function () {
      closeMessage();
    };

    var onEscapeKeydown = function (evt) {
      if (evt.key === ESCAPE_KEY) {
        closeMessage();
      }
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
