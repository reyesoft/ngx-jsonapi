import * as tasks from './tasks';
import { createBuilder } from './util';
import { Config, packages } from './config';

const deploy: (config: Config) => Promise<void> = createBuilder([['Deploy builds', tasks.publishToRepo]]);

deploy({
    scope: '@DEPLOYSCOPEonDEPLOY-BUILD.TS',
    packages,
}).catch(err => {
    console.error(err);
    process.exit(1);
});
