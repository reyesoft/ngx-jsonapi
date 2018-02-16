export default {
    entry: './dist/vp-ngx-jsonapi/@vp-ngx-jsonapi/vp-ngx-jsonapi.es5.js',
    dest: './dist/vp-ngx-jsonapi/bundles/vp-ngx-jsonapi.umd.js',
    format: 'umd',
    exports: 'named',
    moduleName: 'vp-ngx-jsonapi',
    globals: {
        '@angular/core': 'ng.core'
    }
}
