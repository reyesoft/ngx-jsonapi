const baseConfig = require('./jest.base.config');

module.exports = {
  ...baseConfig,
  roots: ['<rootDir>/src'],
  coveragePathIgnorePatterns: [
      '/node_modules/',
      '/demo/*.*/'
  ],

  globals: {
      'ts-jest': {
          tsConfig: 'src/tsconfig.spec.json'
      },
      stringifyContentPathRegex: true
  },
};
