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
      '^lodash-es$': 'lodash',
      '^ngx-jsonapi/(?!db)(.*)': '<rootDir>/src/$1'
  },
//   transformIgnorePatterns: [
//       'node_modules/(?!ngx-jsonapi)'

//   ],
  modulePathIgnorePatterns: [
      'dist',
      'node_modules/ngx-jsonapi'
  ],
  globals: {
    'ts-jest': {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
    },
},
coverageDirectory: '../../coverage/libs/ngx-jsonapi-material',
transformIgnorePatterns: ['node_modules/(?!.*.mjs$)'],
transform: { '^.+.(ts|mjs|js|html)$': 'jest-preset-angular' },
moduleNameMapper: {
    "^lodash-es$": "lodash"
},
snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
],
};
