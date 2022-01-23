# dumdum

[![License][img-license]][lnk-license]
[![NPM Package][img-npm]][lnk-npm]
[![Build Status][img-github]][lnk-github]
[![Code Coverage][img-codecov]][lnk-codecov]

Dummy data generator for local development, demos and testing purposes.

## Install

```bash
npm i -D dumdum
```

## Example

```js
import DumDum from "dumdum";

const dumdum = DumDum.create();

// Plain text with a maxLength of 50:
const plainText1 = dumdum.text(50);
console.log(plainText1);

// Plain text with a minLength of 100 and a maxLength of 200:
const plainText2 = dumdum.text([100, 200]);
console.log(plainText2);
```

## Roadmap

### Generators

- HTML generator _(`text()` generator)_
- Markdown generator _(`text()` generator)_
- Number generator

### Localization

- Chinese localization
- Japanese localization
- Portuguese localization
- Spanish localization
- Russian localization

### Misc

- Questions support _(`text()` generator)_
- Increase maximum length to `1,000`.

## API

### Options

> Used with `DumDum.create([config])`

```ts
{
  locale: "fr" | "en"; // Default to "en".
}
```

### Methods

#### `text(maxLength[, type])`

- `maxLength`: Integer between 13 and 620.
- `type`: String. Default to `"plain"`.

#### `text(interval[, type])`

- `interval`: `[minLength, maxLength]`
  - `minLength`: Integer between 12 and 619.
  - `maxLength`: Integer between 13 and 620.
- `type`: String. Default to `"plain"`.

## Contribute

### Get Started

```bash
yarn
```

### Test

- All Tests: `yarn test`
- Lint Tests: `yarn test:lint`
- Unit Tests: `yarn test:unit`
- Unit Tests (watch): `yarn test:watch`

### Generate Data

```bash
yarn data:generate [fr|en]...
```

---

[img-codecov]: https://img.shields.io/codecov/c/github/ivangabriele/dumdum/main?style=flat-square
[img-github]: https://img.shields.io/github/workflow/status/ivangabriele/dumdum/Check/main?style=flat-square
[img-license]: https://img.shields.io/github/license/ivangabriele/dumdum?style=flat-square
[img-npm]: https://img.shields.io/npm/v/dumdum?style=flat-square
[lnk-codecov]: https://codecov.io/gh/ivangabriele/dumdum/branch/main
[lnk-github]: https://github.com/ivangabriele/dumdum/actions?query=branch%3Amain++
[lnk-license]: https://github.com/ivangabriele/dumdum/blob/master/LICENSE
[lnk-npm]: https://www.npmjs.com/package/dumdum
