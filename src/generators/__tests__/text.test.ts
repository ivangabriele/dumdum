import text from "../text";

describe("generators/text()", () => {
  test("should return the expected result with a <maxLength> in EN", async () => {
    expect(text("en", 100).length).toBeGreaterThanOrEqual(12);
    expect(text("fr", 100).length).toBeLessThanOrEqual(100);
  });

  test("should return the expected result with a <maxLength> in FR", async () => {
    expect(text("fr", 100).length).toBeGreaterThanOrEqual(12);
    expect(text("fr", 100).length).toBeLessThanOrEqual(100);
  });

  test("should return the expected result with a <[minLength, maxLength]> in EN", async () => {
    expect(text("en", [50, 150]).length).toBeGreaterThanOrEqual(50);
    expect(text("en", [50, 150]).length).toBeLessThanOrEqual(150);
  });

  test("should return the expected result with a <[minLength, maxLength]> in FR", async () => {
    expect(text("fr", [50, 150]).length).toBeGreaterThanOrEqual(50);
    expect(text("fr", [50, 150]).length).toBeLessThanOrEqual(150);
  });
});
