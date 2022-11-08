import {
  getResult
} from './assemble.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const dataBase = getResult(10);

const offerTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const renderFeatures = function (cardElement, features) {
  const featuresList = cardElement.querySelector('.popup__features');
  const featuresItems = featuresList.querySelectorAll('.popup__feature');
  const modifiers = features.map((feature) => `popup__feature--${feature}`);
  featuresItems.forEach((featureItem) => {
    const modifier = featureItem.classList[1];
    if (!modifiers.includes(modifier)) {
      featureItem.remove();
    }
  });
};

const createCard = function (datas) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = datas.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = datas.offer.adress;
  cardElement.querySelector('.popup__text--price').textContent = `${datas.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = offerTypes[datas.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${datas.offer.rooms} команты для ${datas.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${datas.offer.checkin}, выезд до ${datas.offer.checkout}`;
  renderFeatures(cardElement, datas.offer.features);// проверка уже есть
  cardElement.querySelector('.popup__description').textContent = datas.offer.description; //надо проверку написать
  cardElement.querySelector('.popup__photo').src = `${datas.offer.photos}`; //проверку надо написать
  cardElement.querySelector('.popup__avatar').src = `${datas.author.avatar}`; //проверку надо написать
  return cardElement;
};

export {createCard};
export {dataBase};


