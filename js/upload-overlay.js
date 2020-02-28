'use strict';

(function () {
  var ESCAPE_KEY = 'Escape';
  var FILE_TYPES = ['png', 'jpg', 'jpeg', 'gif'];

  var uploadInput = document.querySelector('.img-upload__input');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadCancel = uploadOverlay.querySelector('.img-upload__cancel');
  var uploadPreviewImage = uploadOverlay.querySelector('.img-upload__preview img');
  var uploadEffects = uploadOverlay.querySelector('.img-upload__effects');
  var effectLevelPin = uploadOverlay.querySelector('.effect-level__pin');
  var effectLevelLine = uploadOverlay.querySelector('.effect-level__line');
  var hashtagsInput = document.querySelector('.text__hashtags');

  var openUploadOverlay = function () {
    window.overlay.open(uploadOverlay);

    uploadCancel.addEventListener('click', onUploadCancelClick);
    uploadEffects.addEventListener('click', onFilterClick);
    effectLevelPin.addEventListener('mouseup', onEffectLevelPinMouseUp);
    document.addEventListener('keydown', onUploadCancelEscapeKeydown);
  };

  var closeUploadOverlay = function () {
    window.overlay.close(uploadOverlay);

    uploadCancel.removeEventListener('click', onUploadCancelClick);
    uploadEffects.removeEventListener('click', onFilterClick);
    effectLevelPin.removeEventListener('mouseup', onEffectLevelPinMouseUp);
    document.removeEventListener('keydown', onUploadCancelEscapeKeydown);
    uploadInput.value = null;
    uploadPreviewImage.classList = 'effects__preview--none';
  };

  var applyFilterToPreviewImage = function (evt) {
    uploadPreviewImage.style.filter = null;

    if (evt.target && evt.target.matches('input')) {
      uploadPreviewImage.classList = 'effects__preview--' + evt.target.value;
    }
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
        openUploadOverlay();
      });

      fileReader.readAsDataURL(file);
    }
  };

  var onUploadCancelClick = function () {
    closeUploadOverlay();
  };

  var onUploadCancelEscapeKeydown = function (evt) {
    if (evt.key === ESCAPE_KEY) {
      closeUploadOverlay();
    }
  };

  var onFilterClick = function (evt) {
    applyFilterToPreviewImage(evt);
  };

  var onEffectLevelPinMouseUp = function () {
    var currentEffect = getComputedStyle(uploadPreviewImage).getPropertyValue('filter');
    var effectLevel = Math.floor(effectLevelPin.offsetLeft * 100 / effectLevelLine.offsetWidth);

    var effects = [
      'grayscale(1)',
      'sepia(1)',
      'invert(1)',
      'blur(3px)',
      'brightness(3)'
    ];

    var applyEffects = [
      'grayscale(' + effectLevel / 100 + ')',
      'sepia(' + effectLevel / 100 + ')',
      'invert(' + effectLevel + '%)',
      'blur(' + effectLevel * 0.03 + 'px)',
      'brightness(' + effectLevel * 0.03 + ')'
    ];

    for (var j = 0; j < effects.length; j++) {
      if (currentEffect === effects[j]) {
        uploadPreviewImage.style.filter = applyEffects[j];
      }
    }
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

  uploadInput.addEventListener('change', onUploadInputChange);
})();
