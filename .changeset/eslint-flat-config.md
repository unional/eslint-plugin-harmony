---
'eslint-plugin-harmony': major
---

Support ESLint 9 and 10 through flat config, and stop bundling `@typescript-eslint/parser`.

## Added: `configs.flat`

Every config this package publishes now has a flat-config twin under `configs.flat`:

```js
// eslint.config.js
const harmony = require('eslint-plugin-harmony')
module.exports = [...harmony.configs.flat.recommended]
```

`es5`, `es5-strict`, `latest`, `recommended`, `ts-prettier`, `ts-recommended`,
`ts-recommended-cra`, `ts-recommended-type-check`, `ts-recommended-type-check-cra` and
`ts-recommended-requiring-type-checking` are all present. Each is a config *array*, so
spread it. The `ts-*` entries carry the `harmony` plugin object themselves and scope
themselves to `**/*.ts`, `**/*.tsx`, `**/*.mts`, `**/*.cts`.

This matters because ESLint 10 **removed** the eslintrc format outright — `@eslint/eslintrc`
is no longer even a dependency of the `eslint` package — so `"extends": "plugin:harmony/recommended"`
cannot be loaded there under any flag. ESLint 9 still reads eslintrc, but only with
`ESLINT_USE_FLAT_CONFIG=false` and with a deprecation warning on every run.

The eslintrc `configs.<name>` surface is unchanged and still works on ESLint 8 and 9.

## BREAKING: `@typescript-eslint/parser` is now a peer dependency

It used to be a runtime `dependency`, which meant the plugin shipped its own nested copy of
parser 6. eslintrc resolved `"parser": "@typescript-eslint/parser"` to *that* copy rather
than the consumer's, so the consumer's parser was silently shadowed — and on ESLint 10 the
nested parser 6 crashes with `scopeManager.addGlobals is not a function`.

If you use any `ts-*` config, install the parser yourself:

```sh
npm i -D @typescript-eslint/parser @typescript-eslint/eslint-plugin   # eslintrc
npm i -D typescript-eslint                                            # flat
```

## BREAKING: peer ranges narrowed

- `eslint`: `>= 8.4.0` → `>= 8.57.0`
- `@typescript-eslint/eslint-plugin`: `>= 6.0.0` → `>= 8.0.0`, and now optional
- new optional peers: `@typescript-eslint/parser >= 8.0.0`, `typescript-eslint >= 8.0.0`

## Other changes

- The custom `harmony/ts-member-delimiter-style` rule was ported from the dead
  `@typescript-eslint/experimental-utils@5` to `@typescript-eslint/utils@8`, and now uses
  `context.sourceCode` instead of `context.getSourceCode()`, which ESLint 10 removed. The
  rule's behaviour and options are unchanged.
- `@typescript-eslint/no-empty-object-type` is turned off in the `ts-*` configs. It is the
  typescript-eslint v8 successor to `no-empty-interface`, which these configs already
  turned off; without this, upgrading to typescript-eslint 8 started reporting interfaces
  these configs were meant to permit.
- `@rushstack/eslint-patch` is dropped. It was listed as a dependency but nothing in the
  package ever imported it.
