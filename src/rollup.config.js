
export default {
  entry: './dist/ngx-jsonapi/@ngx-jsonapi/ngx-jsonapi.es5.js',
  dest: './dist/ngx-jsonapi/bundles/ngx-jsonapi.umd.js',
  format: 'umd',
  exports: 'named',
  moduleName: 'ngx-jsonapi',
  globals: {
    '@angular/core': 'ng.core'
  }
}
