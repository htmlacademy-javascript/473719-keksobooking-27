function randomInteger(min, max) {
  if (min < 0 || max < 0 || min > max) {
    return NaN;
  }
  const random = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(random);
}

const getRandomArrayElement = function (array) {
  return array[randomInteger(0, array.length - 1)];
};

export {getRandomArrayElement};
export {randomInteger};
