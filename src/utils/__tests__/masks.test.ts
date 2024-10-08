import { maskCPF } from "../masks";

describe("masks", () => {
  describe("CPF", () => {
    it("should format a valid CPF number", () => {
      const input = "12345678909";
      const expected = "123.456.789-09";

      const result = maskCPF(input);

      expect(result).toBe(expected);
    });

    it("should ignore non-numeric characters", () => {
      const input = "123.456.789-09";
      const expected = "123.456.789-09";

      const result = maskCPF(input);

      expect(result).toBe(expected);
    });

    it("should handle leading zeros", () => {
      const input = "00012345678";
      const expected = "000.123.456-78";

      const result = maskCPF(input);

      expect(result).toBe(expected);
    });

    it("should return an empty string for empty input", () => {
      const input = "";
      const expected = "";

      const result = maskCPF(input);

      expect(result).toBe(expected);
    });

    it("should return a correctly formatted CPF for incomplete input", () => {
      const input = "123456789";
      const expected = "123.456.789";

      const result = maskCPF(input);

      expect(result).toBe(expected);
    });

    it("should return a correctly formatted CPF for input with extra digits", () => {
      const input = "123456789091234";
      const expected = "123.456.789-09";

      const result = maskCPF(input);

      expect(result).toBe(expected);
    });

    it("should handle input with spaces", () => {
      const input = " 123 456 789 09 ";
      const expected = "123.456.789-09";

      const result = maskCPF(input);

      expect(result).toBe(expected);
    });

    it("should return correctly formatted CPF with 11 digits and special characters", () => {
      const input = "123-456-789.09";
      const expected = "123.456.789-09";

      const result = maskCPF(input);

      expect(result).toBe(expected);
    });
  });
});
