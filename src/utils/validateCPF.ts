import onlyNumbers from "./onlyNumbers";

const calculateDigit = (number: string): number => {
  let sum = 0;
  let weight = number.length + 1;

  for (let i = 0; i < number.length; i++) {
    sum += parseInt(number[i]) * weight--;
  }

  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
};

const validateCPF = (cpf: string) => {
  const cpfUnmasked = onlyNumbers(cpf);

  if (cpfUnmasked.length !== 11 || /^(\d)\1{10}$/.test(cpfUnmasked)) {
    return false;
  }

  const firstDigit = calculateDigit(cpfUnmasked.slice(0, 9));
  const secondDigit = calculateDigit(cpfUnmasked.slice(0, 10));

  return (
    firstDigit === Number(cpfUnmasked[9]) &&
    secondDigit === Number(cpfUnmasked[10])
  );
};

export default validateCPF;
