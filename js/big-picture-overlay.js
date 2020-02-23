'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImage = bigPicture.querySelector('.big-picture__img img');
  var bigPictureLikesCount = bigPicture.querySelector('.likes-count');
  var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
  var bigPictureCommentsList = bigPicture.querySelector('.social__comments');
  var bigPictureDescription = bigPicture.querySelector('.social__caption');
  var bigPictureSocialCommentCount = bigPicture.querySelector('.social__comment-count');
  var bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');

  window.server.loadData(function () {
    var picture = document.querySelector('.picture');

    var onPictureClick = function () {
      window.overlay.open(bigPicture);

      bigPictureImage.src = window.data.generatedData[0].url;
      bigPictureLikesCount.textContent = window.data.generatedData[0].likes;
      bigPictureCommentsCount.textContent = window.data.generatedData[0].comments.length;
      bigPictureDescription.textContent = window.data.generatedData[0].description;
      bigPictureCommentsList.textContent = '';
      bigPictureSocialCommentCount.classList.add('hidden');
      bigPictureCommentsLoader.classList.add('hidden');

      for (var j = 0; j < window.data.generatedData[0].comments.length; j++) {
        var listItem = document.createElement('li');
        var avatar = document.createElement('img');
        var paragraph = document.createElement('p');

        listItem.classList.add('social__comment');
        avatar.classList.add('social__picture');
        paragraph.classList.add('social__text');

        avatar.src = window.data.generatedData[0].comments[j].avatar;
        avatar.alt = window.data.generatedData[0].comments[j].name;
        avatar.width = 35;
        avatar.height = 35;

        paragraph.textContent = window.data.generatedData[0].comments[j].message;

        listItem.appendChild(avatar);
        listItem.appendChild(paragraph);
        bigPictureCommentsList.appendChild(listItem);
      }
    };

    picture.addEventListener('click', onPictureClick);
  });
})();
