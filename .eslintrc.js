module.exports = {
  extends: '@noxx',
  globals: {
    ON_CLIENT: false,
    ON_SERVER: false,
  },
  parser: 'babel-eslint', // needed to get dynamic imports linting correctly
  rules: {
    'require-jsdoc': 0,
    'object-property-newline': 0,
  }
};
