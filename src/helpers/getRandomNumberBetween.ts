// tslint:disable-next-line: import-name
import E from "../errors";

export default function getRandomNumberBetween(min: number, max: number): number {
  if (min < 0) throw E.error.HPR_01_PRM_MIN_NOT_POS;
  if (max < 0) throw E.error.HPR_01_PRM_MAX_NOT_POS;
  if (min !== Math.ceil(min)) throw E.error.HPR_01_PRM_MIN_NOT_INT;
  if (max !== Math.ceil(max)) throw E.error.HPR_01_PRM_MAX_NOT_INT;
  if (max <= min) throw E.error.HPR_01_PRM_MAX_NOT_MRE;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
