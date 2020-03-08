'use strict';

(function () {
  var ESCAPE_KEY = 'Escape';
  var COMMENTS_VISIBLE_AMOUNT = 5;

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImage = bigPicture.querySelector('.big-picture__img img');
  var bigPictureLikesCount = bigPicture.querySelector('.likes-count');
  var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
  var bigPictureCommentsList = bigPicture.querySelector('.social__comments');
  var bigPictureDescription = bigPicture.querySelector('.social__caption');
  var bigPictureSocialCommentCount = bigPicture.querySelector('.social__comment-count');
  var bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');

  var renderBigPictureOverlay = function (data) {
    var lastShowedCommentsIndex = COMMENTS_VISIBLE_AMOUNT;

    var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

    var closeBigPictureOverlay = function () {
      window.overlay.close(bigPicture);

      bigPictureClose.removeEventListener('click', onCloseClick);
      document.removeEventListener('keydown', onEscapeKeydown);
    };

    var onCloseClick = function () {
      closeBigPictureOverlay();
    };

    var onEscapeKeydown = function (evt) {
      if (evt.key === ESCAPE_KEY) {
        closeBigPictureOverlay();
      }
    };

    var onCommentLoaderClick = function () {
      renderComment(data.comments, lastShowedCommentsIndex, lastShowedCommentsIndex + COMMENTS_VISIBLE_AMOUNT);
      lastShowedCommentsIndex += COMMENTS_VISIBLE_AMOUNT;
    };

    var renderComment = function (comments, startIndex, lastIndex) {
      comments.slice(startIndex, lastIndex).forEach(function (comment) {
        var listItem = document.createElement('li');
        var avatar = document.createElement('img');
        var paragraph = document.createElement('p');

        listItem.classList.add('social__comment');
        avatar.classList.add('social__picture');
        paragraph.classList.add('social__text');

        avatar.src = comment.avatar;
        avatar.alt = comment.name;
        avatar.width = 35;
        avatar.height = 35;
        paragraph.textContent = comment.message;

        listItem.appendChild(avatar);
        listItem.appendChild(paragraph);
        bigPictureCommentsList.appendChild(listItem);
      });

      if (lastIndex >= comments.length) {
        bigPictureCommentsLoader.classList.add('hidden');
        lastIndex = comments.length;
      } else {
        bigPictureCommentsLoader.classList.remove('hidden');
      }

      bigPictureSocialCommentCount.textContent = lastIndex + ' из ' + comments.length + ' комментариев';
    };

    bigPictureImage.src = data.url;
    bigPictureLikesCount.textContent = data.likes;
    bigPictureCommentsCount.textContent = data.comments.length;
    bigPictureDescription.textContent = data.description;
    bigPictureCommentsList.textContent = null;

    renderComment(data.comments, 0, lastShowedCommentsIndex);

    window.overlay.open(bigPicture);
    document.addEventListener('keydown', onEscapeKeydown);
    bigPictureClose.addEventListener('click', onCloseClick);
    bigPictureCommentsLoader.addEventListener('click', onCommentLoaderClick);
  };

  window.bigPictureOverlay = {
    render: renderBigPictureOverlay
  };
})();
