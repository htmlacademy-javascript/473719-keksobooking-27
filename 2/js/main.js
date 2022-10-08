function randomInteger(min, max) {
  // получить случайное число –решение взял отсюда: https://learn.javascript.ru/task/random-int-min-max
  if (min < 0) {
    let random = NaN;
    return random;
  }

  if (max < 0) {
    let random = NaN;
    return random;
  }

  if (min > max) {
    let random = NaN;
    return random;
  }

  let random = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(random);
}

console.log("Рандомное число - " + randomInteger(1, 100));


function randomCoordinatesInteger(min, max, roundingTo) {
  if (min < 0) {
    let randCoordinate = NaN;
    return randCoordinate;
  }

  if (max < 0) {
    let randCoordinate = NaN;
    return randCoordinate;
  }

  if (roundingTo < 0) {
    let randCoordinate = NaN;
    return randCoordinate;
  }

  if (min > max) {
    let randCoordinate = NaN;
    return randCoordinate;
  }

  // https://qna.habr.com/q/493201

  const lengthMin = min.toString().match(/\.(\d+)/) ?.[1].length;
  const lengthMax = max.toString().match(/\.(\d+)/) ?.[1].length;

  if (lengthMin != undefined)
    if (lengthMin > roundingTo) {
      let randCoordinate = NaN;
      return randCoordinate;
    }

  if (lengthMax != undefined)
    if (lengthMax > roundingTo) {
      let randCoordinate = NaN;
      return randCoordinate;
    }

  let multiplier = Math.pow(10, roundingTo);
  let randCoordinate = Math.round(min - 0.5 + Math.random() * (max - min + 1) * multiplier) / multiplier;
  return randCoordinate;
}

console.log("Рандомная координата - " + randomCoordinatesInteger(1.23, 12.77, 3));
