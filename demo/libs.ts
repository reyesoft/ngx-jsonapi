import 'core-js';
import 'zone.js/dist/zone';

// angular
import { disableDebugTools } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import '@angular/platform-browser-dynamic';
import '@angular/common';
import 'web-animations-js';

let A_decorateModuleRef = <T>(value: T): T => { return value; };

if (IS_PRODUCTION) {
    enableProdMode();
    A_decorateModuleRef = (modRef: any): any => {
        disableDebugTools();

        return modRef;
    };
}

if (IS_DEV) {
    Error.stackTraceLimit = Infinity;
    require('zone.js/dist/long-stack-trace-zone');
}
