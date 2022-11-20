import './render-cards.js';

import {
  createCard
} from './render-cards.js';

const starterPoint = {
  lat: 35.652832,
  lng: 139.839478,
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
const mainPinMarker = L.marker({
  lat: 35.652832,
  lng: 139.839478,
}, {
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
    chosenAddress.value = evt.target.getLatLng();
  });
  return (mapInitialized);
};

const map = initializeMap(starterPoint);

const layerForMarkers = L.layerGroup().addTo(map);

const resetMap = (coordinates) => {
  chosenAddress.value = `LatLng(${coordinates.lat}, ${coordinates.lng})`;
  mainPinMarker.setLatLng(coordinates);
  layerForMarkers.clearLayers();
};

const createMapMarkers = (dataBase) => {
  resetMap(starterPoint);
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
  starterPoint
};
