'use strict';

(function () {
  var LIKES_AMOUNT_MIN = 15;
  var LIKES_AMOUNT_MAX = 200;
  var AVATAR_START_NUMBER = 1;
  var AVATAR_END_NUMBER = 6;
  var COMMENTS_AMOUNT_MIN = 5;
  var COMMENTS_AMOUNT_MAX = 50;
  var ELEMENTS_AMOUNT = 25;

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

  var getRandomNumberInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var generateComment = function () {
    return {
      avatar: 'img/avatar-' + getRandomNumberInRange(AVATAR_START_NUMBER, AVATAR_END_NUMBER) + '.svg',
      message: messages[getRandomNumberInRange(0, messages.length - 1)],
      name: names[getRandomNumberInRange(0, names.length - 1)]
    };
  };

  var generateData = function (elementsAmount) {
    var data = [];

    for (var i = 0; i < elementsAmount; i++) {
      data.push({
        url: 'photos/' + (i + 1) + '.jpg',
        description: descriptions[getRandomNumberInRange(0, descriptions.length - 1)],
        likes: getRandomNumberInRange(LIKES_AMOUNT_MIN, LIKES_AMOUNT_MAX),
        comments: []
      });

      for (var j = 0; j < getRandomNumberInRange(COMMENTS_AMOUNT_MIN, COMMENTS_AMOUNT_MAX); j++) {
        data[i].comments.push(generateComment());
      }
    }

    return data;
  };

  window.data = {
    generatedData: generateData(ELEMENTS_AMOUNT)
  };
})();
