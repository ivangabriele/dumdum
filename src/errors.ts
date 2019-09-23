import rorre from "rorre";

import metaJson from "./meta.json";

const MAX_TEXT_LENGTH = metaJson.maxTextLength;
const MIN_TEXT_LENGTH = metaJson.minTextLength;

export default rorre.declare({
  // generators/text()
  GNR_01_PRM_MAX_NOT_INT: "<maxLength> must be an integer.",
  GNR_01_PRM_MAX_NOT_POS: "<maxLength> must be a positive integer.",
  GNR_01_PRM_MAX_NOT_MRE: "<maxLength> must be greater than <minLength>.",
  GNR_01_PRM_MAX_TOO_LOW: `<maxLength> must be greater than or equal to ${MIN_TEXT_LENGTH}.`,
  GNR_01_PRM_MAX_TOO_HIG: `<maxLength> must be lower than or equal to ${MAX_TEXT_LENGTH}.`,
  GNR_01_PRM_MIN_NOT_INT: "<minLength> must be an integer.",
  GNR_01_PRM_MIN_NOT_POS: "<minLength> must be a positive integer.",
  GNR_01_PRM_MIN_TOO_LOW: `<minLength> must be greater than or equal to ${MIN_TEXT_LENGTH}.`,
  GNR_01_PRM_MIN_TOO_HIG: `<minLength> must be lower than or equal to ${MAX_TEXT_LENGTH}.`,

  // helpers/getRandomNumberBetween()
  HPR_01_PRM_MAX_NOT_INT: "<max> must be an integer.",
  HPR_01_PRM_MAX_NOT_POS: "<max> must be a positive integer.",
  HPR_01_PRM_MAX_NOT_MRE: "<max> must be greater than <min>.",
  HPR_01_PRM_MIN_NOT_INT: "<min> must be an integer.",
  HPR_01_PRM_MIN_NOT_POS: "<min> must be a positive integer."
});
