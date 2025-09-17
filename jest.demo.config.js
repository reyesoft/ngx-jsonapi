const baseConfig = require('./jest.base.config');

module.exports = {
  ...baseConfig,
  roots: ['<rootDir>/demo'],
  modulePaths: ['<rootDir>/dist'],
  moduleNameMapper: {
      '^ngx-jsonapi$': '<rootDir>/projects/ngx-jsonapi-lib/src/public_api.ts',
      '^ngx-jsonapi/(.*)$': '<rootDir>/projects/ngx-jsonapi-lib/src/$1'
   },
  coveragePathIgnorePatterns: [
      '/node_modules/',
      '/src/*.*/'
  ],
    moduleNameMapper: {
            '\\.(html)$': '<rootDir>/demo/__mocks__/htmlMock.js',
    },

  globals: {
      'ts-jest': {
          tsConfigFile: 'demo/tsconfig.spec.json'
      },
      stringifyContentPathRegex: true
  },
};
