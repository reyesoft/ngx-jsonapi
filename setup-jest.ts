declare var global: any;
declare const require: any;
try {
    require('zone.js');
} catch (e) {}
try {
    require('zone.js/testing');
} catch (e) {}
import 'jest-preset-angular';
import 'fake-indexeddb/auto';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
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
