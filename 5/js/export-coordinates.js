const ROUNDINGTO = 5;
const MINLAT = 35.65;
const MAXLAT = 35.7;
const MINLNG = 139.7;
const MAXLNG = 139.8;

const randomCoordinatesInteger = function (min, max, roundingTo) {
  if (min < 0 || max < 0 || roundingTo < 0 || min > max) {
    return NaN;
  }
  const minRounded = min.toFixed(roundingTo);
  const maxRounded = max.toFixed(roundingTo);
  const randomCoordinate = (minRounded - 0.5 + Math.random() * (maxRounded - minRounded + 1)).toFixed(roundingTo);
  return randomCoordinate;
};

const makeLocation = function () {
  const location = {
    lat: randomCoordinatesInteger(MINLAT, MAXLAT, ROUNDINGTO),
    lng: randomCoordinatesInteger(MINLNG, MAXLNG, ROUNDINGTO)
  };
  return location;
};

export {makeLocation};
