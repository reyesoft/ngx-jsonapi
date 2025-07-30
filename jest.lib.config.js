const baseConfig = require('./jest.base.config');

module.exports = {
  ...baseConfig,
  roots: ['<rootDir>/projects/ngx-jsonapi-lib/src'],
  coveragePathIgnorePatterns: [
      '/node_modules/',
      '/demo/*.*/'
  ],
  testEnvironmentOptions: {
    url: 'http://localhost/'
  },
  setupFilesAfterEnv: [
    '<rootDir>/setup-jest.ts'
  ],
  globals: {
      'ts-jest': {
          tsConfig: 'projects/ngx-jsonapi-lib/tsconfig.spec.json'
      },
      stringifyContentPathRegex: true
  },
};
