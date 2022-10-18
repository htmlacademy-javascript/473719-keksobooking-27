import {randomInteger} from './random-array.js';

const randomiseFeatures = function (featuresList) {
  const featuresDouble = featuresList.slice(0);
  for (let i = 1; i < (featuresDouble.length - randomInteger(Math.ceil(featuresDouble.length / 2) - 1, featuresDouble.length - 1)); i++) {
    featuresDouble.splice(randomInteger(0, featuresDouble.length - 1), 1);
  }
  return featuresDouble;
};

export {randomiseFeatures};
