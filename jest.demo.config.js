const baseConfig = require('./jest.base.config');

module.exports = {
  ...baseConfig,
  roots: ['<rootDir>/demo'],
  modulePaths: ['<rootDir>/dist'],
  moduleNameMapper: {
      'ngx-jsonapi': '<rootDir>/dist'
  },

  globals: {
      'ts-jest': {
          tsConfigFile: 'demo/tsconfig.spec.json'
      },
      __TRANSFORM_HTML__: true
  },
};
