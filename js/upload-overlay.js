'use strict';

(function () {
  var ESCAPE_KEY = 'Escape';
  var SCALE_MAX = 100;
  var SCALE_MIN = 25;
  var SCALE_STEP = 25;
  var HASHTAG_MAX_LENGTH = 20;
  var HASHTAGS_MAX_AMOUNT = 5;
  var FILE_TYPES = ['png', 'jpg', 'jpeg', 'gif'];

  var uploadInput = document.querySelector('.img-upload__input');
  var uploadForm = document.querySelector('.img-upload__form');
  var uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
  var uploadCancel = uploadOverlay.querySelector('.img-upload__cancel');
  var uploadPreviewImage = uploadOverlay.querySelector('.img-upload__preview img');
  var uploadEffects = uploadOverlay.querySelector('.img-upload__effects');
  var effectLevelBox = uploadOverlay.querySelector('.img-upload__effect-level');
  var effectLevelPin = uploadOverlay.querySelector('.effect-level__pin');
  var effectLevelLine = uploadOverlay.querySelector('.effect-level__line');
  var effectLevelDepth = uploadOverlay.querySelector('.effect-level__depth');
  var effectsPreviews = uploadOverlay.querySelectorAll('.effects__preview');
  var scaleControl = uploadOverlay.querySelector('.scale__control--value');
  var scaleControlBigger = uploadOverlay.querySelector('.scale__control--bigger');
  var scaleControlSmaller = uploadOverlay.querySelector('.scale__control--smaller');
  var hashtagsInput = uploadOverlay.querySelector('.text__hashtags');

  var openUploadOverlay = function () {
    window.overlay.open(uploadOverlay);

    document.addEventListener('keydown', onUploadCancelEscapeKeydown);
    scaleControlBigger.addEventListener('click', onScaleBiggerClick);
    scaleControlSmaller.addEventListener('click', onScaleSmallerClick);
    uploadEffects.addEventListener('click', onFilterClick);
    uploadCancel.addEventListener('click', onUploadCancelClick);
    effectLevelPin.addEventListener('mousedown', onEffectLevelPinMouseDown);
    hashtagsInput.addEventListener('change', onHashtagsInputChange);
    uploadForm.addEventListener('submit', onUploadFormSubmit);

    resetImage();
  };

  var closeUploadOverlay = function () {
    window.overlay.close(uploadOverlay);

    document.removeEventListener('keydown', onUploadCancelEscapeKeydown);
    scaleControlBigger.removeEventListener('click', onScaleBiggerClick);
    scaleControlSmaller.removeEventListener('click', onScaleSmallerClick);
    uploadEffects.removeEventListener('click', onFilterClick);
    uploadCancel.removeEventListener('click', onUploadCancelClick);
    effectLevelPin.removeEventListener('mousedown', onEffectLevelPinMouseDown);
    hashtagsInput.removeEventListener('change', onHashtagsInputChange);
    uploadForm.removeEventListener('submit', onUploadFormSubmit);

    uploadInput.value = null;
  };

  var onSuccessSubmit = function () {
    closeUploadOverlay();
    uploadForm.reset();
    window.message.render('success');
  };

  var onErrorSubmit = function () {
    closeUploadOverlay();
    uploadForm.reset();
    window.message.render('error');
  };

  var getCurrentScale = function () {
    return parseInt(scaleControl.value, 10);
  };

  var setScale = function (value) {
    scaleControl.value = value + '%';
    uploadPreviewImage.style.transform = 'scale(' + value / 100 + ')';
  };

  var onScaleBiggerClick = function () {
    if (getCurrentScale() !== SCALE_MAX) {
      setScale(getCurrentScale() + SCALE_STEP);
    }
  };

  var onScaleSmallerClick = function () {
    if (getCurrentScale() !== SCALE_MIN) {
      setScale(getCurrentScale() - SCALE_STEP);
    }
  };

  var applyFilterToPreviewImage = function (evt) {
    uploadPreviewImage.style.filter = null;

    if (evt.target && evt.target.matches('input')) {
      if (evt.target.value === 'none') {
        effectLevelBox.classList.add('hidden');
      } else {
        effectLevelBox.classList.remove('hidden');
      }

      uploadPreviewImage.classList = 'effects__preview--' + evt.target.value;
    }

    effectLevelPin.style.left = effectLevelLine.offsetWidth + 'px';
    effectLevelDepth.style.width = '100%';
  };

  var onUploadInputChange = function () {
    var file = uploadInput.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (type) {
      return fileName.endsWith(type);
    });

    if (matches) {
      var fileReader = new FileReader();

      fileReader.addEventListener('load', function () {
        uploadPreviewImage.src = fileReader.result;
        effectsPreviews.forEach(function (preview) {
          preview.style.backgroundImage = 'url(' + fileReader.result + ')';
        });
        openUploadOverlay();
      });

      fileReader.readAsDataURL(file);
    }
  };

  var onUploadCancelClick = function () {
    closeUploadOverlay();
  };

  var onUploadCancelEscapeKeydown = function (evt) {
    if (evt.key === ESCAPE_KEY && !(evt.target.matches('input') || evt.target.matches('textarea'))) {
      closeUploadOverlay();
    }
  };

  var onFilterClick = function (evt) {
    applyFilterToPreviewImage(evt);
  };

  var calculateEffectLevel = function () {
    return Math.floor(effectLevelPin.offsetLeft * 100 / effectLevelLine.offsetWidth);
  };

  var limitEffectLevelPin = function (value, min, max) {
    if (value < min) {
      value = min;
    } else if (value > max) {
      value = max;
    }

    return value;
  };

  var onEffectLevelPinMouseDown = function (evt) {
    var startCoordinateX = evt.clientX;

    var onEffectLevelPinMouseMove = function (moveEvt) {
      var shiftX = startCoordinateX - moveEvt.clientX;
      var appliedFilterName = uploadEffects.querySelector('.effects__radio:checked').value;
      var effectLevel = calculateEffectLevel();
      var effectLevelPinNewPosition = effectLevelPin.offsetLeft - shiftX;

      var filterNameToEffect = {
        'chrome': 'grayscale(' + effectLevel / 100 + ')',
        'sepia': 'sepia(' + effectLevel / 100 + ')',
        'marvin': 'invert(' + effectLevel + '%)',
        'phobos': 'blur(' + effectLevel * 0.03 + 'px)',
        'heat': 'brightness(' + effectLevel * 0.03 + ')'
      };

      uploadPreviewImage.style.filter = filterNameToEffect[appliedFilterName];
      startCoordinateX = moveEvt.clientX;

      effectLevelPin.style.left = limitEffectLevelPin(effectLevelPinNewPosition, 0, effectLevelLine.offsetWidth) + 'px';
      effectLevelDepth.style.width = calculateEffectLevel() + '%';
    };

    var onEffectLevelPinMouseUp = function () {
      window.removeEventListener('mousemove', onEffectLevelPinMouseMove);
      window.removeEventListener('mouseup', onEffectLevelPinMouseUp);
    };

    window.addEventListener('mousemove', onEffectLevelPinMouseMove);
    window.addEventListener('mouseup', onEffectLevelPinMouseUp);
  };

  var onUploadFormSubmit = function (evt) {
    evt.preventDefault();
    window.server.sendData(new FormData(uploadForm), onSuccessSubmit, onErrorSubmit);
  };

  var onHashtagsInputChange = function (evt) {
    var hashtags = evt.target.value.toLowerCase().split(' ');
    var hasError = false;
    var errorFieldStyle = '2px solid red';
    var hashtagsStore = {};

    var renderHashtagsInputError = function (errorText, style) {
      hashtagsInput.setCustomValidity(errorText);
      hashtagsInput.style.border = style;
    };

    if (hashtags.length > HASHTAGS_MAX_AMOUNT) {
      renderHashtagsInputError('Максимальное количество хэш-тегов 5', errorFieldStyle);
      hasError = true;
      return;
    }

    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i].indexOf('#') === -1) {
        renderHashtagsInputError('Хэш-тег должен начинаться с решетки', errorFieldStyle);
        hasError = true;
        break;
      }
      if (hashtags[i] === '#') {
        renderHashtagsInputError('Хэш-тег не может состоять из одной решетки', errorFieldStyle);
        hasError = true;
        break;
      }
      if (hashtags[i].length > HASHTAG_MAX_LENGTH) {
        renderHashtagsInputError('Максимальная длина одного хэш-тега 20 символов, включая решётку', errorFieldStyle);
        hasError = true;
        break;
      }
      if (!(/^#[A-Za-zА-Яа-я0-9]+$/gi).test(hashtags[i])) {
        renderHashtagsInputError('Хэш-тег может состоять только из букв и цифр', errorFieldStyle);
        hasError = true;
        break;
      }

      hashtagsStore[hashtags[i]] = (hashtagsStore[hashtags[i]] !== undefined) ? hashtagsStore[hashtags[i]] + 1 : 1;

      if (hashtagsStore[hashtags[i]] > 1) {
        renderHashtagsInputError('Один и тот же хэш-тег не может быть использован дважды', errorFieldStyle);
        hasError = true;
        break;
      }
    }

    if (!hasError) {
      renderHashtagsInputError('', null);
    }
  };

  var resetImage = function () {
    setScale(SCALE_MAX);

    uploadPreviewImage.style.filter = null;
    uploadPreviewImage.classList = 'effects__preview--none';

    effectLevelBox.classList.add('hidden');
  };

  uploadInput.addEventListener('change', onUploadInputChange);
})();
