# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [7.0.1](https://github.com/unional/eslint-plugin-harmony/compare/v7.0.0...v7.0.1) (2022-05-12)


### Bug Fixes

* disable indent rule ([56bc361](https://github.com/unional/eslint-plugin-harmony/commit/56bc361d62f8ed32c8e96440248bb88bcb4abf3f))

## [7.0.0](https://github.com/unional/eslint-plugin-harmony/compare/v6.1.1...v7.0.0) (2022-05-12)


### ⚠ BREAKING CHANGES

* move @typescript-eslint/parser to peer deps

Marking this as breaking change because
consumers need to install `@typescript-eslint/parser` themselves.

### Bug Fixes

* reset [@typescript-eslint](https://github.com/typescript-eslint) peer to 5.0.0 ([c88ca9d](https://github.com/unional/eslint-plugin-harmony/commit/c88ca9d9f5565e6741f8d26de301ccc6bb5ac7e3))

### [6.1.1](https://github.com/unional/eslint-plugin-harmony/compare/v6.1.0...v6.1.1) (2022-05-12)


### Bug Fixes

* add @typescript/eslint-plugin ([#63](https://github.com/unional/eslint-plugin-harmony/issues/63)) ([77e9921](https://github.com/unional/eslint-plugin-harmony/commit/77e99213a255db0eac07ca6daac819b7750a1bbc))

## [6.1.0](https://github.com/unional/eslint-plugin-harmony/compare/v6.0.6...v6.1.0) (2022-04-24)


### Features

* disable no-unsafe-argument and member-access ([89c2e61](https://github.com/unional/eslint-plugin-harmony/commit/89c2e61ea6126fd8a7a362fa938e404deb981490))

### [6.0.6](https://github.com/unional/eslint-plugin-harmony/compare/v6.0.5...v6.0.6) (2022-04-24)

### [6.0.5](https://github.com/unional/eslint-plugin-harmony/compare/v6.0.4...v6.0.5) (2022-04-24)

### [6.0.2](https://github.com/unional/eslint-plugin-harmony/compare/v6.0.1...v6.0.2) (2022-04-02)


### Bug Fixes

* move eslint-plugin and eslint-config-prettier as peer dependencies ([37ac6f5](https://github.com/unional/eslint-plugin-harmony/commit/37ac6f57b649ad287c3d7103b1d8d96586c28d22))

### [6.0.1](https://github.com/unional/eslint-plugin-harmony/compare/v6.0.0...v6.0.1) (2022-04-02)


### Bug Fixes

* disable @typescript-eslint/no-empty-interface ([#44](https://github.com/unional/eslint-plugin-harmony/issues/44)) ([58ec617](https://github.com/unional/eslint-plugin-harmony/commit/58ec617a172844e8c6c2ee88b9c2590d6652580a))
* update dependencies ([#45](https://github.com/unional/eslint-plugin-harmony/issues/45)) ([3500d8b](https://github.com/unional/eslint-plugin-harmony/commit/3500d8bc4cd9d7b5ed60e419185f43e7da2e2562))

## [6.0.0](https://github.com/unional/eslint-plugin-harmony/compare/v5.1.0...v6.0.0) (2021-12-05)


### ⚠ BREAKING CHANGES

* updated @typescript-eslint

@typescript-eslint 4.x does not work with ESLint 8.
Upgrading to 5.x is a breaking change

### Bug Fixes

* remove category ([063e36a](https://github.com/unional/eslint-plugin-harmony/commit/063e36acf4edc478b01ed27a1ca700a1e58e0b6a))
* update to support ESLint 8 ([8156c1e](https://github.com/unional/eslint-plugin-harmony/commit/8156c1ebb7f462bbf82f78389bab5af6449b6efe))

### [5.0.1](https://github.com/unional/eslint-plugin-harmony/compare/v5.0.0...v5.0.1) (2020-10-01)


### Bug Fixes

* **ts-prettier:** change brace-style to 1tbs ([f540980](https://github.com/unional/eslint-plugin-harmony/commit/f540980655f589d016eeb8e7915255f8231e74f7))

## [5.0.0](https://github.com/unional/eslint-plugin-harmony/compare/v3.0.1...v5.0.0) (2020-10-01)


### ⚠ BREAKING CHANGES

* TypeScript 4.0 support

### Features

* add @typescript-eslint/explicit-module-boundary-types setting ([49b3dd5](https://github.com/unional/eslint-plugin-harmony/commit/49b3dd5b4de216a22af8b0e261aeb303d3c27dc9))


### Bug Fixes

* **ts-prettier:** adjust ts-member-delimiter-style ([b74c1e5](https://github.com/unional/eslint-plugin-harmony/commit/b74c1e5f17ff0668e8892448483d9d8af7ab7745))

## [4.0.0](https://github.com/unional/eslint-plugin-harmony/compare/v3.0.1...v4.0.0) (2020-09-05)


### ⚠ BREAKING CHANGES

* TypeScript 4.0 support

### Features

* add @typescript-eslint/explicit-module-boundary-types setting ([49b3dd5](https://github.com/unional/eslint-plugin-harmony/commit/49b3dd5b4de216a22af8b0e261aeb303d3c27dc9))

### [2.1.9](https://github.com/unional/eslint-plugin-harmony/compare/v2.1.8...v2.1.9) (2019-10-24)


### Bug Fixes

* add @ts-eslint/parser as deps ([0d172ac](https://github.com/unional/eslint-plugin-harmony/commit/0d172ace769fd25709332f07fac485b11fbe46b5))

### [2.1.8](https://github.com/unional/eslint-plugin-harmony/compare/v2.1.7...v2.1.8) (2019-10-23)


### Bug Fixes

* set @ts-eslint/eslint-plugin as deps ([e2505da](https://github.com/unional/eslint-plugin-harmony/commit/e2505da6108c22c413bf4bfde3086ecefb479e59))

### [2.1.6](https://github.com/unional/eslint-plugin-harmony/compare/v2.1.5...v2.1.6) (2019-08-21)


### Bug Fixes

* relax ts/no-unused-vars for catch ([9253d17](https://github.com/unional/eslint-plugin-harmony/commit/9253d17))

### [2.1.5](https://github.com/unional/eslint-plugin-harmony/compare/v2.1.3...v2.1.5) (2019-08-21)

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.
