import './form.js';
import './map.js';
import {
  createMapMarkers
} from './map.js';
import {
  onFilterChange,
  QUANTITY_OF_RENDERED_BUBBLES
} from './filtring.js';
import {
  activateForm,
  deactivateForm,
  onFormSubmit,
  onResetButton
} from './form.js';
import './preview.js';

deactivateForm();

fetch('https://27.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((packages) => {
    activateForm();
    createMapMarkers(packages.slice(0, QUANTITY_OF_RENDERED_BUBBLES));
    onFilterChange(packages, createMapMarkers);
    onFormSubmit(packages.slice(0, QUANTITY_OF_RENDERED_BUBBLES));
    onResetButton(packages.slice(0, QUANTITY_OF_RENDERED_BUBBLES));
  });
