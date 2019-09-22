import { LOCALE } from "./contants";
// tslint:disable-next-line: import-name
import DumDumClass from "./DumDum";
import { DumDumConfig, DumDumInstance, DumDumOptions, DumDumStatic } from "./types";

const DEFAULT_CONFIG: DumDumConfig = {
  locale: LOCALE.EN
};

/**
 * Create an instance of DumDum.
 */
function createInstance(config: DumDumConfig): DumDumInstance {
  return new DumDumClass(config);
}

// Create the default instance to be exported:
const DumDum: DumDumStatic = createInstance(DEFAULT_CONFIG) as any;

// Expose DumDum class to allow class inheritance:
(DumDum as any).DumDum = DumDum;

// Factory for creating new instances:
DumDum.create = function create(options: DumDumOptions) {
  return createInstance({ ...DEFAULT_CONFIG, ...options });
};

export default DumDum;

// Allow use of default import syntax in TypeScript:
module.exports.default = DumDum;
