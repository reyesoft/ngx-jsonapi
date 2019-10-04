# ngx-jsonapi

<div align="center">

[![angular jsonapi](https://user-images.githubusercontent.com/938894/34119450-fa59fec0-e400-11e7-92c1-dd2aff2ebc00.png)](https://github.com/reyesoft/ngx-jsonapi)

[![CircleCI](https://circleci.com/gh/reyesoft/ngx-jsonapi.svg?style=svg)](https://circleci.com/gh/reyesoft/ngx-jsonapi) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/b097196f7f544412a79a99080a41bbc1)](https://www.codacy.com/app/Swimlane/ngx-charts?utm_source=github.com&utm_medium=referral&utm_content=swimlane/ngx-charts&utm_campaign=Badge_Grade) [![npm version](https://badge.fury.io/js/ngx-jsonapi.png)](https://badge.fury.io/js/ngx-jsonapi) [![Coverage Status](https://coveralls.io/repos/github/reyesoft/ngx-jsonapi/badge.svg?branch=master)](https://coveralls.io/github/reyesoft/ngx-jsonapi?branch=master)

</div>
This is a JSON API library for Angular 6+. Please use [ts-angular-jsonapi](https://github.com/reyesoft/ts-angular-jsonapi) for AngularJS.

## Online demo

You can test library on this online example 👌 <http://ngx-jsonapi.reyesoft.com/>.

<div align="center">

[![demo app](https://user-images.githubusercontent.com/938894/39630783-c6f55ed4-4f86-11e8-9376-9acb587fe4c4.gif)](http://ngx-jsonapi.reyesoft.com/)

</div>

Data is obtained from [Json Api Playground](https://jsonapiplayground.reyesoft.com/) server.

## Supported features

-   Cache (on memory): TTL for collections and resources. Before a HTTP request objects are setted with cached data.
-   Cache on IndexedDB
-   Pagination
-   Sorting
-   [Include param support](http://jsonapi.org/format/#fetching-includes) (also, when you save)
-   Equal requests, return a same ResourceObject on memory
-   Default values for a new resource (hydrator).

## Migration

-   [Migration v1 to v2 update guide](https://github.com/reyesoft/ngx-jsonapi/blob/v2.0/docs/migration.md)

## Usage

Just [install](#installation), [configure](#dependecies-and-customization) and learn with [examples](#examples).

First of all, it's advisable to read [Jsonapi specification](http://jsonapi.org/). Understanding JsonApi documents structure is recommended.

### Installation

```bash
yarn add ngx-jsonapi@2.0.0-rc.4 --save
# or npm if you wish...
```

### Dependecies and customization

1.  Add Jsonapi dependency.
2.  Configure your url and other paramemeters.
3.  Inject JsonapiCore somewhere before you extend any class from `Jsonapi.Resource`.

```typescript
import { NgModule } from '@angular/core';
import { NgxJsonapiModule } from 'ngx-jsonapi';

@NgModule({
    imports: [
        NgxJsonapiModule.forRoot({
            url: '//jsonapiplayground.reyesoft.com/v2/'
        })
    ]
})
export class AppModule {}
```

## Examples

Like you know, the better way is with examples. Lets go! 🚀

### Defining a resource

`authors.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { Autoregister, Service, Resource, DocumentCollection, DocumentResource } from 'ngx-jsonapi';
import { Book } from '../books/books.service';
import { Photo } from '../photos/photos.service';

export class Author extends Resource {
    public attributes = {
        name: 'default name',
        date_of_birth: ''
    };

    public relationships = {
        books: new DocumentCollection<Book>(),
        photo: new DocumentResource<Photo>()
    };
}

@Injectable()
@Autoregister()
export class AuthorsService extends Service<Author> {
    public resource = Author;
    public type = 'authors';
}
```

### Get a collection of resources

#### Controller

```typescript
import { Component } from '@angular/core';
import { DocumentCollection } from 'ngx-jsonapi';
import { AuthorsService, Author } from './../authors.service';

@Component({
    selector: 'demo-authors',
    templateUrl: './authors.component.html'
})
export class AuthorsComponent {
    public authors: DocumentCollection<Author>;

    public constructor(private authorsService: AuthorsService) {
        authorsService
            .all({
                // include: ['books', 'photos'],
            })
            .subscribe(authors => (this.authors = authors));
    }
}
```

#### View for this controller

```html
<p *ngFor="let author of authors.data; trackBy: authors.trackBy">
    id: {{ author.id }} <br />
    name: {{ author.attributes.name }} <br />
    birth date: {{ author.attributes.date_of_birth | date }}
</p>
```

#### Collection sort

Example: `name` is a authors attribute, and makes a query like `/authors?sort=name,job_title`

```typescript
let authors = authorsService.all({
    sort: ['name', 'job_title']
});
```

#### Collection filtering

Filter resources with `attribute: value` values. Filters are used as 'exact match' (only resources with attribute value same as value are returned). `value` can also be an array, then only objects with same `attribute` value as one of `values` array elements are returned.

```typescript
authorsService.all({
    remotefilter: { country: 'Argentina' }
});
```

### Get a single resource

From this point, you only see important code for this library. For a full example, clone and see demo directory.

```typescript
authorsService.get('some_author_id');
```

#### More options? Include resources when you fetch data (or save!)

```typescript
authorsService.get('some_author_id', { include: ['books', 'photos'] });
```

TIP: these parameters work with `all()` and `save()` methods too.

### Add a new resource

```typescript
let author = this.authorsService.new();
author.attributes.name = 'Pablo Reyes';
author.attributes.date_of_birth = '2030-12-10';
author.save();
```

#### Need you more control and options?

```typescript
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
author.save({ include: ['book'] });

// mmmm, if I need get related resources? For example, books related with author 1
let relatedbooks = booksService.all({ beforepath: 'authors/1' });

// you need get a cached object? you can force ttl on get
let author$ = authorsService.get(
    'some_author_id',
    { ttl: 60 } // ttl on seconds (default: 0)
);
```

### Update a resource

```typescript
authorsService.get('some_author_id').suscribe(author => {
    this.author.attributes.name += 'New Name';
    this.author.save(success => {
        console.log('author saved!');
    });
});
```

### Pagination

```typescript
authorsService.all({
  // get page 2 of authors collection, with a limit per page of 50
  page: { number: 2 ;  size: 50 }
});
```

#### Collection page

-   number: number of the current page
-   size: size of resources per page ([it's sended to server by url](http://jsonapi.org/format/#fetching-pagination))
-   information returned from server (check if is avaible) **total_resources: total of avaible resources on server** resources_per_page: total of resources returned per page requested

## Local Demo App

You can run [JsonApi Demo App](http://ngx-jsonapi.reyesoft.com/) locally following the next steps:

```bash
git clone git@github.com:reyesoft/ngx-jsonapi.git
cd ngx-jsonapi
yarn
yarn start
```

We use as backend [Json Api Playground](https://jsonapiplayground.reyesoft.com/).

## Colaborate

Check [Environment development file](DEV_ENVIRONMENT.md) 😉.
