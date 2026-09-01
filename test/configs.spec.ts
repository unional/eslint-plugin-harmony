import { existsSync, readdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import type { ESLint, Linter } from 'eslint'
import { describe, expect, test } from 'vitest'

/** vitest runs from the package root, which is also where the `.eslintrc` cascade starts. */
const rootDir = process.cwd()
const require = createRequire(path.join(rootDir, 'package.json'))

const { LegacyESLint } = require('eslint/use-at-your-own-risk') as {
  LegacyESLint: typeof import('eslint').ESLint
}

/**
 * The configs the package publishes. Read from the build output so the suite
 * exercises what consumers actually install, not the sources.
 */
const configs: string[] = Object.keys(require(path.join(rootDir, 'lib')).configs)

/**
 * One ESLint instance per config, pointed at the built config file.
 *
 * `LegacyESLint` is eslint 9's eslintrc engine. The default `ESLint` class is flat-config
 * only from eslint 9 on, and this suite deliberately exercises the *eslintrc* surface —
 * the one consumers on eslint 8 and 9 still use. `test/flat-configs.spec.ts` covers the
 * flat surface with the modern class.
 *
 * `overrideConfigFile` layers the config under test on top of the `.eslintrc`
 * cascade, so `spec/<config>/.eslintrc` still supplies things a shareable config
 * cannot (`env`, `parserOptions.project`). That is the same layering the previous
 * gulp harness relied on.
 */
function lintFilesWith(config: string, files: string[]) {
  const eslint = new LegacyESLint({
    cwd: rootDir,
    overrideConfigFile: require.resolve(path.join(rootDir, 'lib', config)),
    // The ambient assumptions the fixtures are written against. `test/flat-configs.spec.ts`
    // supplies the same ones through `languageOptions`, so the two suites are comparable.
    overrideConfig: { env: { node: true }, parserOptions: { ecmaVersion: 2018 } }
  } as never)
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

/** `<rule-id>.<count>.error.ts` / `<rule-id>.<count>.warn.js` */
function parseExpectation(file: string, kind: 'error' | 'warn') {
  const name = path.basename(file)
  const matches = new RegExp(`(.*)\\.(\\d+)\\.${kind}\\.(j|t)s$`).exec(name)
  if (!matches) {
    throw new Error(`Unable to process '${name}'. Missing number of ${kind}s expected?`)
  }
  return { ruleId: matches[1], count: Number(matches[2]) }
}

describe.each(configs)('%s', (config) => {
  const passFiles = fixtures(config, '.pass.')
  const errorFiles = fixtures(config, '.error.')
  const warnFiles = fixtures(config, '.warn.')

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

      const unexpected = [...new Set(ruleIds(messages).filter((id) => id !== ruleId))]
      expect(
        unexpected,
        `${path.basename(file)} triggered unexpected rule(s)`
      ).toEqual([])
    }
  })

  test.skipIf(warnFiles.length === 0)('violations are reported as warnings', async () => {
    const results = await lintFilesWith(config, warnFiles)
    for (const file of warnFiles) {
      const { ruleId, count } = parseExpectation(file, 'warn')
      const messages = messagesOf(results, file)
      const triggered = messages.filter((m) => m.ruleId?.endsWith(ruleId))
      expect(
        triggered.length,
        `${path.basename(file)} expected ${count} warning(s) of '${ruleId}', got ${
          triggered.length
        } (reported: ${ruleIds(messages).join(', ') || 'none'})`
      ).toBe(count)

      const unexpected = [...new Set(ruleIds(messages).filter((id) => !id.endsWith(ruleId)))]
      expect(
        unexpected,
        `${path.basename(file)} triggered unexpected rule(s)`
      ).toEqual([])
    }
  })
})
