import './render-cards.js';

import {
  createCard
} from './render-cards.js';

const ROUNDING_NUMBER = 5;

const STARTER_POINT = {
  lat: 35.65283,
  lng: 139.83947,
};

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const chosenAddress = document.querySelector('#address');
const mainPinMarker = L.marker(STARTER_POINT, {
  draggable: true,
  icon: mainPinIcon,
}, );

const initializeMap = (coordinates) => {
  const mapInitialized = L.map('map-canvas')
    .on('load', () => {})
    .setView(coordinates, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(mapInitialized);

  mainPinMarker.addTo(mapInitialized);
  mainPinMarker.on('moveend', (evt) => {
    chosenAddress.value = `${evt.target.getLatLng().lat.toFixed(ROUNDING_NUMBER)}, ${evt.target.getLatLng().lng.toFixed(ROUNDING_NUMBER)}`;
  });
  return (mapInitialized);
};

const map = initializeMap(STARTER_POINT);

const layerForMarkers = L.layerGroup().addTo(map);

const resetMap = (coordinates) => {
  map.setView(coordinates, 10);
  chosenAddress.value = `${coordinates.lat}, ${coordinates.lng}`;
  mainPinMarker.setLatLng(coordinates);
};

const createMapMarkers = (dataBase) => {
  layerForMarkers.clearLayers();
  dataBase.forEach((dataUnit) => {
    const marker = L.marker(dataUnit.location, {
      icon,
    });

    marker
      .addTo(layerForMarkers)
      .bindPopup(createCard(dataUnit));
  });
};

export {
  createMapMarkers,
  resetMap,
  initializeMap,
  STARTER_POINT
};
