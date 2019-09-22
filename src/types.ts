export type Locale = "en" | "fr";
export type TextType = "plain";

export type DumDumConfig = {
  locale: Locale;
};
export type DumDumOptions = Partial<DumDumConfig>;

export interface DumDumContructor {
  new (config: DumDumConfig): DumDumInstance;
}
export interface DumDumInstance {
  text([minLength, maxLength]: [number, number], type?: TextType): string;
  text(maxLength: number, type?: TextType): string;
}

export interface DumDumStatic extends DumDumInstance {
  create(options?: DumDumOptions): DumDumInstance;
}

declare const DumDum: DumDumStatic;

export default DumDum;
