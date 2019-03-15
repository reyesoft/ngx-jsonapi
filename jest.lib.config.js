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
          tsConfigFile: 'src/tsconfig.spec.json'
      },
      __TRANSFORM_HTML__: true
  },
};
