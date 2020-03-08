'use strict';

(function () {
  var ESCAPE_KEY = 'Escape';
  var FILE_TYPES = ['png', 'jpg', 'jpeg', 'gif'];

  var uploadInput = document.querySelector('.img-upload__input');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadForm = document.querySelector('.img-upload__form');
  var uploadCancel = uploadOverlay.querySelector('.img-upload__cancel');
  var uploadPreviewImage = uploadOverlay.querySelector('.img-upload__preview img');
  var uploadEffects = uploadOverlay.querySelector('.img-upload__effects');
  var effectLevelPin = uploadOverlay.querySelector('.effect-level__pin');
  var effectLevelLine = uploadOverlay.querySelector('.effect-level__line');
  var effectLevelDepth = uploadOverlay.querySelector('.effect-level__depth');
  var effectsPreviews = uploadOverlay.querySelectorAll('.effects__preview');
  var hashtagsInput = document.querySelector('.text__hashtags');

  var openUploadOverlay = function () {
    window.overlay.open(uploadOverlay);
  };

  var onSuccessSubmit = function () {
    closeUploadOverlay();
    window.message.render('success');
  };

  var onErrorSubmit = function () {
    closeUploadOverlay();
    window.message.render('error');
  };

  var closeUploadOverlay = function () {
    window.overlay.close(uploadOverlay);

    uploadCancel.removeEventListener('click', onUploadCancelClick);
    uploadEffects.removeEventListener('click', onFilterClick);
    effectLevelPin.removeEventListener('mousedown', onEffectLevelPinMouseDown);
    document.removeEventListener('keydown', onUploadCancelEscapeKeydown);
    uploadInput.value = null;
    uploadPreviewImage.classList = 'effects__preview--none';
  };

  var applyFilterToPreviewImage = function (evt) {
    uploadPreviewImage.style.filter = null;

    if (evt.target && evt.target.matches('input')) {
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

  hashtagsInput.addEventListener('change', function (evt) {
    var hashtags = evt.target.value.toLowerCase().split(' ');
    var isNotWithSharp = false;
    var isSharpOnly = false;

    for (var j = 0; j < hashtags.length; j++) {
      if (hashtags[j].indexOf('#') === -1) {
        isNotWithSharp = true;
      }
      if (hashtags[j] === '#') {
        isSharpOnly = true;
      }
    }

    if (isNotWithSharp) {
      hashtagsInput.setCustomValidity('Хэш-тег должен начинаться с решетки');
    } else if (hashtags.length > 5) {
      hashtagsInput.setCustomValidity('Максимальное количество хэш-тегов 5');
    } else if (isSharpOnly) {
      hashtagsInput.setCustomValidity('Хэш-тег не может состоять из одной решетки');
    } else {
      hashtagsInput.setCustomValidity('');
    }
  });

  uploadCancel.addEventListener('click', onUploadCancelClick);
  uploadEffects.addEventListener('click', onFilterClick);
  effectLevelPin.addEventListener('mousedown', onEffectLevelPinMouseDown);
  document.addEventListener('keydown', onUploadCancelEscapeKeydown);

  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.server.sendData(new FormData(uploadForm), onSuccessSubmit, onErrorSubmit);
  });

  uploadInput.addEventListener('change', onUploadInputChange);
})();
