import { ESLintUtils } from '@typescript-eslint/utils'
import { pkg } from '../pkg'

export const createRule = ESLintUtils.RuleCreator(
  name => `https://github.com/cyberuni/eslint-plugin-harmony/blob/v${pkg.version}/docs/rules/${name}.md`
)
