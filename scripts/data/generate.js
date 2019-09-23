const download = require("download");
const fs = require("fs");
const makeDir = require("make-dir");
const ora = require("ora");
const R = require("ramda");
const rimraf = require("rimraf");
const argv = require("yargs").argv;

const META = require("../../src/meta.json");
const LOCALES = require("./locales");

const MAX_STRING_LENGTH = META.maxTextLength;
const MIN_STRING_LENGTH = META.minTextLength;

const spinner = ora();

function _extract(startValue, endValue, input) {
  const startIndex = input.search(startValue);
  if (startIndex === -1) {
    console.error("Error: Can't find the start index.");
    process.exit(1);
  }

  const endIndex = input.search(endValue);
  if (endIndex === -1) {
    console.error("Error: Can't find the end index.");
    process.exit(1);
  }

  const output = input.substring(startIndex, endIndex).trim();

  return output;
}

function _normalize(input) {
  const output = input
    .replace(/(\r\n|\r|\n)/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/^(.+)\n(?!\n)/gm, "$1 ")
    .replace(/\s+/, " ")
    .trim();

  return output;
}

function _stringify(input) {
  const output = JSON.stringify(input, null, 2);

  return output;
}

function _normalizeGutenberg(input) {
  const output = input
    .replace(/^[A-Z0-9\s\.\-\*]+$/gm, "")
    .replace(/^[ \[\*].*/gm, "")
    .replace(/.*\*$/gm, "")
    .replace(/ *\.{3,}/g, "…")
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
    if (!fs.existsSync("./.data")) await makeDir("./.data");

    for (const locale of LOCALES) {
      if (!argv._.includes(locale.name)) continue;

      if (!fs.existsSync(`./.data/${locale.name}`)) await makeDir(`./.data/${locale.name}`);

      const sourceBodies = [];
      for (const { title, uri, startValue, endValue } of locale.resources) {
        spinner.start(`[${locale.name}] Downloading "${title}" from ${uri}…`);
        const sourceBuffer = await download(uri);
        spinner.succeed(`[${locale.name}] "${title}" downloaded.`);

        spinner.start(`[${locale.name}] Extracting source body…`);
        const source = sourceBuffer.toString();
        const sourceBodyRaw = generateSourceBodyFromGutenberg(startValue, endValue, source);
        const sourceBody = locale.postNormalizer(sourceBodyRaw);
        fs.writeFileSync(`./.data/${locale.name}/${title}.txt`, sourceBody);
        spinner.succeed(`[${locale.name}] Source body extracted.`);

        sourceBodies.push(sourceBody);
      }
      const sourceBody = sourceBodies.join("\n\n");

      spinner.start(`[${locale.name}] Generating data…`);
      const textsFilePath = `./src/data/${locale.name}/texts.json`;
      rimraf.sync(textsFilePath);
      const paragraphs = generateParagraphsFromSourceBody(sourceBody);
      fs.writeFileSync(`./.data/${locale.name}/paragraphs.json`, stringify(paragraphs));
      const emptyData = new Array(MAX_STRING_LENGTH - MIN_STRING_LENGTH + 1);
      emptyData.fill("");
      const incompleteData = fillDataFromStrings(emptyData, paragraphs);
      const sentences = generateSentencesFromSourceBody(sourceBody);
      fs.writeFileSync(`./.data/${locale.name}/sentences.json`, stringify(sentences));
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
