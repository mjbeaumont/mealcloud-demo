export const clone = ob => {
  return JSON.parse(JSON.stringify(ob));
};

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default {
  clone,
  getRandomInt
};
