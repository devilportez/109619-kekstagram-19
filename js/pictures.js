'use strict';

(function () {
  var picturesBox = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < window.data.generatedData.length; i++) {
    var picture = pictureTemplate.cloneNode(true);
    var image = picture.querySelector('.picture__img');
    var likesBox = picture.querySelector('.picture__likes');
    var commentsBox = picture.querySelector('.picture__comments');

    image.src = window.data.generatedData[i].url;
    likesBox.textContent = window.data.generatedData[i].likes;
    commentsBox.textContent = window.data.generatedData[i].comments.length;

    fragment.appendChild(picture);
  }

  picturesBox.appendChild(fragment);
})();
