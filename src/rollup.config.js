export default {
    entry: './dist/pt-ngx-jsonapi/@pt-ngx-jsonapi/pt-ngx-jsonapi.es5.js',
    dest: './dist/pt-ngx-jsonapi/bundles/pt-ngx-jsonapi.umd.js',
    format: 'umd',
    exports: 'named',
    moduleName: 'pt-ngx-jsonapi',
    globals: {
        '@angular/core': 'ng.core'
    }
}
