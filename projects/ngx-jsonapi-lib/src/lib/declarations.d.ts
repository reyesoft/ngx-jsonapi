// Extra variables that live on Global that
// will be replaced by webpack DefinePlugin
/* eslint-disable no-var */
declare var ENV: string;
declare var APP_VERSION: string;
declare var IS_PRODUCTION: boolean;
declare var HMR: boolean;
declare var IS_DEV: boolean;
declare var TRAVIS: boolean;
declare var require: NodeRequire;
/* eslint-enable no-var */
