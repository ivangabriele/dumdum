import data from "..";
import metaJson from "../../meta.json";

const MAX_TEXT_LENGTH = metaJson.maxTextLength;
const MIN_TEXT_LENGTH = metaJson.minTextLength;

const LOCALES = ["en", "fr"];

describe("DATA", () => {
  LOCALES.forEach(locale => {
    describe(locale.toUpperCase(), () => {
      let texts: string[];

      beforeAll(() => {
        texts = (data as any)[locale].text.plain;
      });

      describe("texts", () => {
        test("should have the expected length", () => {
          expect(texts.length).toStrictEqual(MAX_TEXT_LENGTH - MIN_TEXT_LENGTH + 1);
        });

        test("should have the expected characters length", () => {
          texts.forEach((text, index) => {
            expect(text.length).toStrictEqual(index + MIN_TEXT_LENGTH);
          });
        });
      });
    });
  });
});
