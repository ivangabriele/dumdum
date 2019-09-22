const download = require("download");
const fs = require("fs");
const ora = require("ora");
const R = require("ramda");
const rimraf = require("rimraf");

const MIN_STRING_LENGTH = 12;
const MAX_STRING_LENGTH = 1000;

const LOCALES = [
  {
    name: "en",
    uri: "https://www.gutenberg.org/files/2600/2600-0.txt",
    startValue: /^CHAPTER I/m,
    endValue: /^End of the Project/m,
    postNormalizer: source => source
  },
  {
    name: "fr",
    uri: "http://www.gutenberg.org/cache/epub/17949/pg17949.txt",
    startValue: /^CHAPITRE PREMIER/m,
    endValue: /^FIN DU PREMIER VOLUME/m,
    postNormalizer: R.pipe(
      R.split(/\n+/),
      R.map(value => {
        switch (true) {
          case value.startsWith("--«") && value.includes("»"):
            return value.substr(2);

          case value.startsWith("--") && value.endsWith("»"):
            return `«${value.substr(2)}`;

          case value.startsWith("--") && !value.endsWith("»"):
            return `«${value.substr(2)}»`;

          case value.startsWith("«") && !value.endsWith("»"):
            return `${value.substr(2)}»`;

          default:
            return value;
        }
      }),
      R.join("\n\n"),
      R.replace(/([^\s])(!|\?|;|:)/g, "$1 $2")
    )
  }
];

const spinner = ora();

function _extract(startValue, endValue, input) {
  const startIndex = input.search(startValue);
  const endIndex = input.search(endValue);
  const output = input.substring(startIndex, endIndex).trim();

  return output;
}

function _normalize(input) {
  const output = input
    .replace(/(\r\n|\r|\n)/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/^(.+)\n(?!\n)/gm, "$1 ")
    .trim();

  return output;
}

function _stringify(input) {
  const output = JSON.stringify(input, null, 2);

  return output;
}

function _normalizeGutenberg(input) {
  const output = input
    .replace(/^[A-Z0-9]\n{2}/gm, "")
    .replace(/^[A-Z0-9].*[A-Z0-9]\n{2}/gm, "")
    .replace(/^\s+\*.*\n{2}/gm, "")
    .replace(/\s*\.{3,}/g, "…")
    .replace(/\[.*\]/g, "");

  return output;
}

const extract = R.curry(_extract);
const normalize = R.curry(_normalize);
const stringify = R.curry(_stringify);
const normalizeGutenberg = R.curry(_normalizeGutenberg);

const diffByLength = (a, b) => a.length - b.length;

const generateSourceBodyFromGutenberg = R.pipe(
  extract,
  normalize,
  normalizeGutenberg
);

const generateParagraphsFromSourceBody = R.pipe(
  R.split(/\n+/),
  R.map(value => value.replace(/^(“|«)(.*)(”|»)$/, "$2")),
  R.filter(value => value.length >= MIN_STRING_LENGTH && value.length <= MAX_STRING_LENGTH),
  R.filter(value => /(\.|…|!)$/.test(value)),
  R.sort(diffByLength)
);

const generateSentencesFromSourceBody = R.pipe(
  R.replace(/\n+/g, " "),
  R.replace(/(\.|…|!|\?)(?!”|»)\s+/g, "$1@"),
  R.replace(/(\.|…|!|\?)\s*(”|»)/g, "$1$2@"),
  R.split(/@/),
  R.map(value => value.replace(/^(“|«)(.*)(”|»)$/, "$2")),
  R.filter(value => /(\.|…|!)$/.test(value)),
  R.filter(value => /^[A-ZÀÁÂÃÄÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖŒÙÚÛÜ]/.test(value))
);

const fillDataFromStrings = (input, strings) =>
  input.map((value, index) => {
    if (value.length !== 0) return value;

    const expectedLength = index + MIN_STRING_LENGTH;
    const found = strings.find(value => value.length === expectedLength);

    return found !== undefined ? found : value;
  });

(async () => {
  try {
    for (const locale of LOCALES) {
      spinner.start(`[${locale.name}] Downloading source from ${locale.uri}…`);
      const sourceBuffer = await download(locale.uri);
      spinner.succeed(`[${locale.name}] Source downloaded.`);

      spinner.start(`[${locale.name}] Extracting source body…`);
      const source = sourceBuffer.toString();
      const sourceBody = locale.postNormalizer(
        generateSourceBodyFromGutenberg(locale.startValue, locale.endValue, source)
      );
      fs.writeFileSync("test.txt", sourceBody);
      spinner.succeed(`[${locale.name}] Source body extracted.`);

      spinner.start(`[${locale.name}] Generating data…`);
      const textsFilePath = `./src/data/${locale.name}/texts.json`;
      rimraf.sync(textsFilePath);
      const paragraphs = generateParagraphsFromSourceBody(sourceBody);
      const emptyData = new Array(MAX_STRING_LENGTH - MIN_STRING_LENGTH + 1);
      emptyData.fill("");
      const incompleteData = fillDataFromStrings(emptyData, paragraphs);
      const sentences = generateSentencesFromSourceBody(sourceBody);
      fs.writeFileSync("./sentences.json", stringify(sentences));
      const data = fillDataFromStrings(incompleteData, sentences);
      fs.writeFileSync(textsFilePath, stringify(data));
      spinner.succeed(`[${locale.name}] Data generated.`);
    }

    spinner.stop();
  } catch (err) {
    spinner.fail();

    console.error(err);
  }
})();
