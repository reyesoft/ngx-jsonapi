declare var global: any;

import 'jest-preset-angular/setup-jest';
import 'fake-indexeddb/auto';

global['CSS'] = null;

/**
 * ISSUE: https://github.com/angular/material2/issues/7101
 * Workaround for JSDOM missing transform property
 */
Object.defineProperty(document.body.style, 'transform', {
    value: (): Object => {
        return {
            enumerable: true,
            configurable: true
        };
    }
});
