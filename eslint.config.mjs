import globals from 'globals'
// The repo lints itself with the plugin it publishes — and now with the *flat* configs it
// publishes, so the new surface is exercised on real code every CI run.
import harmony from './lib/index.js'

export default [
  {
    ignores: ['lib/**', 'spec/**', 'ide-configs/**', 'coverage/**']
  },
  ...harmony.configs.flat['ts-recommended'],
  {
    // Type-aware linting only for the TypeScript sources; the `.js`/`.mjs` config files
    // at the root are not in any tsconfig and do not need it.
    files: ['**/*.ts', '**/*.mts', '**/*.cts'],
    languageOptions: {
      globals: globals.node,
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname }
    }
  },
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    languageOptions: { globals: globals.node }
  }
]
