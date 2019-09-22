import generators from "./generators";
import { DumDumContructor, DumDumInstance, DumDumConfig, TextType } from "./types";

const DumDum: DumDumContructor = class DumDum implements DumDumInstance {
  private readonly config: DumDumConfig;

  constructor(config: DumDumConfig) {
    this.config = config;
  }

  public text(maxLength: number, type?: TextType): string;
  public text([minLength, maxLength]: [number, number], type?: TextType): string;
  public text(length: number | [number, number], type?: TextType) {
    return generators.text(this.config.locale, length as any, type);
  }
};

export default DumDum;
