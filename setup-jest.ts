declare var global: any;
declare const require: any;

const { setupZoneTestEnv } = require('jest-preset-angular/setup-env/zone');

setupZoneTestEnv();

import 'fake-indexeddb/auto';
global['CSS'] = null;
Object.defineProperty(document.body.style, 'transform', {
    value: (): Object => {
        return {
            enumerable: true,
            configurable: true
        };
    }
});
(() => {
    const originalWarn = console.warn.bind(console);
    const originalError = console.error.bind(console);
    let jestDone = false;
    global.__JEST_CUSTOM_TEARDOWN = () => {
        jestDone = true;
    };
    setTimeout(() => (jestDone = true), 1000 * 60 * 5);
    console.warn = (...args: any[]) => {
        if (!jestDone) {
            try {
                return originalWarn(...args);
            } catch (e) {}
        }
    };
    console.error = (...args: any[]) => {
        if (!jestDone) {
            try {
                return originalError(...args);
            } catch (e) {}
        }
    };
})();
