# dumdum

[![License][img-license]][link-license]
[![NPM Version][img-npm]][link-npm]
[![Build Status][img-travis]][link-travis]
[![Code Coverage][img-coveralls]][link-coveralls]

Dummy data generator for local development, demos and testing purposes.

## Install

```bash
npm i -D dumdum
```

## Example

```js
import DumDum from "dumdum";

const dumdum = DumDum.create({
  locale: "en"
});

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

### Options

- Questions support _(`text()` generator)_

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

- `maxLength`: Integer between 13 and 1000.
- `type`: String. Default to `"plain"`.

#### `text(interval[, type])`

- `interval`: `[minLength, maxLength]`
  - `minLength`: Integer between 12 and 999.
  - `maxLength`: Integer between 13 and 1000.
- `type`: String. Default to `"plain"`.

## Contribute

### Get Started

```bash
yarn
```

### Test

- Lint Tests: `yarn test:lint`
- Unit Tests: `yarn test:unit`
- Unit Tests (watch): `yarn test:watch`

### Generate Data

```bash
yarn data:generate [fr|en]...
```

---

[img-coveralls]: https://img.shields.io/coveralls/github/ivangabriele/dumdum/master?style=flat-square
[img-license]: https://img.shields.io/badge/License-MIT-blue?style=flat-square
[img-npm]: https://img.shields.io/npm/v/dumdum?style=flat-square
[img-travis]: https://img.shields.io/travis/com/ivangabriele/dumdum/master?style=flat-square
[link-coveralls]: https://coveralls.io/github/ivangabriele/dumdum
[link-license]: https://github.com/ivangabriele/dumdum/blob/master/LICENSE
[link-npm]: https://www.npmjs.com/package/dumdum
[link-travis]: https://travis-ci.com/ivangabriele/dumdum
