import {
  resetMap,
  createMapMarkers
} from './map.js';
import {
  STARTER_POINT
} from './map.js';
import {
  resetImage,
  resetAvatar
} from './preview.js';
import {
  debounce,
  sendErrorMessage,
  sendSuccedMessage
} from './utils.js';
import {
  resetFilter
} from './filtring.js';

const SLIDER_PACE = 1;

const HEADER_LENGTH = {
  min: 30,
  max: 100
};

const MAX_CAPACITY = '100';
const MIN_CAPACITY = '0';

const MAX_PRICE = 100000;
const MINIMAL_PRICE_LISTING = {
  'flat': 1000,
  'bungalow': 0,
  'house': 5000,
  'palace': 10000,
  'hotel': 3000,
};

const ALL_OPTIONS = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const POSTING_ADDRESS = 'https://27.javascript.pages.academy/keksobooking';

const adForm = document.querySelector('.ad-form');
const actualProperty = adForm.querySelector('#price');
const variants = adForm.querySelector('#type');
const rooms = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const actualTimeIn = adForm.querySelector('#timein');
const actualTimeOut = adForm.querySelector('#timeout');
const resetButton = adForm.querySelector('.ad-form__reset');

const switchStateElements = (elements, status) => {
  elements.forEach((element) => {
    element.disabled = status;
  });
};

const switchFormStatus = (status) => {
  const fieldsets = adForm.querySelectorAll('fieldset');
  adForm.classList.toggle('ad-form--disabled', status);
  switchStateElements(fieldsets, status);
};

const switchFiltersStatus = (status) => {
  const filters = document.querySelector('.map__filters');
  const selects = filters.querySelectorAll('select');
  const fieldsets = filters.querySelectorAll('fieldset');
  filters.classList.toggle('map__filters--disabled', status);
  switchStateElements(selects, status);
  switchStateElements(fieldsets, status);
};

const deactivateForm = () => switchFormStatus(true);
const activateForm = () => switchFormStatus(false);
const deactivateFilters = () => switchFiltersStatus(true);
const activateFilters = () => switchFiltersStatus(false);


const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
  errorClass: 'ad-form--invalid',
  succesClass: 'ad-form--valid',
  errorTextTag: 'span',
});

const validateTitle = (value) => {
  const validation = value.length >= HEADER_LENGTH.min && value.length <= HEADER_LENGTH.max;
  return validation;
};

pristine.addValidator(
  adForm.querySelector('#title'),
  validateTitle,
  'От 30 до 100 символов!'
);

const validatePrice = (value) => {
  const unit = variants.querySelector(':checked');
  return parseInt(value, 10) <= MAX_PRICE && parseInt(value, 10) >= MINIMAL_PRICE_LISTING[unit.value];
};

const getPriceErrorMessage = (value) => {
  const unit = variants.querySelector(':checked');
  if (parseInt(value, 10) > MAX_PRICE) {
    return `Не может стоить больше ${MAX_PRICE} рублей`;
  }
  if (MINIMAL_PRICE_LISTING[unit.value] > 0 && parseInt(value, 10) < MINIMAL_PRICE_LISTING[unit.value]) {
    return `Не может стоить меньше ${MINIMAL_PRICE_LISTING[unit.value]} рублей`;
  }
};

pristine.addValidator(
  actualProperty,
  validatePrice,
  getPriceErrorMessage,
);

const checkRoomsAndCapacity = () => {
  const validation = ALL_OPTIONS[rooms.value].includes(Number(capacity.value));
  return validation;
};

const getCapacityErrorMessage = () => {
  if (rooms.value === MAX_CAPACITY && capacity.value !== MIN_CAPACITY) {
    return 'Не предзазначенная для проживания площадь';
  }
  if (rooms.value !== MAX_CAPACITY && rooms.value < capacity.value) {
    return `В ${rooms.value} комнате/ах не может проживать ${capacity.value} человек/а`;
  }
};

pristine.addValidator(
  rooms,
  checkRoomsAndCapacity,
  getCapacityErrorMessage,
);

pristine.addValidator(
  capacity,
  checkRoomsAndCapacity,
  getCapacityErrorMessage,
);

pristine.validate(rooms);
pristine.validate(capacity);

rooms.addEventListener('change', () => {
  pristine.validate(rooms);
  pristine.validate(capacity);
});

capacity.addEventListener('change', () => {
  pristine.validate(rooms);
  pristine.validate(capacity);
});

const onUnitChange = (evt) => {
  actualProperty.placeholder = MINIMAL_PRICE_LISTING[evt.target];
  pristine.validate(actualProperty);
};

adForm
  .querySelectorAll('#type')
  .forEach((item) => item.addEventListener('change', onUnitChange));

const onTimeInChange = () => {
  actualTimeOut.value = actualTimeIn.value;
  pristine.validate(actualTimeIn);
};

const onTimeOutChange = () => {
  actualTimeIn.value = actualTimeOut.value;
  pristine.validate(actualTimeOut);
};

adForm
  .querySelectorAll('#timein')
  .forEach((item) => item.addEventListener('change', onTimeInChange));

adForm
  .querySelectorAll('#timeout')
  .forEach((item) => item.addEventListener('change', onTimeOutChange));

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const sliderElement = document.querySelector('.ad-form__slider');
let minPropertyPrice = MINIMAL_PRICE_LISTING[variants.value];

noUiSlider.create(sliderElement, {
  range: {
    min: MINIMAL_PRICE_LISTING[variants.value],
    max: MAX_PRICE,
  },
  start: minPropertyPrice,
  step: SLIDER_PACE,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
  }
});

actualProperty.value = sliderElement.noUiSlider.get();

actualProperty.addEventListener('change', () => {
  sliderElement.noUiSlider.set(actualProperty.value);
});

variants.addEventListener('change', () => {
  minPropertyPrice = MINIMAL_PRICE_LISTING[variants.value];
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: minPropertyPrice,
      max: MAX_PRICE,
    },
    start: actualProperty.value,
    step: SLIDER_PACE,
  });
});

sliderElement.noUiSlider.on('slide', () => {
  actualProperty.value = sliderElement.noUiSlider.get();
  pristine.validate(actualProperty);
});

const resetPrice = () => {
  sliderElement.noUiSlider.set(MINIMAL_PRICE_LISTING.flat);
  actualProperty.value = MINIMAL_PRICE_LISTING.flat;
};

const resetForm = () => {
  adForm.reset();
  resetPrice();
  resetMap(STARTER_POINT);
  resetFilter();
};

const onFormSubmit = (packages) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      const formData = new FormData(evt.target);
      deactivateForm();
      deactivateFilters();
      fetch(POSTING_ADDRESS, {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            sendSuccedMessage();
            resetForm();
            resetAvatar();
            resetImage();
            createMapMarkers(packages);
            activateForm();
            activateFilters();
          } else {
            sendErrorMessage();
            pristine.reset();
            createMapMarkers(packages);
            activateForm();
            activateFilters();
          }
        })
        .catch(() => {
          sendErrorMessage();
          pristine.reset();
          createMapMarkers(packages);
          activateForm();
          activateFilters();
        });
    }
  });
};

const resetAll = (packages) => {
  resetButton.addEventListener('click', debounce((evt) => {
    evt.preventDefault();
    resetForm();
    resetAvatar();
    resetImage();
    createMapMarkers(packages);
  }));
};

export {
  deactivateForm,
  activateForm,
  resetAll,
  onFormSubmit,
  activateFilters,
  deactivateFilters
};
