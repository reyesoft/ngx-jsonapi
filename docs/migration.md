# ngx-jsonapi v1 to v2 update guide

ngx-jsonapi v2 has arrived! While this is a major version change (from 1.x to 2.x), we've put in a lot of work to keep the hard breaking changes to a minimum.

## package.json

Update version of `ngx-jsonapi` to `2.0.0-rc.1` (or [last version](https://www.npmjs.com/package/ngx-jsonapi))

## Services

-   Extended Service
    -   Remove ISchema elements
-   Extended Resource
    -   Add `@Autoregister` on every extended `Resource`
    -   Set initial values for `attributes` property
    -   Add hasMany `relationships` with `DocumentCollection<SomeResource>()`
    -   Add hasOne `relationships` with `DocumentResource<SomeResource>()`

### `authors.service.ts` example:

#### Before

```typescript
import { Injectable } from '@angular/core';
import { Service, ISchema, Resource } from 'ngx-jsonapi';

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
        name: string;
        date_of_birth: string;
        date_of_death: string;
        created_at: string;
        updated_at: string;
    };
}
```

#### Now

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

## Controllers

-   Remove every `localfilter` on `all()` methods. You need to use rxjs pipe `.map()`.
-   Replace every `ICollection<YourResource>` type with `DocumentCollection<YourResource>`

### `authors.controller.ts` example:

#### Before

```typescript
public authors: ICollection<Author>;
```

#### Now

```typescript
public authors: DocumentCollection<Author>;
```

## Views

-   Replace every `.$toArray` with `.data` on collections.
-   Replace every `yourcollection` (as Object) with `yourcollection.data` on collections.
-   Add on your `*ngFor` `trackBy` function. Example: `let resource of collection.data; trackBy: collection.trackBy`.
-   Replace every `.$is_loading` with `.is_loading` on collections (bool `builded` is recommended).
-   Replace every `content` with `builded`, if you try to detect a builded json document.

### `author.template.html` example:

#### Before

```html
<span *ngIf="author.relationships.photos.content === 'collection'">
    <img *ngFor="let photo of book.relationships.photos.data.$toArray"
        title="Book id #{{ photo.id }}"
    />
</span>
```

#### Now

```html
<span *ngIf="author.relationships.photos.builded">
    <img *ngFor="let photo of author.relationships.photos.data"
        title="Book id #{{ photo.id }}"
    />
</span>
```

### `authors.template.html` example:

#### Before

```html
<tr *ngFor="let author of authors.$toArray">
    <td>{{ author.id }}</td>
    <td>{{ author.attributes.name }}</td>
</tr>
```

#### Now

```html
<tr *ngFor="let author of authors.data; trackBy: authors.trackBy">
    <td>{{ author.id }}</td>
    <td>{{ author.attributes.name }}</td>
</tr>
```

## More information?

-   [README](https://github.com/reyesoft/ngx-jsonapi/blob/initial-commit-v2/README.md)
-   [Issue](https://github.com/reyesoft/ngx-jsonapi/issues/105)
