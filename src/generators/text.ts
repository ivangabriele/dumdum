import data from "../data";
// tslint:disable-next-line: import-name
import E from "../errors";
import getRandomNumberBetween from "../helpers/getRandomNumberBetween";
import metaJson from "../meta.json";
import { Locale, TextType } from "../types";

const MAX_TEXT_LENGTH = metaJson.maxTextLength;
const MIN_TEXT_LENGTH = metaJson.minTextLength;

function text(locale: Locale, maxLength: number, type?: TextType): string;
function text(locale: Locale, [minLength, maxLength]: [number, number], type?: TextType): string;
function text(locale: Locale, length: number | [number, number], type: TextType = "plain"): any {
  const minLength = Array.isArray(length) ? length[0] : MIN_TEXT_LENGTH;
  const maxLength = Array.isArray(length) ? length[1] : length;

  if (minLength < 0) throw E.error.GNR_01_PRM_MIN_NOT_POS;
  if (maxLength < 0) throw E.error.GNR_01_PRM_MAX_NOT_POS;
  if (minLength !== Math.ceil(minLength)) throw E.error.GNR_01_PRM_MIN_NOT_INT;
  if (maxLength !== Math.ceil(maxLength)) throw E.error.GNR_01_PRM_MAX_NOT_INT;
  if (maxLength <= minLength) throw E.error.GNR_01_PRM_MAX_NOT_MRE;
  if (minLength < MIN_TEXT_LENGTH) throw E.error.GNR_01_PRM_MIN_TOO_LOW;
  if (minLength > MAX_TEXT_LENGTH) throw E.error.GNR_01_PRM_MIN_TOO_HIG;
  if (maxLength < MIN_TEXT_LENGTH) throw E.error.GNR_01_PRM_MAX_TOO_LOW;
  if (maxLength > MAX_TEXT_LENGTH) throw E.error.GNR_01_PRM_MAX_TOO_HIG;

  const index = getRandomNumberBetween(minLength, maxLength) - MIN_TEXT_LENGTH;

  return data[locale].text[type][index];
}

export default text;
