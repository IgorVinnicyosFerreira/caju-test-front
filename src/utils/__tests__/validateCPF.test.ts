import validateCPF from '../validateCPF';

describe('validate CPF', () => {
  it('should return true when entering a valid CPF', () => {
    const isValid = validateCPF('823.820.440-20');

    expect(isValid).toBeTruthy();
  });

  it('should return false when entering a unmasked valid CPF', () => {
    const isValid = validateCPF('37009319057');

    expect(isValid).toBeTruthy();
  });

  it('should return false when entering a invalid CPF', () => {
    const isValid = validateCPF('111.820.440-32');

    expect(isValid).toBeFalsy();
  });

  it('should return false when entering a empty string', () => {
    const isValid = validateCPF('');

    expect(isValid).toBeFalsy();
  })

  it('should return false when entering a whitespace string', () => {
    const isValid = validateCPF(' ');

    expect(isValid).toBeFalsy();
  });
});