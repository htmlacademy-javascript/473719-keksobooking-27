function randomInteger(min, max) {
  // получить случайное число –решение взял отсюда: https://learn.javascript.ru/task/random-int-min-max
  if (min < 0 || max < 0 || min > max) {
    return NaN;
  }

  let random = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(random);
}

console.log("Рандомное число - " + randomInteger(1, 90));


function randomCoordinatesInteger(min, max, roundingTo) {
  if (min < 0 || max < 0 || roundingTo < 0 || min > max) {
    return NaN;
  }

  const minRounded = min.toFixed(roundingTo);
  const maxRounded = max.toFixed(roundingTo);

  let multiplier = Math.pow(10, roundingTo);
  let randomCoordinate = Math.round(minRounded - 0.5 + Math.random() * (maxRounded - minRounded + 1) * multiplier) / multiplier;
  return randomCoordinate;
}

console.log("Рандомная координата - " + randomCoordinatesInteger(1.23222, 12.77, 2));
