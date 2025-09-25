const baseConfig = require('./jest.base.config');

module.exports = {
  ...baseConfig,
  roots: ['<rootDir>/demo'],
  modulePaths: ['<rootDir>/dist'],
  moduleNameMapper: {
      '^ngx-jsonapi$': '<rootDir>/projects/ngx-jsonapi-lib/src/public_api.ts',
      '^ngx-jsonapi/(.*)$': '<rootDir>/projects/ngx-jsonapi-lib/src/$1',
      '\\.(html)$': '<rootDir>/demo/__mocks__/htmlMock.js',
  },
  coveragePathIgnorePatterns: [
      '/node_modules/',
      '/src/*.*/'
  ],
  transform: { 
      '^.+\\.(ts|mjs|js|html)$': [
          'jest-preset-angular',
          {
              tsconfig: 'demo/tsconfig.spec.json',
              stringifyContentPathRegex: '\\.(html|svg)$'
          }
      ]
  }
};
