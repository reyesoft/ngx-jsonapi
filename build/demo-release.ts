import * as path from 'path';
import * as fs from 'fs';
import { cmd } from './util';

/* eslint-disable @typescript-eslint/no-var-requires,no-var */
var ghpages: any = require('gh-pages');
var dir: string = path.resolve(path.join(__dirname, '../', 'demo-dist'));

// CNAME FILE
cmd('mkdir ', [`-p ${dir}`]);
fs.writeFile(`${dir}/CNAME`, 'ngx-jsonapi.reyesoft.com', function(err: any) {
    if (err) {
        return console.log(err);
    }
});

ghpages.publish(dir, {
    user: {
        name: 'Pablo Reyes',
        email: 'pablo@reyesoft.com'
    },
    message: '(deploy): CI',
    logger: function(message: string) {
        console.log('gh-pages: ', message);
    }
});
/* eslint-enable @typescript-eslint/no-var-requires,no-var */
