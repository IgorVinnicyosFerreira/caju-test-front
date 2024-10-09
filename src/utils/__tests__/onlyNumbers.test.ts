import onlyNumbers from '../onlyNumbers';

describe('only numbers', () => {
  it('should return only numbers from a string ', () => {
    const result = onlyNumbers('823.820.440-20');

    expect(result).toBe('82382044020');
  });

  it('must return the numeric string even if it has no characters', () => {
    const result = onlyNumbers('37009319057');

    expect(result).toBe('37009319057');
  });
});