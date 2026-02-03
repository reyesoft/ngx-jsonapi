require('ts-node/register');
// core-js v3 path changed from es7/reflect to es/reflect
require('core-js/es/reflect');
// Zone.js 0.16+ no longer uses /dist/ folder
require('zone.js/node');
require('zone.js/plugins/long-stack-trace-zone');
require('zone.js/plugins/proxy');
require('zone.js/plugins/sync-test');
require('zone.js/plugins/async-test');
require('zone.js/plugins/fake-async-test');
const Jasmine = require('jasmine');
const moduleAlias = require('module-alias');

const runner = new Jasmine();

global.jasmine = runner.jasmine;

require('zone.js/plugins/jasmine-patch');

const { getTestBed } = require('@angular/core/testing');
const { ServerTestingModule, platformServerTesting } = require('@angular/platform-server/testing');

getTestBed().initTestEnvironment(ServerTestingModule, platformServerTesting());

moduleAlias.addAlias('ngx-jsonapi', __dirname + '/src');

runner.loadConfig({
    spec_dir: 'src',
    spec_files: ['**/*.spec.ts']
});

runner.execute();
