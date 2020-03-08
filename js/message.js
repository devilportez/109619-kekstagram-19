'use strict';

(function () {
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

    var onBackClick = function (evt) {
      if (evt.target && evt.target.matches('.' + selector)) {
        closeMessage();
      }
    };

    node.addEventListener('click', onBackClick);
    button.addEventListener('click', onButtonClick);
    main.appendChild(node);
  };

  window.message = {
    render: renderMessage
  };
})();
