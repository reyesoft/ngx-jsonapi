# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.3.0] - 2021-05-19

### Added

-   Added angular 10 to demo

## [Unreleased]

### Fixed

-   when ttl 0 was set, a request to the server was not made again, it brought it from memory, it was corrected in the isLive function of common.

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
