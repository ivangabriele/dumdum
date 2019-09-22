import getRandomNumberBetween from "../getRandomNumberBetween";

import E from "../../errors";

describe("helpers/getRandomNumberBetween()", () => {
  test("should throw the expected error when <min> is negative", () => {
    expect(() => getRandomNumberBetween(-1, 0)).toThrow(E.dictionary.HPR_01_PRM_MIN_NOT_POS);
    expect(() => getRandomNumberBetween(-1.2, 0)).toThrow(E.dictionary.HPR_01_PRM_MIN_NOT_POS);
  });

  test("should throw the expected error when <max> is negative", () => {
    expect(() => getRandomNumberBetween(0, -1)).toThrow(E.dictionary.HPR_01_PRM_MAX_NOT_POS);
    expect(() => getRandomNumberBetween(0, -1.2)).toThrow(E.dictionary.HPR_01_PRM_MAX_NOT_POS);
  });

  test("should throw the expected error when <min> is a floating number", () => {
    expect(() => getRandomNumberBetween(0.1, 0)).toThrow(E.dictionary.HPR_01_PRM_MIN_NOT_INT);
    expect(() => getRandomNumberBetween(1.2, 0)).toThrow(E.dictionary.HPR_01_PRM_MIN_NOT_INT);
  });

  test("should throw the expected error when <max> is a floating number", () => {
    expect(() => getRandomNumberBetween(0, 0.1)).toThrow(E.dictionary.HPR_01_PRM_MAX_NOT_INT);
    expect(() => getRandomNumberBetween(0, 1.2)).toThrow(E.dictionary.HPR_01_PRM_MAX_NOT_INT);
  });

  test("should throw the expected error when <max> is lower than <min>", () => {
    expect(() => getRandomNumberBetween(1, 0)).toThrow(E.dictionary.HPR_01_PRM_MAX_NOT_MRE);
  });

  test("should throw the expected error when <max> is equal to <min>", () => {
    expect(() => getRandomNumberBetween(0, 0)).toThrow(E.dictionary.HPR_01_PRM_MAX_NOT_MRE);
  });

  test("should return the expected result", () => {
    expect(getRandomNumberBetween(0, 1)).toBeGreaterThanOrEqual(0);
    expect(getRandomNumberBetween(0, 1)).toBeLessThanOrEqual(1);
    expect(getRandomNumberBetween(2, 10)).toBeGreaterThanOrEqual(2);
    expect(getRandomNumberBetween(2, 10)).toBeLessThanOrEqual(10);
  });
});
