const baseConfig = require('./jest.base.config');

module.exports = {
    ...baseConfig,
    roots: ['<rootDir>/projects/ngx-jsonapi-lib/src'],
    coveragePathIgnorePatterns: ['/node_modules/', '/demo/*.*/'],
    testEnvironmentOptions: {
        url: 'http://localhost/'
    }
};
