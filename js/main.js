'use strict';

var ELEMENTS_AMOUNT = 25;
var LIKES_AMOUNT_MIN = 15;
var LIKES_AMOUNT_MAX = 200;
var AVATAR_START_NUMBER = 1;
var AVATAR_END_NUMBER = 6;
var COMMENTS_AMOUNT_MIN = 5;
var COMMENTS_AMOUNT_MAX = 50;

var descriptions = [
  'Я тебя не застану дома',
  'И не встречу случайно в парке',
  'Но письмо положу на песок',
  'Море наш почтальон',
  'В этом мире мне все не знакомо',
  'День как снег безупречный, но маркий',
  'И в любой из искомых дорог',
  'Горе наш компаньон',
  'Как же мог я забыть твое имя',
  'И твой образ, достойный картин',
  'Но я верю напишешь и ты мне',
  'Моя лилия лилия роза жасмин'
];

var messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var names = [
  'Кристина',
  'Мария',
  'Екатерина',
  'Евгения',
  'Анна',
  'Константин',
  'Илья',
  'Кирилл',
  'Алексей',
  'Александр'
];

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateData = function (elementsAmount) {
  var data = [];

  var generateComment = function () {
    return {
      avatar: 'img/avatar-' + getRandomInRange(AVATAR_START_NUMBER, AVATAR_END_NUMBER) + '.svg',
      message: messages[getRandomInRange(0, messages.length - 1)],
      name: names[getRandomInRange(0, names.length - 1)]
    };
  };

  for (var i = 0; i < elementsAmount; i++) {
    data.push({
      url: 'photos/' + (i + 1) + '.jpg',
      description: descriptions[getRandomInRange(0, descriptions.length - 1)],
      likes: getRandomInRange(LIKES_AMOUNT_MIN, LIKES_AMOUNT_MAX),
      comments: []
    });

    for (var j = 0; j < getRandomInRange(COMMENTS_AMOUNT_MIN, COMMENTS_AMOUNT_MAX); j++) {
      data[i].comments.push(generateComment());
    }
  }

  return data;
};

var generatedData = generateData(ELEMENTS_AMOUNT);
var picturesBox = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var fragment = document.createDocumentFragment();

for (var i = 0; i < generatedData.length; i++) {
  var picture = pictureTemplate.cloneNode(true);
  var image = picture.querySelector('.picture__img');
  var likesBox = picture.querySelector('.picture__likes');
  var commentsBox = picture.querySelector('.picture__comments');

  image.src = generatedData[i].url;
  likesBox.textContent = generatedData[i].likes;
  commentsBox.textContent = generatedData[i].comments.length;

  fragment.appendChild(picture);
}

picturesBox.appendChild(fragment);


var bigPicture = document.querySelector('.big-picture');
var bigPictureImage = bigPicture.querySelector('.big-picture__img img');
var bigPictureLikesCount = bigPicture.querySelector('.likes-count');
var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
var bigPictureCommentsList = bigPicture.querySelector('.social__comments');
var bigPictureDescription = bigPicture.querySelector('.social__caption');
var bigPictureSocialCommentCount = bigPicture.querySelector('.social__comment-count');
var bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');

bigPicture.classList.remove('hidden');
bigPictureImage.src = generatedData[0].url;
bigPictureLikesCount.textContent = generatedData[0].likes;
bigPictureCommentsCount.textContent = generatedData[0].comments.length;
bigPictureDescription.textContent = generatedData[0].description;
bigPictureCommentsList.textContent = '';
bigPictureSocialCommentCount.classList.add('hidden');
bigPictureCommentsLoader.classList.add('hidden');
document.body.classList.add('modal-open');

for (var j = 0; j < generatedData[0].comments.length; j++) {
  var listItem = document.createElement('li');
  var avatar = document.createElement('img');
  var paragraph = document.createElement('p');

  listItem.classList.add('social__comment');
  avatar.classList.add('social__picture');
  paragraph.classList.add('social__text');

  avatar.src = generatedData[0].comments[j].avatar;
  avatar.alt = generatedData[0].comments[j].name;
  avatar.width = 35;
  avatar.height = 35;

  paragraph.textContent = generatedData[0].comments[j].message;

  listItem.appendChild(avatar);
  listItem.appendChild(paragraph);
  bigPictureCommentsList.appendChild(listItem);
}
