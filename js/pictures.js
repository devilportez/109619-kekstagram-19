'use strict';

(function () {
  var picturesBox = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var fragment = document.createDocumentFragment();

  window.server.loadData(function (pictures) {
    for (var i = 0; i < pictures.length; i++) {
      var picture = pictureTemplate.cloneNode(true);
      var image = picture.querySelector('.picture__img');
      var likesBox = picture.querySelector('.picture__likes');
      var commentsBox = picture.querySelector('.picture__comments');

      image.src = pictures[i].url;
      likesBox.textContent = pictures[i].likes;
      commentsBox.textContent = pictures[i].comments.length;

      fragment.appendChild(picture);
    }

    picturesBox.appendChild(fragment);
  });
})();
