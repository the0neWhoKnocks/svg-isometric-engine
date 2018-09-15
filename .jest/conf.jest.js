const appConfig = require('../conf.app');

const conf = {
  automock: false,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!**/breakpoints.js',
    '!**/polyfills.js',
  ],
  coverageDirectory: `${ appConfig.paths.ROOT }/.coverage`,
  coverageReporters: [
    'html',
    'json',
    'lcov',
    'text-summary',
  ],
  coverageThreshold: {
    global: {
      branches: 15.23,
      functions: 24.35,
      lines: 29.65,
      statements: 25.32,
    },
  },
  moduleFileExtensions: [ 'js' ],
  moduleNameMapper: {},
  reporters: [
    'default',
    'jest-skipped-reporter',
  ],
  rootDir: appConfig.paths.ROOT,
  roots: ['src'],
  setupFiles: [
    `${ appConfig.paths.SRC }/polyfills.js`,
    `${ appConfig.paths.JEST }/shims.js`,
    `${ appConfig.paths.JEST }/bootstrap.js`,
  ],
  testEnvironment: 'node',
  testURL: 'http://localhost',
  timers: 'fake',
  transform: {
    '^.+\\.(js)$': `${ appConfig.paths.ROOT }/node_modules/babel-jest`,
    '^.+\\.css$': `${ appConfig.paths.JEST }/cssTransform.js`,
    '^(?!.*\\.(js|css|json)$)': `${ appConfig.paths.JEST }/fileTransform.js`,
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(jsx?)$',
  ],
};

// map Webpack alias' so files resolve
Object.keys(appConfig.webpack.aliases).forEach((alias) => {
  conf.moduleNameMapper[`^${ alias }(.*)$`] = `${ appConfig.webpack.aliases[alias] }/$1`;
});

module.exports = conf;
