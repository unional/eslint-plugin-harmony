/**
 * Flat-config (`eslint.config.js`) equivalents of the eslintrc configs in this package.
 *
 * ESLint 9 deprecated the eslintrc format and ESLint 10 removed it outright, so
 * `configs.<name>` cannot be loaded there at all. These are the same rule sets
 * expressed as flat config arrays.
 *
 * The rule bodies are read from the very same `style-parts/*.json` the eslintrc
 * configs use, so the two surfaces cannot drift apart.
 */
import js from '@eslint/js'
import type { TSESLint } from '@typescript-eslint/utils'
import { rules } from './rules'
import common from './style-parts/common.json'
import es2017Part from './style-parts/es2017.json'
import es5Part from './style-parts/es5.json'
import recommendedPart from './style-parts/recommended.json'
import tsCommon from './style-parts/ts-common.json'
import tsPrettierPart from './style-parts/ts-prettier.json'

type FlatConfig = TSESLint.FlatConfig.Config
type FlatConfigArray = TSESLint.FlatConfig.ConfigArray

/** The files the TypeScript configs apply to. eslintrc left this to the consumer's `overrides`. */
const TS_FILES = ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts']

/**
 * `plugins: ["harmony"]` in eslintrc resolved the plugin by name. Flat config takes the
 * plugin object directly, so the config carries its own rule implementations and the
 * consumer never has to name the plugin.
 */
const harmony = { rules } as unknown as TSESLint.FlatConfig.Plugin

/**
 * `typescript-eslint` is an optional peer: only the `ts-*` configs need it, and a
 * JavaScript-only consumer should not have to install it. Required lazily so that
 * `require('eslint-plugin-harmony')` does not throw for them.
 */
function tseslint(): typeof import('typescript-eslint') {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('typescript-eslint')
  }
  catch {
    throw new Error(
      "eslint-plugin-harmony's flat `ts-*` configs need `typescript-eslint` (v8 or later). " +
        'Install it as a devDependency: `npm i -D typescript-eslint`.'
    )
  }
}

const es5Style: FlatConfig = {
  name: 'harmony/style/es5',
  languageOptions: { ecmaVersion: 5, sourceType: 'script' },
  rules: { ...common.rules, ...es5Part.rules } as unknown as FlatConfig['rules']
}

const es2017Style: FlatConfig = {
  name: 'harmony/style/es2017',
  languageOptions: { ecmaVersion: 2018 },
  rules: { ...common.rules, ...es2017Part.rules } as unknown as FlatConfig['rules']
}

const es5: FlatConfigArray = [js.configs.recommended as FlatConfig, es5Style]

const es5Strict: FlatConfigArray = [
  ...es5,
  { name: 'harmony/es5-strict', rules: { 'comma-dangle': ['error', 'never'], semi: ['error'] } }
]

const latest: FlatConfigArray = [js.configs.recommended as FlatConfig, es2017Style]

const recommended: FlatConfigArray = [
  ...latest,
  { name: 'harmony/recommended', rules: recommendedPart.rules as unknown as FlatConfig['rules'] }
]

/** The shared tail of every `ts-*` config: the harmony plugin plus the TypeScript rule overrides. */
function tsStyle(name: string, extra?: FlatConfig['rules']): FlatConfig {
  return {
    name,
    files: TS_FILES,
    plugins: { harmony },
    rules: { ...tsCommon.rules, ...extra } as unknown as FlatConfig['rules']
  }
}

/** The `-cra` variants differed from their siblings only in which plugin names eslintrc
 * had to resolve, which flat config makes irrelevant. They are kept as aliases so that
 * `configs.flat['ts-recommended-cra']` still resolves for consumers migrating across. */
function tsRecommended(): FlatConfigArray {
  return [
    ...recommended,
    ...(tseslint().configs.recommended as FlatConfigArray),
    tsStyle('harmony/ts-recommended')
  ]
}

function tsRecommendedTypeCheck(): FlatConfigArray {
  return [
    ...recommended,
    ...(tseslint().configs.recommendedTypeChecked as FlatConfigArray),
    tsStyle('harmony/ts-recommended-type-check', {
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off'
    })
  ]
}

function tsPrettier(): FlatConfigArray {
  return [
    ...latest,
    ...(tseslint().configs.recommended as FlatConfigArray),
    tsStyle('harmony/ts-prettier', tsPrettierPart.rules as unknown as FlatConfig['rules'])
  ]
}

/**
 * Lazily evaluated so that requiring this package never requires `typescript-eslint`
 * unless a `ts-*` config is actually read.
 */
export const flat = {
  es5,
  'es5-strict': es5Strict,
  latest,
  recommended,
  get 'ts-prettier'() {
    return tsPrettier()
  },
  get 'ts-recommended'() {
    return tsRecommended()
  },
  get 'ts-recommended-cra'() {
    return tsRecommended()
  },
  get 'ts-recommended-type-check'() {
    return tsRecommendedTypeCheck()
  },
  get 'ts-recommended-type-check-cra'() {
    return tsRecommendedTypeCheck()
  },
  get 'ts-recommended-requiring-type-checking'() {
    return tsRecommendedTypeCheck()
  }
}
