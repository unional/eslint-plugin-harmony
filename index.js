module.exports = {
  extends: 'airbnb/base',
  rules: {
    // Best Practices
    complexity: [2, 25],

    // Variables
    'no-use-before-define: ['error', 'nofunc'],

    // Stylistic Issues
    'brace-style': ['error', 'stroustrup', { 'allowSingleLine': true }]
  }
};
