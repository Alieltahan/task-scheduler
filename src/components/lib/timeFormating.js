const dateToString = (time) => {
  return new Date(time).toLocaleString('default', {
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  });
};

const dateToNumber = (time) => {
  return new Date(time).getTime();
};

export { dateToNumber, dateToString };
