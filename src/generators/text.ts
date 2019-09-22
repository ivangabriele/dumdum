import data from "../data";
import getRandomNumberBetween from "../helpers/getRandomNumberBetween";
import { Locale, TextType } from "../types";

function text(locale: Locale, maxLength: number, type?: TextType): string;
function text(locale: Locale, [minLength, maxLength]: [number, number], type?: TextType): string;
function text(locale: Locale, length: number | [number, number], type: TextType = "plain"): any {
  const minLength = Array.isArray(length) ? length[0] : 12;
  const maxLength = Array.isArray(length) ? length[1] : length;
  const index = getRandomNumberBetween(minLength, maxLength);

  return data[locale].text[type][index];
}

export default text;
