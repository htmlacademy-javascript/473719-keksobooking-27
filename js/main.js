import './form.js';
import './map.js';
import {
  resetMap,
  STARTER_POINT,
  createMapMarkers
} from './map.js';
import {
  changeFilter,
  QUANTITY_OF_RENDERED_BUBBLES
} from './filtring.js';
import {
  activateForm,
  deactivateForm,
  onFormSubmit,
  resetAll,
  deactivateFilters,
  activateFilters
} from './form.js';
import './preview.js';

const dataSource = 'https://27.javascript.pages.academy/keksobooking/data';

deactivateForm();
deactivateFilters();

fetch(dataSource)
  .then((response) => response.json())
  .then((packages) => {
    resetMap(STARTER_POINT);
    activateForm();
    createMapMarkers(packages.slice(0, QUANTITY_OF_RENDERED_BUBBLES));
    activateFilters();
    changeFilter(packages, createMapMarkers);
    onFormSubmit(packages.slice(0, QUANTITY_OF_RENDERED_BUBBLES));
    resetAll(packages.slice(0, QUANTITY_OF_RENDERED_BUBBLES));
  });
