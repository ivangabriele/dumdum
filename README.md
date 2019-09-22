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
  locale: "en" // or "fr"
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

## Contribute

### Get Started

```bash
yarn
```

### Test

```bash
yarn test:watch
```

---

[img-coveralls]: https://img.shields.io/coveralls/github/ivangabriele/dumdum/master?style=flat-square
[img-license]: https://img.shields.io/badge/License-Apache%202.0-blue?style=flat-square
[img-npm]: https://img.shields.io/npm/v/dumdum?style=flat-square
[img-travis]: https://img.shields.io/travis/com/ivangabriele/dumdum/master?style=flat-square
[link-coveralls]: https://coveralls.io/github/ivangabriele/dumdum
[link-license]: https://github.com/ivangabriele/dumdum/blob/master/LICENSE
[link-npm]: https://github.com/ivangabriele/dumdum/blob/master/LICENSE
[link-travis]: https://travis-ci.com/ivangabriele/dumdum
