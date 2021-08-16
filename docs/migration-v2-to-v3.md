# ngx-jsonapi v2 to v3 update guide

ngx-jsonapi v3 has arrived! While this is a major version change (from 2.x to 3.x), we've put in a lot of work to keep the hard breaking changes to a minimum.

## Library bootstrap

### Before

```typescript
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

#### Enable Local Cache

```typescrypt
import { NgxJsonapiModule } from 'ngx-jsonapi';
import { JSONAPI_RIPPER_SERVICE, JSONAPI_STORE_SERVICE } from './core';
import { StoreService } from 'ngx-jsonapi/sources/store.service';
import { JsonRipper } from 'ngx-jsonapi/services/json-ripper';

@NgModule({
    imports: [
        NgxJsonapiModule.forRoot({
            url: '//jsonapiplayground.reyesoft.com/v2/'
        })
    ],
    providers: [
        {
            provide: JSONAPI_RIPPER_SERVICE,
            useClass: JsonRipperFake
        },
        {
            provide: JSONAPI_STORE_SERVICE,
            useClass: StoreFakeService
        }
    ]
})
export class AppModule {}
```

### After

```typescript
/* .. */
import { NgxJsonapiModule } from 'ngx-jsonapi';

@NgModule()
export class AppModule {
    public constructor() {
        JsonapiBootstrap({
            user_config: { url: '//jsonapiplayground.reyesoft.com/v2/' }
        });
    }
}
```

#### Enable Local Cache

```typescript
/* .. */
import { NgxJsonapiModule } from 'ngx-jsonapi';
import { StoreService } from 'ngx-jsonapi/sources/store.service';
import { JsonRipper } from 'ngx-jsonapi/services/json-ripper';

@NgModule()
export class AppModule {
    public constructor() {
        JsonapiBootstrap({
            user_config: { url: '//jsonapiplayground.reyesoft.com/v2/' },
            jsonapiStore: new StoreFakeService(),
            jsonRipper: new JsonRipperFake()
        });
    }
}
```
