# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.3.0] - 2021-05-19

### Changed

-   Angular version upgraded to 10, and vulnerabilities updated. ([#306](https://github.com/reyesoft/ngx-jsonapi/pull/306))

## [2.2.2] - 2021-05-19

### Fixed

-   When ttl 0 was set, a request to the server was not made again, it brought it from memory, it was corrected in the isLive function of common.
-   When the value of a remote filter contained '&', the generated url did not keep the '&'.

## [2.2.1] - 2020-10-17

### Fixed

-   Warning: Entry point 'ngx-jsonapi' contains deep imports into 'node_modules/rxjs/internal/util/noop'. This is probably not a problem, but may cause the compilation of entry points to be out of order.
-   lodash dependency missing.

## [2.2.0] - 2020-10-17

### Changed

-   Local cache store is disabled by default.
-   Only used lodash functions are included on base script. 69.44 KB to 7.5 KB, 89% saved!
-   Store support is optional.

![image](https://user-images.githubusercontent.com/938894/96340064-d58a7500-106e-11eb-9181-464186f9e2f1.png)

### Removed

-   config.cachestore_support

## [2.1.19] - 2020-08-25

### Fixed

-   Changed JS modules and methods for ES

## [2.1.18] - 2020-08-13

### Fixed

-   Fixed ModuleWithProviders to work with Angular 10

## [2.1.17] - 2020-07-21

### Removed

-   Removed test modules. Now they are not exported.

## [2.1.16] - 2020-07-18

### Fixed

-   With cachestore_support=false, dont try to save resources on LocalStorage. Problem detected with Angular Server Side Rendering.

## [2.1.15] - 2020-01-17

### Added

-   Added include_get and include_save to IResourceParams
-   Resource's save methods uses is_new instead of ID property to select between POST and PATCH

## [2.1.14] - 2019-10-24

### Added

-   Export testing resources

## [2.1.13] - 2019-10-24

### Fixed

-   ES6 support.

### Deprecated

-   Deprecated `@Autoregister()` decorator.

## [0.0.1]

### Added

-   Migration from [AngularJS ts-angular-jsonapi](https://github.com/reyesoft/ts-angular-jsonapi) to Angular 4.
