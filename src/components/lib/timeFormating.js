const dateToString = (time) => {
  return new Date(time).toDateString();
};

const dateToNumber = (time) => {
  return new Date(time).getTime();
};

export { dateToNumber, dateToString };
