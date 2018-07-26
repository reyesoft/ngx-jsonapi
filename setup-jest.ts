import 'jest-preset-angular';
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
