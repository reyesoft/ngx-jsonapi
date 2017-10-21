# ngx-jsonapi

[![Build Status](https://travis-ci.org/reyesoft/ngx-jsonapi.svg?branch=master)](https://travis-ci.org/reyesoft/ngx-jsonapi) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/b097196f7f544412a79a99080a41bbc1)](https://www.codacy.com/app/Swimlane/ngx-charts?utm_source=github.com&utm_medium=referral&utm_content=swimlane/ngx-charts&utm_campaign=Badge_Grade) [![npm version](https://badge.fury.io/js/%40reyesoft%2Fngx-jsonapi.svg)](https://badge.fury.io/js/ngx-jsonapi)

This is a JSON API library for Angular 4\. Please use [ts-angular-jsonapi](https://github.com/reyesoft/ts-angular-jsonapi) for AngularJS.

## Online demo

You can test library on this online example 👌 <http://ngx-jsonapi.reyesoft.com/>.

Data is obtained from [Json Api Playground](http://jsonapiplayground.reyesoft.com/).

## Supported features

- Cache (on memory): Before a HTTP request objects are setted with cached data.
- Cache (on memory): TTL for collections and resources
- Cache on localstorage
- Pagination
- Filtering by attributes through a string or a regular expression
- [Include param support](http://jsonapi.org/format/#fetching-includes) (also, when you save)
- Two+ equal resource request, only one HTTP call.
- Equal requests, return a same ResourceObject on memory
- Default values for a new resource (hydrator).
- [Properties on collections](https://github.com/reyesoft/ts-angular-jsonapi/blob/master/src/library/interfaces/collection.d.ts) like `$length`, `$is_loading` or `$source` (_`empty`_ |`cache`|`server`)

## Usage

More information on [examples section](#examples).

### Installation

First of all, you need read, read and read [Jsonapi specification](http://jsonapi.org/).

```bash
npm install ngx-jsonapi --save
```

### Dependecies and customization

1. Add Jsonapi dependency.
2. Configure your url and other paramemeters.
3. Inject JsonapiCore somewhere before you extend any class from `Jsonapi.Resource`.

```javascript
import 'ts-angular-jsonapi';

var app = angular.module('yourAppName', ['rsJsonapi']);

app.config(['rsJsonapiConfig', (rsJsonapiConfig) => {
  angular.extend(rsJsonapiConfig, {
    url: '//jsonapiplayground.reyesoft.com/v2/'
  });
}]);

var MyController = function(JsonapiCore) {
  // ...
}
MyController.$inject = ['JsonapiCore'];
```

## Examples

Like you know, the better way is with examples. Based on [endpoints example library](https://github.com/endpoints/endpoints-example/).

### Defining a resource

`authors.service.ts`

```typescript
class AuthorsService extends Jsonapi.Resource {
  type = 'authors';
  public schema: Jsonapi.ISchema = {
    attributes: {
      name: { presence: true, length: { maximum: 96 } },
      date_of_birth: {},
      date_of_death: {},
      created_at: {},
      updated_at: {}
    },
    relationships: {
      books: {},
      photos: {}
    }
  };
}
angular.module('demoApp').service('AuthorsService', AuthorsService);
```

### Get a collection of resources

#### Controller

```javascript
class AuthorsController {
  public authors: any = null;

  /** @ngInject */
  constructor(AuthorsService) {
    this.authors = AuthorsService.all();
  }
}
```

#### View for this controller

```html
<p ng-repeat="author in vm.authors">
  id: {{ author.id }} <br />
  name: {{ author.attributes.name }} <br />
  birth date: {{ author.attributes.date_of_birth | date }}
</p>
```

#### More options? Collection filtering

Filter resources with `attribute: value` values. Filters are used as 'exact match' (only resources with attribute value same as value are returned). `value` can also be an array, then only objects with same `attribute` value as one of `values` array elements are returned.

```javascript
let authors = AuthorsService.all(
  {
    localfilter: { name: 'xx' },            // request all data and next filter locally
    remotefilter: { country: 'Argentina' }  // request data with filter url parameter
  }
);
```

### Get a single resource

From this point, you only see important code for this library. For a full example, clone and see demo directory.

```javascript
let author = AuthorsService.get('some_author_id');
```

#### More options? Include resources when you fetch data (or save!)

```javascript
let author = AuthorsService.get(
  'some_author_id',
  { include: ['books', 'photos'] },
  success => {
    console.log('Author loaded.', success);
  },
  error => {
    console.log('Author don`t loaded. Error.', error);
  }
);
```

TIP: these parameters work with `all()` and `save()` methods too.

### Add a new resource

```javascript
let author = this.AuthorsService.new();
author.attributes.name = 'Pablo Reyes';
author.attributes.date_of_birth = '2030-12-10';
author.save();
```

#### Need you more control and options?

```javascript
let author = this.AuthorsService.new();
author.attributes.name = 'Pablo Reyes';
author.attributes.date_of_birth = '2030-12-10';

// some_book is an another resource like author
let some_book = this.BooksService.get(1);
author.addRelationship(some_book);

// some_publisher is a polymorphic resource named company on this case
let some_publisher = this.PublishersService.get(1);
author.addRelationship(some_publisher, 'company');

// wow, now we need detach a relationship
author.removeRelationship('books', 'book_id');

// this library can send include information to server, for atomicity
author.save( { include: ['book'] });

// mmmm, if I need get related resources? For example, books related with author 1
let relatedbooks = BooksService.all( { beforepath: 'authors/1' } );

// you need get a cached object? you can force ttl on get
let author = AuthorsService.get(
  'some_author_id',
  { ttl: 60 } // ttl on seconds (default: 0)
);
```

### Update a resource

```javascript
let author = AuthorsService.get('some_author_id');
this.author.attributes.name += 'New Name';
this.author.save(success => {
  console.log('author saved!');
});
```

### Pagination

```javascript
let authors = AuthorsService.all(
  {
    // get page 2 of authors collection, with a limit per page of 50
    page: { number: 2 ;  limit: 50 }   
  }
);
```

#### Collection page

- number: number of the current page
- limit: limit of resources per page ([it's sended to server by url](http://jsonapi.org/format/#fetching-pagination))
- information returned from server (check if is avaible) **total_resources: total of avaible resources on server** resources_per_page: total of resources returned per page requested

## Local Demo App

You can run [JsonApi Demo App](http://reyesoft.github.io/ts-angular-jsonapi/) locally following the next steps:

```bash
git clone git@github.com:reyesoft/ts-angular-jsonapi.git
cd ts-angular-jsonapi
npm install -g gulp   # if you are on linux, you need do this with sudo
npm install
gulp serve
```

We use as backend [Json Api Playground](http://jsonapiplayground.reyesoft.com/).

## Colaborate

First you need run the demo. Next, when you made new features on your fork, please run

```bash
gulp dist
```

And commit! Don't forget your pull request :)
