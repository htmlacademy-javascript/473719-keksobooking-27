import './form.js';
import './map.js';
import {
  createMapMarkers
} from './map.js';

import {
  filterOn
} from './filtring.js';

const starterPoint = {
  lat: 35.652832,
  lng: 139.839478,
};


fetch('https://27.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((packages) => {
    createMapMarkers(filterOn(packages), starterPoint);
  });

export {
  starterPoint
};
