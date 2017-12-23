import * as path from 'path';
var ghpages = require('gh-pages');

var dir = path.resolve(path.join(__dirname, '../', 'demo-dist'));
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
