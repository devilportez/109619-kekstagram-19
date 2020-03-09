'use strict';

(function () {
  var RANDOMIZE_NUMBER = 0.5;
  var RANDOM_PICTURES_AMOUNT = 10;

  window.server.loadData(function (pictures) {
    var filter = document.querySelector('.img-filters');

    window.pictures.render(pictures);

    var copyPictures = function () {
      return pictures.slice();
    };

    var filterByDefault = function () {
      window.pictures.render(pictures);
    };

    var filterRandom = function () {
      var picturesCopy = copyPictures();

      picturesCopy.sort(function () {
        return RANDOMIZE_NUMBER - Math.random();
      });

      window.pictures.render(picturesCopy.slice(0, RANDOM_PICTURES_AMOUNT));
    };

    var filterByPopular = function () {
      var picturesCopy = copyPictures();

      picturesCopy.sort(function (first, second) {
        return second.comments.length - first.comments.length;
      });

      window.pictures.render(picturesCopy);
    };

    var buttonIdToFilterFunction = {
      'filter-default': filterByDefault,
      'filter-random': filterRandom,
      'filter-discussed': filterByPopular
    };

    var onFilterClick = function (evt) {
      if (evt.target && evt.target.matches('.img-filters__button')) {
        var target = evt.target;
        var activeButton = filter.querySelector('.img-filters__button--active');

        activeButton.classList.remove('img-filters__button--active');
        target.classList.add('img-filters__button--active');

        window.debounce.set(function () {
          buttonIdToFilterFunction[target.id]();
        });
      }
    };

    filter.addEventListener('click', onFilterClick);
    filter.classList.remove('img-filters--inactive');
  });
})();
