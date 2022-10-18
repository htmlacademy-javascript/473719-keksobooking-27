import {makeLocation} from './export-coordinates.js';
import {getRandomArrayElement} from './random-array.js';
import {randomInteger} from './random-array.js';
import {randomiseFeatures} from './random-cut-copy.js';

const titleSet = [
  'Красивая комната в центре города',
  'Удобная квартира в исторической части города',
  'Квартира со всеми удобствами',
  'Апартаменты. 5 минут до центра',
  'Лучшее место для жизни',
  'Лучший вид в городе',
];

const typeOfProperty = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const MAXROOMS = 7;
const MAXGUESTS = 6;
const MINPRICE = 10;
const MAXPRICE = 300;

const checkIn = [
  '12:00',
  '13:00',
  '14:00',
];

const checkOut = [
  '12:00',
  '13:00',
  '14:00',
];

const allFeatures = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const descriptionVariants = [
  'Светлое просторное помещение, подойдет для самых превиредливых покупателей',
  'Квартира недалеко от исторического центра города, рядом много ресторанов, есть музеи',
  'Лучший вариант для тех, кто ищет спокойное место в одном из самых живописных районов города',
  'Специально для студентов и коммандировочных, предлагаю вам одну из комнат в своей просторной кварирте. Вы можете пользоваться кухней и стиральной машинкой, приходить когда вам угодно.',
  'Хорошее местечко для тех, кто приезжает в наш город поработать. В квартире есть рабочее место. Есть и кофе-машина. Интернет отличный.',
];

const photosLinks = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const makeOffer = function() {
  const offer = {
    title: getRandomArrayElement(titleSet),
    adress: `${makeLocation().lat}, ${makeLocation().lng}`,
    price: randomInteger(MINPRICE, MAXPRICE),
    type: getRandomArrayElement(typeOfProperty),
    rooms: randomInteger(1, MAXROOMS),
    guests: randomInteger(1, MAXGUESTS),
    checkin: getRandomArrayElement(checkIn),
    checkout: getRandomArrayElement(checkOut),
    features: randomiseFeatures(allFeatures),
    description: getRandomArrayElement(descriptionVariants),
    photos: getRandomArrayElement(photosLinks),
  };
  return offer;
};

export {makeOffer};
