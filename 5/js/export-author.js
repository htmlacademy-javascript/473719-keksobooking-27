import {randomInteger} from './random-array.js';
const AVATARS = 10;

const makeAuthor = function() {
  const author = {
    avatar: `img/avatars/user${randomInteger(1, AVATARS).toString().padStart(2, '0')}.png`
  };
  return author;
};

export {makeAuthor};
