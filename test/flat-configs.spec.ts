import { existsSync, readdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { ESLint, type Linter } from 'eslint'
import globals from 'globals'
import { describe, expect, test } from 'vitest'

/**
 * The flat-config surface, exercised the same way `configs.spec.ts` exercises the
 * eslintrc surface: build each published config, lint the `spec/<config>` fixtures with
 * it, and assert the rule ids and counts encoded in the fixture filenames.
 *
 * Both suites read the same fixtures, so a flat config that drifts from its eslintrc
 * twin fails here.
 */
const rootDir = process.cwd()
const require = createRequire(path.join(rootDir, 'package.json'))

const flat: Record<string, Linter.Config[]> = require(path.join(rootDir, 'lib')).configs.flat
const configs = Object.keys(flat)

/**
 * `overrideConfigFile: true` stops ESLint looking for the repo's own `eslint.config.mjs`,
 * so only the config under test applies.
 *
 * The trailing entry replaces what the repo's root `.eslintrc` cascade supplied to the
 * eslintrc suite — node globals, a modern `ecmaVersion` (the fixtures are written in
 * ES2018 even under `spec/es5`) and `parserOptions.project` for the type-aware configs.
 * Both suites therefore lint the same fixtures under the same ambient assumptions, and a
 * difference in the reported rules is a real difference between the two config surfaces.
 */
function lintFilesWith(config: string, files: string[]) {
  const eslint = new ESLint({
    cwd: rootDir,
    overrideConfigFile: true,
    overrideConfig: [
      ...(flat[config] as Linter.Config[]),
      {
        languageOptions: { ecmaVersion: 2018, sourceType: 'commonjs', globals: globals.node }
      },
      {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
          ecmaVersion: 2019,
          parserOptions: { project: './tsconfig.json', tsconfigRootDir: rootDir }
        }
      }
    ]
  })
  return eslint.lintFiles(files)
}

function fixtures(config: string, suffix: string) {
  const dir = path.join(rootDir, 'spec', config)
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((f) => f.includes(suffix))
    .sort()
    .map((f) => path.join(dir, f))
}

function messagesOf(results: ESLint.LintResult[], file: string) {
  const result = results.find((r) => r.filePath === file)
  if (!result) throw new Error(`ESLint returned no result for ${file}`)
  return result.messages
}

function ruleIds(messages: Linter.LintMessage[]) {
  return messages.map((m) => m.ruleId).filter((id): id is string => !!id)
}

function parseExpectation(file: string, kind: 'error' | 'warn') {
  const name = path.basename(file)
  const matches = new RegExp(`(.*)\\.(\\d+)\\.${kind}\\.(j|t)s$`).exec(name)
  if (!matches) {
    throw new Error(`Unable to process '${name}'. Missing number of ${kind}s expected?`)
  }
  return { ruleId: matches[1], count: Number(matches[2]) }
}

describe.each(configs)('flat/%s', (config) => {
  const passFiles = fixtures(config, '.pass.')
  const errorFiles = fixtures(config, '.error.')

  test.skipIf(passFiles.length === 0)('clean code reports no error', async () => {
    const results = await lintFilesWith(config, passFiles)
    const offences = results.flatMap((r) =>
      r.messages
        .filter((m) => m.severity === 2)
        .map((m) => `${path.basename(r.filePath)}: ${m.ruleId ?? 'syntax'} — ${m.message}`)
    )
    expect(offences).toEqual([])
  })

  test.skipIf(errorFiles.length === 0)('violations are reported as errors', async () => {
    const results = await lintFilesWith(config, errorFiles)
    for (const file of errorFiles) {
      const { ruleId, count } = parseExpectation(file, 'error')
      const messages = messagesOf(results, file)
      const triggered = messages.filter((m) => m.ruleId === ruleId)
      expect(
        triggered.length,
        `${path.basename(file)} expected ${count} violation(s) of '${ruleId}', got ${
          triggered.length
        } (reported: ${ruleIds(messages).join(', ') || 'none'})`
      ).toBe(count)
    }
  })
})

describe('the flat surface', () => {
  test('offers a config for every eslintrc config', () => {
    const eslintrc = Object.keys(require(path.join(rootDir, 'lib')).configs).filter(
      (name) => name !== 'flat'
    )
    expect(configs.sort()).toEqual(eslintrc.sort())
  })

  test('every entry is a flat config array with no eslintrc keys', () => {
    for (const name of configs) {
      const entries = flat[name] as Linter.Config[]
      expect(Array.isArray(entries), `${name} must be an array`).toBe(true)
      for (const entry of entries) {
        expect(
          Object.keys(entry as object).filter((k) =>
            ['extends', 'env', 'parserOptions', 'parser', 'overrides', 'globals'].includes(k)
          ),
          `${name} carries eslintrc-only keys`
        ).toEqual([])
      }
    }
  })

  test('the harmony plugin is embedded in the ts configs, so consumers need not name it', () => {
    const entries = flat['ts-recommended'] as Linter.Config[]
    const registered = entries.flatMap((e) =>
      Object.keys((e as { plugins?: Record<string, unknown> }).plugins ?? {})
    )
    expect(registered).toContain('harmony')
    expect(registered).toContain('@typescript-eslint')
  })
})
