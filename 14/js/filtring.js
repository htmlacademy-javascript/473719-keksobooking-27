import {
  debounce
} from './utils.js';

const QUANTITY_OF_RENDERED_BUBBLES = 10;
const priceVariants = {
  MIDDLE: 10000,
  HIGH: 50000,
};

const filterForm = document.querySelector('.map__filters');
const typeOfProperty = filterForm.querySelector('#housing-type');
const priceOfProperty = filterForm.querySelector('#housing-price');
const roomsQuantity = filterForm.querySelector('#housing-rooms');
const guestsCapacity = filterForm.querySelector('#housing-guests');
const featureOptions = filterForm.querySelectorAll('.map__checkbox');


const filterByType = (offer, type) =>
  type === 'any' || offer.offer.type === type;

const filterByPrice = (offer, price) => {
  switch (price) {
    case 'any':
      return true;
    case 'low':
      return offer.offer.price < priceVariants.MIDDLE;
    case 'middle':
      return (offer.offer.price < priceVariants.HIGH && offer.offer.price >= priceVariants.MIDDLE);
    case 'high':
      return offer.offer.price >= priceVariants.HIGH;
  }
};

const filterByRooms = (offer, rooms) =>
  rooms === 'any' || offer.offer.rooms === Number(rooms);

const filterByGuests = (offer, guests) =>
  guests === 'any' || offer.offer.guests === Number(guests);


const filterByFeatures = (offer, features) => {
  if (!features.length) {
    return true;
  }

  if (!offer.offer.features) {
    return false;
  }

  return features.every((feature) => offer.offer.features.includes(feature));
};

const formFilters = (offers, evt) => {
  let chosenType = typeOfProperty.value;
  let chosenPrice = priceOfProperty.value;
  let chosenRooms = roomsQuantity.value;
  let chosenGuests = guestsCapacity.value;

  switch (evt.target.name) {
    case 'housing-type':
      chosenType = evt.target.value;
      break;
    case 'housing-price':
      chosenPrice = evt.target.value;
      break;
    case 'housing-rooms':
      chosenRooms = evt.target.value;
      break;
    case 'housing-guests':
      chosenGuests = evt.target.value;
  }

  const chosenFeatures = [];
  const processedPackage = [];

  featureOptions.forEach((checkbox) => {
    if (checkbox.checked) {
      chosenFeatures.push(checkbox.value);
    }
  });

  for (const offer of offers) {
    if (processedPackage.length >= QUANTITY_OF_RENDERED_BUBBLES) {
      break;
    }
    if (filterByType(offer, chosenType) &&
      filterByPrice(offer, chosenPrice) &&
      filterByRooms(offer, chosenRooms) &&
      filterByGuests(offer, chosenGuests) &&
      filterByFeatures(offer, chosenFeatures)
    ) {
      processedPackage.push(offer);
    }
  }
  return processedPackage;
};

const onFilterChange = (offers, callback) => {
  filterForm.addEventListener('change', (evt) => {
    debounce(callback(formFilters(offers, evt)));
  });
};

export {
  onFilterChange, QUANTITY_OF_RENDERED_BUBBLES
};
