module.exports = {
  preset: 'jest-preset-angular',
  setupTestFrameworkScriptFile: '<rootDir>/setup-jest.ts',

  transform: {
      '^.+\\.(ts|js|html)$': '<rootDir>/node_modules/jest-preset-angular/preprocessor.js'
  },
  moduleFileExtensions: [
      'ts',
      'js',
      'html',
      'json'
  ],
  mapCoverage: true,
  coveragePathIgnorePatterns: [
      '/node_modules/',
      '/src/*.*/'
  ],
  moduleNameMapper: {
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
