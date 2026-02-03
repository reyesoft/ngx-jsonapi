const baseConfig = require('./jest.base.config');

module.exports = {
    ...baseConfig,
    roots: ['<rootDir>/demo'],
    modulePaths: ['<rootDir>/dist'],
    moduleNameMapper: {
        ...baseConfig.moduleNameMapper,
        '^ngx-jsonapi$': '<rootDir>/projects/ngx-jsonapi-lib/src/public_api.ts',
        '\\.(html)$': '<rootDir>/demo/__mocks__/htmlMock.js'
    },
    coveragePathIgnorePatterns: ['/node_modules/', '/src/*.*/']
};
