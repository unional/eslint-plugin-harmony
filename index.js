module.exports = {
  extends: 'eslint:recommended',
  rules: {
    // Best Practices
    complexity: [1, 25],

    // Variables
    'no-use-before-define': [2, 'nofunc'],

    // Stylistic Issues
    'brace-style': [2, 'stroustrup', { 'allowSingleLine': true }]
  }
};
