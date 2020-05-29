export const dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const getDate = ({ day, week, firstDay }) => {
  return day - firstDay + (week - 1) * 7;
};

export const daysInMonth = ({ year, month }) => {
  return 32 - new Date(year, month, 32).getDate();
};

export const firstDay = ({ year, month }) => {
  return new Date(year, month).getDay();
};

export const weeksInMonth = ({ daysInMonth, firstDay }) => {
  return Math.ceil((daysInMonth + firstDay) / 7);
};

export default {
  dayNamesShort,
  monthNames,
  getDate,
  daysInMonth,
  firstDay,
  weeksInMonth
};
