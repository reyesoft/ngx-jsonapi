module.exports = {
  testURL: 'http://localhost/',
  preset: 'jest-preset-angular',
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
      '^ngx-jsonapi/(?!db)(.*)': '<rootDir>/src/$1',
      '^lodash-es$': 'lodash'
  },
  transformIgnorePatterns: [
      'node_modules/(?!ngx-jsonapi)'

  ],
  modulePathIgnorePatterns: [
      'dist',
      'node_modules/ngx-jsonapi'
  ]
};
