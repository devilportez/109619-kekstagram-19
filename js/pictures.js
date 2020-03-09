'use strict';

(function () {
  var picturesBox = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var fragment = document.createDocumentFragment();

  var renderPictures = function (data) {
    var pictures = document.querySelectorAll('.picture');

    if (pictures.length) {
      pictures.forEach(function (picture) {
        picture.remove();
      });
    }

    data.forEach(function (picture) {
      var pictureNode = pictureTemplate.cloneNode(true);
      var image = pictureNode.querySelector('.picture__img');
      var likesBox = pictureNode.querySelector('.picture__likes');
      var commentsBox = pictureNode.querySelector('.picture__comments');

      var onPictureClick = function () {
        window.bigPictureOverlay.render(picture);
      };

      image.src = picture.url;
      likesBox.textContent = picture.likes;
      commentsBox.textContent = picture.comments.length;

      pictureNode.addEventListener('click', onPictureClick);

      fragment.appendChild(pictureNode);
    });

    picturesBox.appendChild(fragment);
  };

  window.pictures = {
    render: renderPictures
  };
})();
