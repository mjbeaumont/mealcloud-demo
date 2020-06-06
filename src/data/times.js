import * as dayjs from "dayjs";

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

export const createFullTimeOptions = (startTime = null) => {
  const options = [];
  startTime = startTime || 10;
  let time = dayjs(new Date(2020, 6, 1, startTime, 0, 0, 0));
  const endTime = dayjs(new Date(2020, 6, 1, 20, 0, 0, 0));

  if (startTime <= 19) {
    do {
      options.push({ name: time.format("h:mm A"), code: time.format("h:mm") });
      time = time.add(15, "minutes");
    } while (!time.isSame(endTime));
  } else {
    return [];
  }

  return options;
};

export const createPartialTimeOptions = () => {
  let options = createFullTimeOptions();

  for (let i = 0; i < 15; i++) {
    options.splice(getRandomInt(0, options.length), 1);
  }

  return options;
};

export default {
  createFullTimeOptions,
  createPartialTimeOptions
};
