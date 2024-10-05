const onlyNumbers = (input: string) => {
  return input.replace(/\D/g, '');
};

export default onlyNumbers;