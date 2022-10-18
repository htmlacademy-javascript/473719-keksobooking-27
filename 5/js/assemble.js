import {makeOffer} from './export-offer.js';
import {makeAuthor} from './export-author.js';
import {makeLocation} from './export-coordinates.js';

const getResult = function (quantity) {
  const results = [];
  for (let i = 0; i <= quantity - 1; i++) {
    results[i] = {
      offer: makeOffer(),
      author: makeAuthor(),
      location: makeLocation(),
    };
  }
  return results;
};

export {getResult};
