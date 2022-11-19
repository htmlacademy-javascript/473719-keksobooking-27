import './form.js';
import './map.js';
import {
  createMapMarkers
} from './map.js';

import {
  onFilterChange
} from './filtring.js';

fetch('https://27.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((packages) => {
    createMapMarkers(packages.slice(0, 10));
    onFilterChange(packages, createMapMarkers);
  });
