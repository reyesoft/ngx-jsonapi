module.exports = {
  testURL: 'http://localhost/',
  preset: 'jest-preset-angular',
  globals: {
    "ts-jest": {
        diagnostics: false,
    }
  },
  setupFilesAfterEnv: [
      '<rootDir>/setup-jest.ts'
  ],
  setupFiles: [
      '<rootDir>/src/tests/globals-test.ts'
    ],
  transform: {
      '^.+\\.(ts|js|html)$': 'ts-jest'
  },
  moduleFileExtensions: [
      'ts',
      'js',
      'html',
      'json'
  ],
  moduleNameMapper: {
      '^lodash-es$': 'lodash',
      '^ngx-jsonapi/(?!db)(.*)': '<rootDir>/src/$1'
  },
  transformIgnorePatterns: [
      'node_modules/(?!ngx-jsonapi)'

  ],
  modulePathIgnorePatterns: [
      'dist',
      'node_modules/ngx-jsonapi'
  ]
};
