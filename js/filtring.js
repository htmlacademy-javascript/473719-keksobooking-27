import {
  debounce
} from './utils.js';

const QUANTITY_OF_RENDERED_BUBBLES = 10;
const PriceVariants = {
  MIDDLE: 10000,
  HIGH: 50000,
};

const TypesListing = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high'
};

const ANY_VALUE = 'any';

const FilterListing = {
  TYPE: 'housing-type',
  PRICE: 'housing-price',
  ROOMS: 'housing-rooms',
  GUESTS: 'housing-guests'
};

const filterForm = document.querySelector('.map__filters');
const typeOfProperty = filterForm.querySelector('#housing-type');
const priceOfProperty = filterForm.querySelector('#housing-price');
const roomsQuantity = filterForm.querySelector('#housing-rooms');
const guestsCapacity = filterForm.querySelector('#housing-guests');
const featureOptions = filterForm.querySelectorAll('.map__checkbox');

const resetFilter = () => filterForm.reset();

const filterByType = (offer, type) =>
  type === ANY_VALUE || offer.offer.type === type;

const filterByPrice = (offer, price) => {
  switch (price) {
    case ANY_VALUE:
      return true;
    case TypesListing.LOW:
      return offer.offer.price < PriceVariants.MIDDLE;
    case TypesListing.MIDDLE:
      return (offer.offer.price < PriceVariants.HIGH && offer.offer.price >= PriceVariants.MIDDLE);
    case TypesListing.HIGH:
      return offer.offer.price >= PriceVariants.HIGH;
  }
};

const filterByRooms = (offer, rooms) =>
  rooms === ANY_VALUE || offer.offer.rooms === Number(rooms);

const filterByGuests = (offer, guests) =>
  guests === ANY_VALUE || offer.offer.guests === Number(guests);


const filterByFeatures = (offer, features) => {
  if (!features.length) {
    return true;
  }

  if (!offer.offer.features) {
    return false;
  }

  return features.every((feature) => offer.offer.features.includes(feature));
};

const applyFilters = (offers, evt) => {
  let chosenType = typeOfProperty.value;
  let chosenPrice = priceOfProperty.value;
  let chosenRooms = roomsQuantity.value;
  let chosenGuests = guestsCapacity.value;

  switch (evt.target.name) {
    case FilterListing.TYPE:
      chosenType = evt.target.value;
      break;
    case FilterListing.PRICE:
      chosenPrice = evt.target.value;
      break;
    case FilterListing.ROOMS:
      chosenRooms = evt.target.value;
      break;
    case FilterListing.GUESTS:
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

const changeFilter = (offers, callback) => {
  filterForm.addEventListener('change', debounce((evt) => {
    callback(applyFilters(offers, evt));
  }));
};


export {
  changeFilter, QUANTITY_OF_RENDERED_BUBBLES, resetFilter
};
