export const validateWhiteSpace = (input) => {
  if (input.trim() === '') {
    throw new Error(`White spaces are not allowed`);
  } else return false;
};
