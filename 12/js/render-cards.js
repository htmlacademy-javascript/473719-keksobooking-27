const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

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
  if (features && features.length) {
    const modifiers = features.map((feature) => `popup__feature--${feature}`);
    featuresItems.forEach((featureItem) => {
      const modifier = featureItem.classList[1];
      if (!modifiers.includes(modifier)) {
        featureItem.remove();
      }
    });
  } else {
    featuresList.remove();
  }
};

const renderDescription = (cardElement, description) => {
  const descriptionElement = cardElement.querySelector('.popup__description');
  if (description && description.length) {
    descriptionElement.textContent = description;
  } else {
    descriptionElement.remove();
  }
};

const renderPhoto = (cardElement, photo) => {
  const photoElement = cardElement.querySelector('.popup__photo');
  if (photo && photo.length) {
    photoElement.src = `${photo}`;
  } else {
    photoElement.remove();
  }
};

const renderAvatar = (cardElement, avatar) => {
  const avatarElement = cardElement.querySelector('.popup__avatar');
  if (avatar && avatar.length) {
    avatarElement.src = `${avatar}`;
  } else {
    avatarElement.remove();
  }
};

const createCard = function (datas) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = datas.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = datas.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${datas.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = offerTypes[datas.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${datas.offer.rooms} команты для ${datas.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${datas.offer.checkin}, выезд до ${datas.offer.checkout}`;
  renderFeatures(cardElement, datas.offer.features);
  renderDescription(cardElement, datas.offer.description);
  renderPhoto(cardElement, datas.offer.photos);
  renderAvatar(cardElement, datas.author.avatar);
  return cardElement;
};

export {
  createCard
};
