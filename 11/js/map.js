import './render-cards.js';
import {
  dataBase
} from './render-cards.js';

import {
  createCard
} from './render-cards.js';

const chosenAddress = document.querySelector('#address');
const starterPoint = {
  lat: 35.652832,
  lng: 139.839478,
};

const map = L.map('map-canvas')
  .on('load', () => {
    //карта инициализирована
  })
  .setView(starterPoint, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

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

const mainPinMarker = L.marker({
  lat: 35.652832,
  lng: 139.839478,
}, {
  draggable: true,
  icon: mainPinIcon,
}, );

dataBase.forEach((dataUnit) => {
  const marker = L.marker(dataUnit.location, {
    icon,
  });

  marker
    .addTo(map)
    .bindPopup(createCard(dataUnit));
});

chosenAddress.value = `LatLng(${starterPoint.lat}, ${starterPoint.lng})`;

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  chosenAddress.value = evt.target.getLatLng();
});
