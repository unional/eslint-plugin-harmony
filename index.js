module.exports = {
  extends: 'eslint:recommended',
  rules: {
    // Best Practices
    complexity: [2, 25],

    // Variables
    'no-use-before-define': [1, 'nofunc'],

    // Stylistic Issues
    'brace-style': [2, 'stroustrup', { 'allowSingleLine': true }]
  }
};
