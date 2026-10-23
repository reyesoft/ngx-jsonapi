# Core agnóstico para ngx-jsonapi

Fecha de la investigación: 23 de octubre de 2026.
Repositorio: [reyesoft/ngx-jsonapi](https://github.com/reyesoft/ngx-jsonapi).
Alcance: solo investigación. Este documento no cambia la librería.

## Recomendación

Usar **la línea 2.8 como base funcional** y tomar de la 3.0.6 solo el patrón de desacople (bootstrap explícito e interfaz HTTP). No retomar la 3.x como línea de producto.

La versión que deben seguir consumiendo las apps Angular 20 de Reyesoft es `ngx-jsonapi`, con la misma API de `Service`, `Resource`, `DocumentCollection` y `Observable`. El core puro y los adaptadores HTTP salen en paquetes aparte. El número **3.0.6 ya está publicado** y apunta a otro diseño (axios 0.21, sin Angular, toolchain de 2021). La convergencia tiene que ser un **4.0** cuando se partan los paquetes. Antes de eso, un **2.9** puede extraer el core por dentro sin cambiar el import de las apps.

La 3.x no es un core enchufable terminado. `IHttp` existe, pero `JsonapiBootstrap` hace `new Http()` y esa clase llama a `axios` directo. No hay adaptador de `fetch` ni de `HttpClient`. El README de React llama a `JsonapiBootstrap.bootstrap` dentro del cuerpo del componente, que se ejecuta en cada render.

## 1. Releases, ramas y estado de mantenimiento

`npm dist-tag latest` es **2.8.0**, publicado el **2026-08-14**. No hay otro dist-tag (`next`, `beta`, `v3`). Quien hace `npm i ngx-jsonapi` recibe 2.8.0. La 3.x hay que pedirla a mano y **no está marcada como deprecated**.

La rama por defecto de GitHub sigue siendo `2.x`, pero está atrasada. Su punta es `07e0d3b` (2025-08-24, el release 2.4.0 / Angular 17). El código de 2.8.0 vive en `origin/2.8` (`08a96fa`, 2026-08-13) y **no tiene tag git**. El último push del repo es ese commit. El changelog de esa rama llega a 2.7.0 y no menciona 2.8.0.

### Línea 2.x reciente

| Versión npm | Publicada | Tag git | Peer `@angular/core` | Notas |
| --- | --- | --- | --- | --- |
| 2.3.1 | 2025-08-04 | `2.3.1` → `28501e6` | `^16.2.0` | Pipeline de GitHub Actions |
| 2.4.0 | 2025-08-28 | `2.4.0` → `07e0d3b` | `^16.2.0 \|\| ^17.0.0` | Angular 17. Es la punta de `origin/2.x` |
| 2.5.0 | 2025-09-22 | `2.5.0` | `^17 \|\| ^18` | Angular 18 |
| 2.5.1 | 2025-12-12 | `2.5.1` | `^17 \|\| ^18` | `fixed/type-undefined` |
| 2.6.0 | no está en npm | `2.6.0` → `b910fce` (2025-09-29) | — | Tag de Angular 19, no publicado |
| 2.6.1 | 2026-01-13 | `2.6.1` | **ninguno** | Publicación accidental del `package.json` de la demo. Dependencias directas: `rxjs@^7.8.0`, `dexie@2.0.4`, `lodash-es@4.17.15`, `tsickle@0.39.1` |
| 2.6.2 | 2026-01-13 | `2.6.2` | `^18 \|\| ^19` | Corrige 2.6.1 |
| 2.7.0 | 2026-02-06 | `2.7.0` → `2e67472` | `^18 \|\| ^19 \|\| ^20` | Angular 20. Último GitHub Release |
| 2.8.0 | 2026-08-14 | **sin tag** | `^18 \|\| ^19 \|\| ^20 \|\| ^21` | Angular 21. Rama `2.8` |

Prereleases que no son la línea axios: `2.3.0-dev-test` … `2.3.6-dev-test` (agosto–noviembre 2023) y `3.3.5-dev-test` (2023-09-26). Ese `3.3.5-dev-test` declara peer Angular `^16.2.0`. Es un experimento de empaquetado, no la 3.0.x agnóstica.

Ramas de versión que no coinciden con el tag del mismo nombre: `origin/2.4` (2025-12-10) va por delante del tag `2.4.0`; `origin/2.3` no es el tag `2.3.1`. El desarrollo real de 2025–2026 se movió de rama en rama (`2.4`, `2.6`, `2.7`, `2.8`) y la rama por defecto no se fast-forwardó.

### Línea 3.x

Ancestro común con 2.8: `9abbf24` (2021-07-01, Angular 10, PR #315). A partir de ahí las historias se separan.

| Versión npm | Publicada | Peer / deps de runtime | Código |
| --- | --- | --- | --- |
| 3.0.0-dev | 2021-08-19 | peer `axios@^0.21.1`; deps `dexie@^2.0.4`, `lodash-es@^4.17` | PR #326, FE-272, commit `1f930bd` |
| 3.0.0 y 3.0.1 | no están en npm | — | El changelog habla de 3.0.0 el 2021-08-17 y otra vez el 2021-12-23 |
| 3.0.2 | 2023-01-20 | igual que 3.0.0-dev | Filtros con operador (`filter[status][ne]`) |
| 3.0.3 – 3.0.5 | 2024-06-05 | igual | Tres hotfixes de `DocumentCollection.fill` el mismo día |
| 3.0.6 | 2024-06-06 | igual | Último 3.x. Rama `origin/3.x` = `origin/v3.0` = `af62c86` |

La 3.x lleva **parada desde el 6 de junio de 2024**. Su `package.json` de desarrollo sigue en Angular 10.2.5, TypeScript 3.9.2, Jest 24, RxJS 6.6.7, Rollup 0.50 y axios `^0.21.1`. No hay tag git `3.0.x`.

Estado de mantenimiento el 2026-10-23:

- El repo no está archivado. 101 estrellas, 63 issues abiertos, descripción todavía dice «Angular 5+».
- La actividad de 2025–2026 en 2.x es casi solo subir de major de Angular (17, 18, 19, 20, 21). El `latest` de `@angular/core` al 2026-10-23 es **22.2.3** (22.0.0 salió el 2026-06-03). 2.8.0 declara peers hasta 21 y el repo desarrolla con 21.2.19. No hay rama de Angular 22. La línea viva va un major por detrás del estable. Angular 23 todavía no está en npm.
- PR abierto [#386](https://github.com/reyesoft/ngx-jsonapi/pull/386) (2026-09-29): `Resource.save()` revienta con 204 o con un 200 que solo trae `meta` (issue #302). La base del PR es `2.x` en `07e0d3b`, no `2.8`. El mismo `if ('id' in success.data)` sigue en 2.8 y en 3.0.6.
- Quedan PRs viejos de Angular 18/19 (`#372`, `#373`) abiertos y superados por los releases posteriores.

## 2. Arquitectura

Las dos líneas comparten el mismo modelo de dominio. El diff de los fuentes de librería (sin specs) contra el ancestro común es chico en comportamiento y grande en cómo se construye el grafo de objetos: **34 archivos distintos, 23 idénticos**. La mayor parte del diff son tipos explícitos, `Core.injectedServices` estático contra `Core.getInstance()`, y el cliente HTTP.

### Conceptos (iguales en las dos)

| Concepto | Qué es |
| --- | --- |
| `Resource` | Un recurso JSON:API. `id`, `type`, `attributes`, `relationships`, `links`, `meta`, flags `is_new` / `is_saving` / `is_loading` / `loaded` / `source`, TTL |
| `Service<R>` | Un tipo de recurso (`authors`, `books`). `get`, `all`, `delete`, `new`, `clearCache`, `parseToServer` / `parseFromServer`. El constructor hace `setTimeout(() => this.register())` |
| `DocumentCollection` | Colección con `data: R[]`, `page`, `meta`, `builded`, `source`. `RelatedDocumentCollection` es la variante de un hasMany |
| `DocumentResource` | Relación hasOne (`content: 'id' \| 'resource'`) |
| `CacheMemory` | Singleton en memoria. Identidad compartida: dos `get` del mismo id devuelven el mismo objeto |
| `StoreService` + `JsonRipper` | IndexedDB vía Dexie. Tablas `collections` y `elements`, base `jsonapi_db`. `store_cache_method: 'individual' \| 'compact'` |
| Includes | `IParams.include` en lectura; `include_get` / `include_save` en recurso. Al guardar se pueden anidar recursos en `included` |
| Paginación | `page[number]` y `page[size]`, configurables en `JsonapiConfig.parameters`. `Page` lee `meta.page`, `meta.resources_per_page`, `meta.total_resources`. `hasMorePages()` |
| Filtros y sort | `remotefilter` → `filter[...]`, `sort` como array, `fields` sparse fieldset. `smartfilter` está deprecado desde 2.2 |
| `ClonedResource` | Borrador para editar sin tocar el recurso cacheado (`getClone`) |

`params.ts`, `params-collection.ts` y `params-resource.ts` son **idénticos** entre 2.8 y 3.0.6. El arreglo de `encodeURIComponent` para `remotefilter` anidado (`filter[status][ne]=archived`, PR #361, 2023) **ya está en 2.8**. No es una feature exclusiva de 3.x.

`Base.forEach` es un `Object.keys` propio. Lodash no recorre los query params.

### API pública

2.8, `projects/ngx-jsonapi-lib/src/public_api.ts`:

- `provideNgxJsonapiStandalone`
- interfaces
- `Autoregister` (no-op; el comentario dice «deprecated since version 3.0.0» aunque esta línea es 2.8)
- `JsonapiCore`, `JSONAPI_RIPPER_SERVICE`, `JSONAPI_STORE_SERVICE`
- `JsonapiConfig`, `Resource`, `DocumentResource`, `DocumentCollection`, `Service`
- `StoreService`, `JsonRipper`
- también reexporta `photos.service` de los factories de test

3.0.6, `src/public_api.ts`:

- lo mismo, más `JsonapiBootstrap`
- sin provider Angular
- sin el factory de photos en el barrel (sí existe el archivo)

Métodos de cara al usuario que existen en las dos: `Service.get/all/delete/getClone/new/clearCache/clearCacheMemory`, `Resource.save/delete/restore/addRelationship/addRelationships/removeRelationship/toObject/fill/hasOneRelated/hasManyRelated`.

`@Autoregister()` en las dos líneas es una función que devuelve un decorador vacío. Registrar es `new MiService()` → `register()` → `Core.me.registerService`. Si `Core.me` todavía no existe, `register()` lanza.

### Capa HTTP

**2.8.** `Http` es `@Injectable` y recibe `HttpClient` + `JsonapiConfig`. Pide `Content-Type` y `Accept: application/vnd.api+json`. Los GET iguales se deduplican con un mapa + `share()`. El resto de verbos también pasan por `share()`, pero no se deduplican. `Core.exec` hace `error = error.error || error` y mira `error.status`. Eso coincide con `HttpErrorResponse` de Angular (el body va en `.error`, el status HTTP en `.status`). Los interceptors de `provideHttpClient()` se aplican solos, porque la llamada sale del `HttpClient` de la app.

**3.0.6.** `IHttp.exec(...): Observable<IDocumentData>` está definido, pero la única implementación importa `axios` y arma el `Observable` a mano con `axios.request`. El bootstrap no recibe un `IHttp`: siempre hace `new Http()`. Un error de axios tiene `response.status` y `response.data`, no `.status` ni `.error`. La detección de offline (`status <= 0`) y el mensaje que recibe `loadingsError` no se comportan como en Angular. La rama histórica `FE-331-interceptor-not-working-with-axios` documenta el otro costo: se pierden los interceptors de auth.

### Modelo reactivo

Las dos devuelven `Observable` (RxJS) en `get`, `all`, `save`, `delete`, `restore` y en `Core.exec`. Por dentro hay `BehaviorSubject` que emite primero el objeto de caché (con `loaded: false`) y después el de red. Ese doble emit es el contrato que usa el `async` pipe.

2.8 usa RxJS 7.8 en el repo y **no lo declara** como peer del paquete publicado. Llega transitivo de Angular. `throwError(error)` (firma deprecada en RxJS 7, a romper en RxJS 8) sigue en `core.ts`.

3.0.6 importa RxJS en el código publicado y **tampoco lo declara** en el `package.json` del paquete (ni dependency ni peer). El repo lo pinnea en 6.6.7.

### Acoplamiento a Angular en 2.8

Producción, no tests:

| Archivo | Uso de Angular |
| --- | --- |
| `core.ts` | `@Injectable`, `Injector`, `@Optional`, `isDevMode` |
| `sources/http.service.ts` | `@Injectable`, `HttpClient`, `HttpHeaders` |
| `sources/store.service.ts`, `store-fake.service.ts` | `@Injectable` |
| `services/json-ripper.ts`, `json-ripper-fake.ts` | `@Injectable` |
| `document-collection.ts`, `services/converter.ts` | `isDevMode()` |
| `ngx-jsonapi.provider.ts` | `makeEnvironmentProviders` |

No hay `NgModule` en 2.8. Se eliminó en la migración a Angular 19 (commit `c81b1a7`, release 2.6). El README de la raíz **sigue documentando `NgxJsonapiModule.forRoot`**, que ya no se exporta.

El provider publicado no alcanza para arrancar:

```typescript
export function provideNgxJsonapiStandalone(config: JsonapiConfig): EnvironmentProviders {
    return makeEnvironmentProviders([
        { provide: JsonapiConfig, useValue: config },
        StoreService,
        JsonRipper,
        JsonapiHttp,
        JsonapiCore
    ]);
}
```

`Core` no inyecta esas clases. Hace `injector.get('jsonapi_store_service')` e `injector.get('jsonapi_ripper_service')`. Si esos tokens no están, el constructur lanza. La demo de Angular 21 (`demo/main.ts`) los registra aparte, junto con `provideHttpClient()` y `provideZoneChangeDetection()`. El spec del provider solo comprueba que la función existe.

3.0.6 no importa `@angular/*` en código de producción. `isDevMode` pasa a ser un campo de `Core` con default `() => false`, así que los `console.warn` de desarrollo quedan apagados salvo que la app los encienda. Si no se pasa store ni ripper, el bootstrap usa `StoreFakeService` y `JsonRipperFake`. Ese default es mejor que el `injector.get` obligatorio de 2.8.

### Build y empaquetado publicado

**2.8.0** (tarball, 8 archivos, 268 KB descomprimido). Lo genera ng-packagr 21, target ES2022, `compilationMode: partial`.

- `exports['.'].default` → `fesm2022/ngx-jsonapi.mjs`
- `exports['.'].types` → `types/ngx-jsonapi.d.ts`
- `"type": "module"`, `"sideEffects": false`
- `"main": "ngx-jsonapi/bundles/ngx-jsonapi.umd.js"` **y ese archivo no está en el tarball**. `require()` y cualquier bundler que mire `main` no resuelven. El CLI de Angular usa `exports` y por eso las apps Angular sí cargan.
- Peer dependencies de runtime real: `@angular/core`, `@angular/common` (por `HttpClient`), `rxjs` (no declarado), `dexie`, `lodash-es`.
- Peers que el código de la librería no importa: `@angular/animations`, `forms`, `compiler`, `platform-browser`, `platform-browser-dynamic`, `platform-server`, `router`. Salen del schematic de librería Angular. Obligan a tener instalados paquetes que un consumidor de esta librería no necesita, y hacen imposible instalar el paquete fuera de una app Angular.
- El README publicado es el texto generado por el CLI («This library was generated with Angular CLI version 16.2.0»), no el README del repo.
- `sideEffects: false` es optimista. Importar el módulo no registra servicios, pero `CacheMemory.getInstance()` y `Core.me` son estado de proceso. Tree-shaking del barrel único es limitado: ng-packagr emite un solo FESM.

**3.0.6** (886 KB). Formato viejo de ng-packagr de la época Angular 10:

- `main` → UMD, `module` → ES5, `es2015` → otro bundle, más `.metadata.json` y un `.js` por archivo.
- Sin `exports`, sin `sideEffects`, sin `"type": "module"`.
- Dependencies directas: `dexie@^2.0.4`, `lodash-es@^4.17`. Peer: `axios@^0.21.1`.
- `^0.21.1` significa `>=0.21.1 <0.22.0`. No puede subir a 0.30 ni a 1.x, que es donde están los parches.
- RxJS se importa y no se declara.

Lodash en el código de 2.8 son dos imports: `cloneDeep` (`cloned-resource.ts`) e `isEqual` (`cloned-document-resource.ts`). El resto de la librería no usa lodash. En 2.2.0 ya se había recortado el bundle por eso (de ~69 KB a ~7,5 KB, según el changelog).

## 3. Paridad 2.8 contra 3.0.6

### Lo que cada una tiene y la otra no

| Capacidad | 2.8.0 | 3.0.6 |
| --- | --- | --- |
| Angular 18–21, standalone, `provideHttpClient` | sí | no (toolchain Angular 10) |
| `NgxJsonapiModule.forRoot` | no, desde 2.6 | no, desde FE-272 |
| Arranque sin injector de Angular | no | sí, `JsonapiBootstrap` |
| HTTP intercambiable de verdad | no | no. Hay interfaz, una sola implementación, y está cableada |
| `HttpClient` e interceptors | sí | no |
| axios | no | sí, hardcodeado, peer `^0.21.1` |
| `fetch` | no | no |
| RxJS `Observable` como API | sí | sí |
| Promesas o hooks como API | no | no |
| Caché en memoria, TTL, identidad | sí | sí |
| IndexedDB / Dexie | sí, peer `^2.0.4 \|\| ^4` | sí, dependency `^2.0.4` (no puede instalar Dexie 3/4) |
| Default sin store | hay que proveer los dos tokens o el constructur tira | fakes si no se pasan |
| Includes, paginación, sort, `remotefilter` con operador | sí | sí (el encode ya está en las dos) |
| `getServiceOrUndefined` y `fill()` que asigna `type` | sí (2.5.1, PR #379) | no. `toObject()` llama `getService()` y puede lanzar si el tipo no está registrado |
| `trackBy` compatible con `TrackByFunction` de `*ngFor` `(index, item)` | **no**. La firma es `(resource)` | sí, `(index, resource)`. El changelog 2.2.3 lo había arreglado; 2.8 perdió el `index`. `@for` no usa este método: su `track` es una expresión (`track item.id`) |
| `DocumentCollection.fill` reemplaza el array | no. Hace `this.data.length = 0` | sí, desde 3.0.6: copia con `slice`, la vacía y reasigna |
| `save()` borra `data.id` cuando el id es `''` | no, el bloque está comentado | sí |
| `save()` con 204 o solo `meta` | rompe (`'id' in success.data`) | rompe igual |
| `isDevMode` | el de Angular | flag default `false` |
| Tests de provider standalone | un spec que solo mira que la función exista | no aplica |
| README de React | no | sí, pero el ejemplo llama al bootstrap en el render e importa `NgxJsonapiModule`, que esa rama ya no exporta |
| Guía `docs/migration-v2-to-v3.md` | no está en 2.8 | sí. Tiene `typescrypt`, llama `JsonapiBootstrap({...})` sin `.bootstrap`, y el ejemplo de «enable cache» instancia `StoreFakeService` |

El bucle que debería sacar ids viejos de una colección está roto en las **dos**:

```typescript
for (let i; i < this.data.length; i++) {
```

`i` nace `undefined`, la comparación es falsa y el bucle no corre. Los hotfixes 3.0.3–3.0.6 no lo tocan. Solo cambian cómo se vacía `data` antes de rellenar. Hay que portar ese cambio con un test que fije la identidad del array, no mudar la línea por eso.

### Diferencias de API que rompen

| Superficie | 2.8 | 3.0.6 | Efecto si se mezclan |
| --- | --- | --- | --- |
| Inicialización | `provideNgxJsonapiStandalone(config)` más dos `provide` de tokens | `JsonapiBootstrap.bootstrap({ user_config })` | Una app Angular 20 no compila contra 3.0.6 sin reescribir el bootstrap |
| Shape de error | `HttpErrorResponse` | `AxiosError` | `loadingsError`, `status <= 0` y `error.error` dejan de significar lo mismo |
| `Core.injectedServices` | estático | de instancia, vía `getInstance()` | Cualquier acceso `Core.injectedServices` del código 2.8 no existe en 3.0.6 |
| `Resource.getServiceOrUndefined` | público | no existe | |
| Peer Angular | obligatorio, 18–21 | ausente | 3.0.6 se instala en React; 2.8.0 no |
| Entry point | solo el barrel (`exports` no permite deep imports) | deep imports tipo `ngx-jsonapi/sources/store.service`, que la propia guía cita | Esos paths no resuelven en 2.8.0 |
| `trackBy` | 1 argumento | 2 argumentos | En `*ngFor`, `trackBy: collection.trackBy` recibe el índice como primer argumento. `@for` no llama a este método |

Lo que no cambia, y es lo que hay que conservar para las apps de Reyesoft: nombres de clases, `type` / `resource` / `path` en el service, params `include` / `remotefilter` / `page` / `sort` / `fields` / `ttl`, relaciones hasOne/hasMany, y el `Observable` que emite caché y después red.

### Tests

Conteo estático de los specs de librería (no se ejecutó la suite en esta investigación):

| | 2.8 | 3.0.6 |
| --- | --- | --- |
| Archivos `*.spec.ts` de la librería | 23 | 22 |
| `describe` | 34 | 33 |
| `it` | 155 | 156 |
| `it.skip` / `xit` | 0 | 0 |

El único spec que está solo en 2.8 es `ngx-jsonapi.provider.spec.ts` (una aserción). El `it` de más en 3.x es el de `filter[status][ne]`. El resto de los nombres de spec coinciden. No hay umbral de coverage en `jest.lib.config.js`. No hay cifra de cobertura publicada que se pueda citar: el badge de Coveralls del README apunta a una rama `master` que ya no es la línea viva.

Los tests de 2.8 construyen `Core` con `HttpClient` y un `HttpHandler` falso. Los de 3.x se reescribieron para el bootstrap y axios (el spec de `service.ts` cambió ~359 líneas en el PR #326). Ninguna de las dos cubre interceptors reales, zoneless, ni el caso 204 de `save()`.

## 4. Arquitectura objetivo

Un solo modelo de dominio, tres paquetes. La app Angular no debería enterarse del corte.

```text
@reyesoft/jsonapi-core        TypeScript puro. Resource, Service, Collection,
                              CacheMemory, URL, includes, relaciones.
                              Peer: rxjs ^7.8.

@reyesoft/jsonapi-store-dexie StoreService + JsonRipper. Peer opcional: dexie ^4.
                              El core arranca con fakes de memoria.

ngx-jsonapi                   Nombre actual. Reexporta el core.
                              provideNgxJsonapiStandalone.
                              Adaptador HttpClient.
                              Peers: @angular/core, @angular/common, rxjs.
                              Angular ^18 || ^19 || ^20 || ^21 || ^22.

@reyesoft/jsonapi-react       Hooks. No es dependencia de las apps Angular.
```

`axios` no entra en el paquete Angular. Si hace falta un adaptador, va en `@reyesoft/jsonapi-axios` con peer `axios >= 1.20.0`.

### Contrato HTTP

La deduplicación de GET y el `share()` viven en el core, no en cada adaptador. El adaptador solo transporta. Normaliza el error a una forma única antes de que `Core.exec` lo vea:

```typescript
interface JsonapiRequest {
    method: string;
    url: string;
    body?: unknown;
    headers: Record<string, string>;
}

interface JsonapiHttpError {
    status: number;      // 0 si no hubo respuesta
    body: unknown;       // document JSON:API de error, o el payload crudo
}

interface JsonapiHttp {
    request(req: JsonapiRequest): Observable<IDocumentData>;
}
```

Tres adaptadores:

1. **HttpClient (Angular).** Es el que tienen que usar las apps de Reyesoft. Respeta `provideHttpClient(withInterceptors(...))`, XSRF y el testing de `HttpTestingController`. Traduce `HttpErrorResponse` a `JsonapiHttpError`.
2. **fetch.** Cero dependencias. Sirve en React 19, en Node y como default del core. `AbortSignal` para cancelar la suscripción del `Observable`.
3. **axios ≥ 1.20.0.** Opcional. No reimplementar interceptors de Angular encima de axios.

### Bootstrap

Un contexto explícito, no un `Injector`:

```typescript
interface JsonapiContext {
    url: string;
    http: JsonapiHttp;
    devMode?: boolean;
    store?: StorePort;     // default: memoria
    ripper?: RipperPort;   // default: no-op
}
```

`provideNgxJsonapiStandalone(config)` construye ese contexto con el adaptador de `HttpClient`, `devMode: isDevMode()`, y fakes de store salvo que la app pase los tokens. Así se cierra el hueco actual (el provider no registra `jsonapi_store_service` / `jsonapi_ripper_service`).

El singleton `Core.me` se queda como default para no tocar cada `Service`, con una salida para tests y para dos APIs en el mismo proceso: el contexto se puede crear aparte del singleton. Hoy las dos líneas pisan un único `Core.me`, y un segundo `TestBed` o un microfrontend se pisan entre sí.

`Service` tiene que registrarse en el constructor, sin `setTimeout`. El timeout existe para «esperar» a que Angular termine de construir el core; en React el primer render puede correr antes del macrotask y `getServiceOrFail` lanza.

### RxJS

Se queda **obligatorio en el core** de esta convergencia. Toda la API pública y todas las apps Angular consumen `Observable` con `async` pipe y, en varios casos, el doble emit caché-luego-red. Duplicar la API en promesas obliga a perder ese emit intermedio o a inventar otro canal.

Para React, un hook hace `subscribe` y publica con `useSyncExternalStore`. `firstValueFrom` alcanza para quien quiera una promesa puntual. Quitar RxJS del core es otro major, después de que el corte de paquetes esté estable: implica un mini-`Subscribable` propio o signals, y reescribir los 155 tests.

`throwError(() => error)` en el mismo cambio que se toque `core.ts`, para no dejar la firma deprecada.

### Empaquetado

- Core compilado con tsup o tsdown, no con ng-packagr. `"type": "module"`, `exports` con `import` y `require`, `types` al lado de cada entry. Target ES2022.
- CJS real. El `main` de 2.8.0 apunta a un UMD que no se publica.
- `sideEffects` solo en el entry que toca el singleton. El entry de `Resource` / helpers no debería marcarse con efectos.
- Peers de `ngx-jsonapi`: `@angular/core`, `@angular/common`, `rxjs`. Fuera `animations`, `forms`, `compiler`, `platform-*` y `router`.
- Dexie solo en el entry de store, peer `^4`. Se deja de aceptar `^2.0.4`.
- Lodash se puede sacar. `cloneDeep` de un recurso JSON:API y un `isEqual` de atributos no justifican el peer. Si se queda, el rango mínimo es `lodash-es@^4.18.1`.
- Subpath exports. Nada de deep imports a `ngx-jsonapi/sources/...`.
- El README que se publica tiene que ser el del repo, no el texto del CLI.

### Angular 20+ y React 19

Angular 20 ya es el piso de 2.7.0 y 2.8.0 declara hasta 21. Lo que el wrapper tiene que respetar:

- `bootstrapApplication` + `provideHttpClient`. `HttpClientModule` no vuelve.
- Zoneless: el `Observable` y el `async` pipe siguen siendo la integración. Mutar `resource.attributes` no notifica a signals. No hace falta Zone.js dentro de la librería; la demo de 2.8 todavía llama `provideZoneChangeDetection()`, eso es de la demo.
- El partial compilation de ng-packagr se queda solo en el wrapper, si el wrapper tiene providers. El core no pasa por el compilador de Angular.
- Angular 22.0.0 salió el 2026-06-03 y el estable al 2026-10-23 es 22.2.3. 2.8.0 no lo declara. El wrapper nuevo tiene que sumar `^22` en el mismo momento en que se verifique el peer, sin esperar al corte de paquetes. Angular 23 no está publicado.

React 19 no tiene nada usable hoy. El snippet de 3.x no es un adaptador. El paquete de hooks tiene que:

- llamar al bootstrap una vez (módulo o provider de la app), nunca en el cuerpo del componente;
- suscribirse en el hook y desuscribirse al unmount;
- usar `resource.id` como `key`, no `trackBy`;
- no abrir IndexedDB en un Server Component. Dexie es de browser. El core de memoria puede correr en el server si el `fetch` tiene URL absoluta y no toca `window`.

## 5. Plan de migración

### Qué línea es la base

**2.8, commit `08a96fa`.** Es el código que está en producción vía npm, el que ya compila con Angular 21, el que tiene el fix de `type` y `getServiceOrUndefined`, y el que habla `HttpClient`.

De 3.0.6 se copian ideas, no la historia git:

- contexto de bootstrap con defaults en memoria;
- `IHttp` como puerto, esta vez inyectado;
- `devMode` como flag, alimentado por `isDevMode()` solo en el wrapper Angular;
- el `trackBy(index, item)` que 2.8 perdió;
- el reemplazo de array en `DocumentCollection.fill`, con test.

No se rebasa 3.x encima de 2.8. Desde el ancestro, 3.x tiene 7 commits y 2.8 tiene 14, y esos 14 son los upgrades de Angular 15–21 más los fixes de tipos. El toolchain de 3.x (TypeScript 3.9, Jest 24, axios 0.21) habría que tirarlo entero.

Tampoco se sigue publicando 3.0.x. Quien tenga instalado `ngx-jsonapi@3` no puede recibir el core nuevo bajo el mismo major sin romper el bootstrap. Conviene `npm deprecate` de `3.0.0-dev`, `3.0.2`–`3.0.6` y de `2.6.1`, apuntando a 2.8 y, cuando exista, a 4.0.

### Fases

El alcance está en archivos y riesgo, no en calendario.

**Fase 0. Poner la casa en orden sobre 2.8.** Alcance chico. Riesgo bajo si no se toca la firma de `get`/`all`/`save`.

- Tratar `2.8` como línea viva. La rama `2.x` no lo es. Tagear `2.8.0` con el commit que ya se publicó.
- README: `provideNgxJsonapiStandalone` + los dos tokens, o mejor incluir los tokens dentro del provider con fakes por default y un flag `store: 'dexie' | 'memory'`.
- Arreglar `save()` para 204 y documento sin `data` (issue #302) **sobre 2.8**. El PR #386 está parado contra `07e0d3b`.
- Restaurar `trackBy(index, resource)` para quien todavía pase el método a `*ngFor`. `@for` no depende de esta firma.
- Test de regresión del vaciado de `DocumentCollection.data` y, si el test demuestra el bug de identidad, portar el `slice` de 3.0.6.
- El bucle `for (let i; ...)` o se borra o se escribe con índice inicializado. Hoy no hace nada en ninguna línea.
- Sacar peers Angular que nadie importa. No cambia el código de las apps.

**Fase 1. Sacar Angular del core, sin cambiar el import `ngx-jsonapi`.** Alcance medio. Riesgo alto de regresión, porque todos los specs arman `new Core(config, http, injector)`.

Archivos de producción a tocar: `core.ts`, `http.service.ts`, `store.service.ts`, `store-fake.service.ts`, `json-ripper.ts`, `json-ripper-fake.ts`, `converter.ts`, `document-collection.ts`, `resource-relationships-converter.ts`, `ngx-jsonapi.provider.ts`, y el alta de `service.ts` (el `setTimeout`). El resto del dominio (`resource.ts`, paths, caché en memoria, relaciones) casi no importa Angular.

El wrapper sigue exportando `provideNgxJsonapiStandalone`, `Service`, `Resource`, `DocumentCollection`, `JsonapiCore`. Una app en 2.8 recompila sin tocar servicios ni templates.

**Fase 2. Adaptadores.** Alcance medio. El de `HttpClient` es el crítico y tiene que pasar los specs actuales de `service.spec.ts` / `get-resource.spec.ts` con `HttpTestingController`. `fetch` se prueba con `Mock` de `globalThis.fetch`. axios queda fuera del camino de Angular.

**Fase 3. Paquetes ESM y CJS.** Alcance medio, concentrado en build. `ngx-jsonapi` depende del core y reexporta. Verificar que una app Angular 20 con `provideHttpClient` y una prueba de `require()` resuelven. Corregir el `main` UMD fantasma antes de prometer CJS.

**Fase 4. React 19.** Alcance medio, paquete nuevo, cero impacto en las apps Angular. Hooks sobre el core de la fase 1. No se promete en el mismo release que el corte interno.

**Fase 5. Fuera de esta convergencia.** API sin RxJS, signals, promesas como contrato principal. Es otro major. Meterlo ahora duplica la superficie y retrasa el único objetivo: una librería que Angular 20 siga usando igual y que React pueda importar sin `@angular/core`.

### Cómo migran las apps Angular 20 de Reyesoft

Hoy, con 2.7 o 2.8, el cambio respecto de un `forRoot` viejo (≤ 2.5) ya es obligatorio y es chico. En `app.config.ts`:

```typescript
bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideNgxJsonapiStandalone({
            url: 'https://api.example/v2/'
        }),
        { provide: JSONAPI_STORE_SERVICE, useClass: StoreService },
        { provide: JSONAPI_RIPPER_SERVICE, useClass: JsonRipper },
        AuthorsService,
        BooksService
    ]
});
```

No se cambia:

- `class AuthorsService extends Service<Author> { public type = 'authors'; public resource = Author; }`
- `authorsService.get(id)` / `.all({ remotefilter, include, page })`
- `resource.save()` / `addRelationship`
- el `async` pipe sobre esos `Observable`
- el interceptor de auth, **mientras el adaptador siga siendo el `HttpClient` de la app**

Eso es incompatible con adoptar 3.0.6: habría que tirar el interceptor o reescribirlo en axios, y el shape de error cambia.

Cuando salga el 4.0 con paquetes partidos, la migración mínima es seguir dependiendo de `ngx-jsonapi` (el wrapper), no del core. El wrapper mantiene `provideNgxJsonapiStandalone` y las clases. Si la fase 0 mete los tokens de store dentro del provider, desaparecen las dos líneas de `provide` y el default pasa a ser memoria, igual que el bootstrap de 3.x. IndexedDB queda opt-in.

`@Autoregister()` se puede dejar de usar cuando se quiera: ya no hace nada.

### Riesgos

| Riesgo | Por qué importa |
| --- | --- |
| Perder `HttpClient` | Las apps cuelgan el token de auth de un interceptor. Un core «agnóstico» que solo hable axios obliga a migrar auth, XSRF y tests de HTTP. El adaptador Angular es parte del producto, no un extra |
| Shape de error | `error.error`, `error.status` y `loadingsOffline` están atados a `HttpErrorResponse`. Hay que normalizar en el borde |
| Singleton `Core.me` | Tests, dos backends, microfrontends. Hace falta un contexto, con el singleton como default |
| `setTimeout(register)` | En Angular suele alcanzar porque el core ya se construyó. En React y en zoneless estricto es una carrera |
| `trackBy` de 2.8 | En `*ngFor`, `trackBy: collection.trackBy` recibe el índice en el primer parámetro y lee `.id` sobre un número. Al extraer el core hay que volver a `(index, item)`. `@for` (`track item.id`) no usa este método |
| `save()` y 204 | Sigue abierto en las dos líneas. Conviene cerrarlo en 2.8 antes de mudarlo de archivo |
| `sideEffects: false` + barrel único | El FESM actual no se parte. El corte en paquetes es lo que de verdad permite que React no descargue `@angular/core` |
| Dexie 2 en el rango de peers | Una app puede resolver `dexie@2.0.4` (2018). El store nuevo debe pedir Dexie 4 |
| SSR | IndexedDB en el server ya se parcheó en 2.1.16 cuando el store estaba apagado. El default en memoria tiene que seguir siendo el camino de SSR |
| Número de versión | Publicar este diseño como 3.1 rompería a quien esté en 3.0.6. 4.0 para el corte de paquetes; 2.9 si el wrapper todavía no cambia imports |
| Rama por defecto | Abrir el trabajo sobre `origin/2.x` es abrirlo sobre Angular 17. La base de implementación es `origin/2.8` |
| PR #386 | Hay que rehacerlo sobre 2.8. Mergearlo a `2.x` no llega a lo que está publicado en npm |

## 6. Seguridad de dependencias

Revisado contra el registro npm y los avisos de GitHub al 2026-10-23. La 2.8.0 **no depende de axios**. El problema de axios es exclusivo de la línea 3.x y del accidente 2.6.1.

### axios

3.0.6 pide peer `axios@^0.21.1`, publicado el 2020-12-22. Ese rango no sale de la serie 0.21. El último 1.x al momento de esta nota es **1.20.0** (2026-08-26).

Avisos que alcanzan a 0.21.1:

| Aviso | Alcance que incluye 0.21.1 | Parche | Efecto |
| --- | --- | --- | --- |
| CVE-2021-3749 | `< 0.21.2` | 0.21.2 | ReDoS. El tope del rango `^0.21.1` sí puede instalar 0.21.2–0.21.4, así que un install fresco mitiga este solo |
| CVE-2023-45857 (GHSA-wf5p-g6vw-rhxx) | `>= 0.8.1, < 0.28.0` y `>= 1.0.0, < 1.6.0` | 0.28.0 y 1.6.0 | CSRF: el header XSRF se reenvía a otro host |
| CVE-2025-27152 (GHSA-jr5f-v2jv-69x6) | `< 0.30.0` y `>=1.0.0 <1.8.2` | 0.30.0 / 1.8.2 | SSRF y fuga de credenciales si un parámetro absoluto pisa `baseURL` |

CVE-2024-39338 afecta axios `>=1.3.2 <=1.7.3`. No aplica a 0.21.1.

El lote del 30 de septiembre de 2026 (DoS de HTTP/2, SSRF por redirects en el adaptador fetch, gadgets de prototype pollution, ReDoS) está parcheado en **1.20.0** para la línea 1.x (`>=1.x <1.20.0` según el aviso; varios también exigen `>=0.34.0` en la línea 0.x). 0.21.1 no entra en esos rangos nuevos porque el código vulnerable se introdujo después, y tampoco puede recibir el parche 1.20.0 por el pin `^0.21.1`.

Conclusión práctica: no hay versión legal de `^0.21.1` que esté al día. Un adaptador axios nuevo se declara `>=1.20.0` y se vuelve a mirar el advisory feed el día que se publique. No se hereda el peer de 3.0.6.

### dexie

- 3.0.6 depende de `dexie@^2.0.4`. 2.0.4 es de mayo de 2018. El caret no llega a 3.x.
- 2.8.0 permite peer `^2.0.4 || ^4.0.0`. El repo de 2.8 desarrolla con `dexie@^4.3.0`, pero una app puede seguir resolviendo 2.0.4.
- CVE-2022-21189 (prototype pollution) se corrigió en Dexie 3.2.2. La serie 2 no lo recibió.
- Dexie 4.4.7 (2026-10-19) es el `latest`. Snyk no le marca avisos directos a esa versión.
- El store nuevo debe pedir `dexie@^4` y dejar de ofrecer `^2.0.4`.

### lodash-es

El código de la librería solo llama `cloneDeep` e `isEqual`. No llama `_.template`, `_.zipObjectDeep`, `_.unset` ni `_.omit`.

| Aviso | Funciones | ¿Lo dispara ngx-jsonapi? |
| --- | --- | --- |
| CVE-2021-23337 | `_.template` | no desde esta librería. El lock de la rama 3.x y el paquete accidental 2.6.1 pinnean 4.17.15, que sí trae el código vulnerable |
| CVE-2020-8203 | `_.zipObjectDeep` | no desde esta librería. También va en 4.17.15; el parche es 4.17.16 |
| CVE-2025-13465 (GHSA-xxjr-mmjv-4gpg) | `_.unset`, `_.omit` | no desde los call sites. El paquete entero sí se instala. Parche de `lodash-es`: 4.17.23 |
| CVE-2026-2950 (GHSA-f23m-r3pf-42rh) | bypass del anterior con paths en array | igual. Parche: **4.18.1** (es el `latest` de `lodash-es` hoy) |

2.8 declara peer `lodash-es@^4.17` y en el repo de desarrollo tiene `^4.17.23`, que sigue por debajo de 4.18.1. 3.0.6 lo declara como dependency `^4.17`: un install nuevo hoy baja 4.18.1; un lock viejo puede seguir en 4.17.15.

El peer range instala el paquete completo en la app aunque la librería no use las funciones afectadas. Sacarlo del core elimina la clase de problema. Si se conserva, el mínimo es `^4.18.1`.

### Otras notas

- **2.6.1** mete como dependencies directas `dexie@2.0.4`, `lodash-es@4.17.15`, `rxjs@^7.8.0` y `tsickle@0.39.1`, y se describe como «Demo app». Quien lo tenga pinneado arrastra esas versiones. 2.6.2 lo corrigió al día siguiente. Conviene deprecarlo.
- **RxJS** no está en los peers de 2.8.0 ni de 3.0.6, y los dos lo importan. Hay que declararlo. `throwError(error)` conviene pasarlo a la forma factoría antes de un RxJS 8.
- **tslib `^2.3.0`** es la única dependency directa de 2.8.0. No arrastra axios.
- El README de 3.x sigue diciendo `yarn add ngx-jsonapi@2.0.0-rc.4`. No describe lo que el paquete 3.0.6 instala.

## Fuentes

- Ramas y tags de `reyesoft/ngx-jsonapi` al 2026-10-23, en particular `origin/2.8` (`08a96fa`), `origin/2.x` (`07e0d3b`), `origin/3.x` (`af62c86`), tag `2.7.0`.
- Registro npm `ngx-jsonapi` (dist-tag `latest` = 2.8.0, metadatos de 2.8.0, 2.6.1, 3.0.6 y 3.0.0-dev) y el listado de los tarballs.
- Changelog de ambas ramas, `docs/migration-v2-to-v3.md` en `origin/3.x`, `demo/main.ts` de `origin/2.8`.
- PR [#326](https://github.com/reyesoft/ngx-jsonapi/pull/326) (FE-272), PR [#386](https://github.com/reyesoft/ngx-jsonapi/pull/386), issue #302.
- Avisos de axios en el GitHub Advisory Database (lote CVE-2026-101898 a CVE-2026-101909, parche 1.20.0; CVE-2025-27152; CVE-2021-3749).
- Avisos de lodash GHSA-xxjr-mmjv-4gpg y GHSA-f23m-r3pf-42rh. Dexie: CVE-2022-21189, `latest` 4.4.7.
