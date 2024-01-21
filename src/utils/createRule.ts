import { ESLintUtils, type TSESLint } from '@typescript-eslint/experimental-utils'
import { pkg } from '../pkg'

export const createRule = ESLintUtils.RuleCreator(
  name => `https://github.com/unional/eslint-plugin-harmony/blob/v${pkg.version}/docs/rules/${name}.md`
)
