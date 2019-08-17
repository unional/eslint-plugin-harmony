module.exports = {
  'parser': '@typescript-eslint/parser',
  'plugins': [
    '@typescript-eslint',
  ],
  'parserOptions': {
    'ecmaVersion': 2019,
  },
  'rules': {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        'multiline': {
          'delimiter': 'comma',
          'requireLast': true,
        },
        'singleline': {
          'delimiter': 'comma',
          'requireLast': false,
        },
      },
    ],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    'rest-spread-spacing': ['error'],
  },
}
