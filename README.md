# vp-ngx-jsonapi

<div align="center">

[![angular jsonapi](https://user-images.githubusercontent.com/938894/34119450-fa59fec0-e400-11e7-92c1-dd2aff2ebc00.png)](https://github.com/almelnik/vp-ngx-jsonapi)

[![Build Status](https://travis-ci.org/reyesoft/vp-ngx-jsonapi.svg?branch=master)](https://travis-ci.org/reyesoft/vp-ngx-jsonapi) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/b097196f7f544412a79a99080a41bbc1)](https://www.codacy.com/app/Swimlane/ngx-charts?utm_source=github.com&utm_medium=referral&utm_content=swimlane/ngx-charts&utm_campaign=Badge_Grade) [![npm version](https://badge.fury.io/js/vp-ngx-jsonapi.png)](https://badge.fury.io/js/vp-ngx-jsonapi)

</div>

This is a JSON API library for Angular 4+. Please use [ts-angular-jsonapi](https://github.com/reyesoft/ts-angular-jsonapi) for AngularJS.

## Online demo

You can test library on this online example 👌 <http://ngx-jsonapi.reyesoft.com/>.

<div align="center">

[![demo app](https://user-images.githubusercontent.com/938894/39630783-c6f55ed4-4f86-11e8-9376-9acb587fe4c4.gif)](http://ngx-jsonapi.reyesoft.com/)

</div>

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
- [Properties on collections](https://github.com/almelnik/vp-ngx-jsonapi/blob/master/src/interfaces/collection.ts) like `$length`, `$is_loading` or `$source` (_`empty`_ |`cache`|`server`)

## Usage

More information on [examples section](#examples).

### Installation

First of all, you need read, read and read [Jsonapi specification](http://jsonapi.org/).

```bash
yarn add vp-ngx-jsonapi --save
# or npm if you wish...
```

### Dependecies and customization

1. Add Jsonapi dependency.
2. Configure your url and other paramemeters.
3. Inject JsonapiCore somewhere before you extend any class from `Jsonapi.Resource`.

```javascript
import { NgModule } from '@angular/core';
import { NgxJsonapiModule } from 'vp-ngx-jsonapi';

@NgModule({
  imports: [
    NgxJsonapiModule.forRoot({
      url: '//jsonapiplayground.reyesoft.com/v2/'
    })
  ]
})
export class AppModule { }
```

## Examples

Like you know, the better way is with examples. Lets go! 🚀

### Defining a resource

`authors.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { Service, ISchema } from 'vp-ngx-jsonapi';

@Injectable()
export class AuthorsService extends Service<Author> {
    public resource = Author;
    public type = 'authors';
    public schema: ISchema = {
        relationships: {
            books: {
                hasMany: true
            },
            photos: {
                hasMany: true
            }
        }
    };
}
export class Author extends Resource {
    public attributes: {
        name: string,
        date_of_birth: string,
        date_of_death: string,
        created_at: string,
        updated_at: string
    };
}
```

### Get a collection of resources

#### Controller

```javascript
import { Component } from '@angular/core';
import { ICollection } from 'vp-ngx-jsonapi';
import { Author, AuthorsService } from './authors.service';

@Component({
  selector: 'demo-authors',
  templateUrl: './authors.component.html'
})
export class AuthorsComponent {
  public authors: ICollection<Author>;

  public constructor(
    private authorsService: AuthorsService
  ) {
      authorsService.all(
          // { include: ['books', 'photos'] }
      )
      .subscribe(
          authors => {
              this.authors = authors;
              console.info('success authors controller', authors);
          },
          error => console.error('Could not load authors.')
     );
  }
}
```

#### View for this controller

```html
<p *ngFor="let author of authors.$toArray">
  id: {{ author.id }} <br />
  name: {{ author.attributes.name }} <br />
  birth date: {{ author.attributes.date_of_birth | date }}
</p>
```

#### More options? Collection filtering

Filter resources with `attribute: value` values. Filters are used as 'exact match' (only resources with attribute value same as value are returned). `value` can also be an array, then only objects with same `attribute` value as one of `values` array elements are returned.

```javascript
let authors$ = authorsService.all(
  {
  localfilter: { name: 'xx' },      // request all data and next filter locally
  remotefilter: { country: 'Argentina' }  // request data with filter url parameter
  }
);
```

### Get a single resource

From this point, you only see important code for this library. For a full example, clone and see demo directory.

```javascript
let author$ = authorsService.get('some_author_id');
```

#### More options? Include resources when you fetch data (or save!)

```javascript
let author$ = authorsService.get(
  'some_author_id',
  { include: ['books', 'photos'] }
);
```

TIP: these parameters work with `all()` and `save()` methods too.

### Add a new resource

```javascript
let author = this.authorsService.new();
author.attributes.name = 'Pablo Reyes';
author.attributes.date_of_birth = '2030-12-10';
author.save();
```

#### Need you more control and options?

```javascript
let author = this.authorsService.new();
author.attributes.name = 'Pablo Reyes';
author.attributes.date_of_birth = '2030-12-10';

// some_book is an another resource like author
let some_book = booksService.get(1);
author.addRelationship(some_book);

// some_publisher is a polymorphic resource named company on this case
let some_publisher = publishersService.get(1);
author.addRelationship(some_publisher, 'company');

// wow, now we need detach a relationship
author.removeRelationship('books', 'book_id');

// this library can send include information to server, for atomicity
author.save( { include: ['book'] });

// mmmm, if I need get related resources? For example, books related with author 1
let relatedbooks = booksService.all( { beforepath: 'authors/1' } );

// you need get a cached object? you can force ttl on get
let author$ = authorsService.get(
  'some_author_id',
  { ttl: 60 } // ttl on seconds (default: 0)
);
```

### Update a resource

```javascript
authorsService.get('some_author_id')
    .suscribe(
        author => {
            this.author.attributes.name += 'New Name';
            this.author.save(success => {
                console.log('author saved!');
            });
        }
    )
```

### Pagination

```javascript
let authors$ = authorsService.all(
  {
  // get page 2 of authors collection, with a limit per page of 50
  page: { number: 2 ;  size: 50 }
  }
);
```

#### Collection page

- number: number of the current page
- size: size of resources per page ([it's sended to server by url](http://jsonapi.org/format/#fetching-pagination))
- information returned from server (check if is avaible) **total_resources: total of avaible resources on server** resources_per_page: total of resources returned per page requested

## Local Demo App

You can run [JsonApi Demo App](http://ngx-jsonapi.reyesoft.com/) locally following the next steps:

```bash
git clone git@github.com:amelnik/vp-ngx-jsonapi.git
cd ngx-jsonapi
yarn
yarn start
```

We use as backend [Json Api Playground](http://jsonapiplayground.reyesoft.com/).

## Colaborate

Check [Environment development file](DEV_ENVIRONMENT.md) 😉.
