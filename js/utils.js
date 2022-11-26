import { isEscKey } from './keyboard.js';

const MESSAGE_DISPOSAL_TIME = 5000;

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const okMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const okMessage = okMessageTemplate.cloneNode(true);
const errorsMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorsMessage = errorsMessageTemplate.cloneNode(true);
const bodyElement = document.querySelector('body');

const onOkMessageEscKeydown = (evt) => {
  if (isEscKey(evt)) {
    okMessage.remove();
    document.removeEventListener('keydown', onOkMessageEscKeydown);
  }
};

const onErrorMessageEscKeydown = (evt) => {
  if (isEscKey(evt)) {
    errorsMessage.remove();
    document.removeEventListener('keydown', onErrorMessageEscKeydown);
  }
};

const onOkMessageModalClick = () => {
  okMessage.remove();
  okMessage.removeEventListener('click', onOkMessageEscKeydown);
};

const onErrorMessageModalClick = () => {
  errorsMessage.remove();
  errorsMessage.removeEventListener('click', onErrorMessageEscKeydown);
};

const sendSuccedMessage = () => {
  bodyElement.appendChild(okMessage);
  setTimeout(() => {
    okMessage.remove();
    document.removeEventListener('keydown', onOkMessageEscKeydown);
  }, MESSAGE_DISPOSAL_TIME);
  okMessage.addEventListener('click', onOkMessageModalClick);
  document.addEventListener('keydown', onOkMessageEscKeydown);
};

const sendErrorMessage = () => {
  bodyElement.appendChild(errorsMessage);
  document.addEventListener('click', onErrorMessageModalClick);
  document.addEventListener('keydown', onErrorMessageEscKeydown);
};

export {
  debounce,
  sendErrorMessage,
  sendSuccedMessage
};
