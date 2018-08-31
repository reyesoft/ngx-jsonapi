# ngx-jsonapi v1 to v2 update guide

ngx-jsonapi v2 has arrived! While this is a major version change (from 1.x to 2.x), we've put in a lot of work to keep the hard breaking changes to a minimum.

## Services

`authors.service.ts`

### Before

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

### Now

```typescript
```
