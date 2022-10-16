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
const ROUNDINGTO = 5;
const MINLAT = 35.65;
const MAXLAT = 35.7;
const MINLNG = 139.7;
const MAXLNG = 139.8;
const AVATARS = 10;

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

function randomInteger(min, max) {
  // получить случайное число –решение взял отсюда: https://learn.javascript.ru/task/random-int-min-max
  if (min < 0 || max < 0 || min > max) {
    return NaN;
  }

  const random = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(random);
}


function randomCoordinatesInteger(min, max, roundingTo) {
  if (min < 0 || max < 0 || roundingTo < 0 || min > max) {
    return NaN;
  }

  const minRounded = min.toFixed(roundingTo);
  const maxRounded = max.toFixed(roundingTo);
  const randomCoordinate = (minRounded - 0.5 + Math.random() * (maxRounded - minRounded + 1)).toFixed(roundingTo);
  return randomCoordinate;
}


const randomiseFeatures = function (featuresList) {
  const featuresDouble = featuresList.slice(0);
  for (let i = 1; i < (featuresDouble.length - randomInteger(Math.ceil(featuresDouble.length / 2) - 1, featuresDouble.length - 1)); i++) {
    featuresDouble.splice(randomInteger(0, featuresDouble.length - 1), 1);
  }
  return featuresDouble;
};

const generateLink = function (index) {
  return `img/avatars/user${index.toString().padStart(2, '0')}.png`;
};

const makeLocation = function () {
  const location = {
    lat: randomCoordinatesInteger(MINLAT, MAXLAT, ROUNDINGTO),
    lng: randomCoordinatesInteger(MINLNG, MAXLNG, ROUNDINGTO)
  };
  return location;
};

const getRandomArrayElement = function (array) {
  return array[randomInteger(0, array.length - 1)];
};

const makeAuthor = function() {
  const author = {
    avatar: generateLink(randomInteger(1, AVATARS))
  };
  return author;
};

const makeOffer = function() {
  const offer = {
    title: titleSet[[randomInteger(0, titleSet.length - 1)]],
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

const getResult = function (quantity) {
  const results = [];
  for (let i = 0; i <= quantity - 1; i++) {
    results[i] = [
      makeOffer(),
      makeAuthor(),
      makeLocation(),
    ];
  }
  return results;
};

console.log (getResult(10));
