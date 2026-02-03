module.exports = {
    preset: 'jest-preset-angular',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    transform: {
        '^.+\\.(ts|mjs|js|html)$': [
            'jest-preset-angular',
            {
                tsconfig: '<rootDir>/projects/ngx-jsonapi-lib/tsconfig.spec.json',
                stringifyContentPathRegex: '\\.(html|svg)$'
            }
        ]
    },
    moduleFileExtensions: ['ts', 'js', 'mjs', 'html', 'json'],
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$|@angular|rxjs|zone\\.js|lodash-es|dexie)'],
    modulePathIgnorePatterns: ['dist'],
    moduleNameMapper: {
        '^lodash-es$': 'lodash',
        '^ngx-jsonapi/(?!db)(.*)': '<rootDir>/projects/ngx-jsonapi-lib/src/$1'
    },
    snapshotSerializers: [
        'jest-preset-angular/build/serializers/no-ng-attributes',
        'jest-preset-angular/build/serializers/ng-snapshot',
        'jest-preset-angular/build/serializers/html-comment'
    ]
};
