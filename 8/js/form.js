const deactivateForm = function () {
  const adForm = document.querySelector('.ad-form');
  const adFormFieldsets = adForm.querySelectorAll('fieldset');
  const adFormSlider = adForm.querySelector('.ad-form__slider');
  const adFormMapFilters = document.querySelector('.map__filters');

  adForm.classList.add('ad-form--disabled');
  adFormFieldsets.forEach((adFormFieldset) => {
    adFormFieldset.disabled = true;
  });
  adFormSlider.disabled = true;
  adFormSlider.classList.add('ad-form__slider--disabled');
  adFormMapFilters.disabled = true;
  adFormMapFilters.classList.add('map__filters--disabled');
};

const activateForm = function () {
  const adForm = document.querySelector('.ad-form');
  const adFormFieldsets = adForm.querySelectorAll('fieldset');
  const adFormSlider = adForm.querySelector('.ad-form__slider');
  const adFormMapFilters = document.querySelector('.map__filters');

  adForm.classList.remove('ad-form--disabled');
  adFormFieldsets.forEach((adFormFieldset) => {
    adFormFieldset.disabled = false;
  });
  adFormSlider.disabled = false;
  adFormSlider.classList.remove('ad-form__slider--disabled');
  adFormMapFilters.disabled = false;
  adFormMapFilters.classList.remove('map__filters--disabled');
};

export {deactivateForm};
export {activateForm};
