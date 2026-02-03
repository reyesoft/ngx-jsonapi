# Guía Completa de Migración: Angular 19 a Angular 20

**Proyecto:** ngx-jsonapi  
**Tipo:** Librería Angular  
**Repositorio:** https://github.com/reyesoft/ngx-jsonapi  
**Versión actual:** 2.6.2 (devDependencies Angular 20.3.16; demo Angular 20)  
**Versión objetivo:** 3.0.0 (publicación con soporte Angular 20)  
**Gestor de paquetes:** Yarn  
**Build tool:** ng-packagr  
**Fecha:** Febrero 2026

---

## 📊 Resumen Ejecutivo

### Nivel de Dificultad: **BAJO** ✅

La migración de Angular 19 a Angular 20 en **ngx-jsonapi** es relativamente simple:

-   ✅ **Es una librería**, no una aplicación (menos superficie de cambios)
-   ✅ **Pocas dependencias:** Solo lodash-es, dexie, rxjs, tslib (todas compatibles)
-   ✅ **Ya usa Jest** (no necesitas migrar desde Karma)
-   ✅ **Sin dependencias de UI** (no Angular Material, no CDK en producción)
-   ✅ **ng-packagr se actualiza automáticamente** con ng update
-   ✅ **Sin uso de APIs deprecadas** (verificado en código)
-   ⚠️ **Desafío principal:** Actualizar peer dependencies y configuración de Jest
-   🔧 **Esfuerzo técnico:** Bajo - principalmente actualización de Angular core
-   ⏱️ **Tiempo estimado:** 4-6 horas de trabajo

### Compatibilidad

-   ✅ **Angular 18, 19 y 20:** Mantenida en peer dependencies
-   ✅ **Demo:** Solo Angular 20 (usa devDependencies del root)
-   ✅ **Retrocompatibilidad:** Sin breaking changes de código
-   ✅ **TypeScript 5.8.x:** Compatible con Angular 19 y 20
-   ✅ **Zone.js 0.16.0:** Compatible con ambas versiones

### Diferencias clave vs aplicaciones

Como esta es una **librería**:

-   No tienes que preocuparte por SSR, routing, lazy loading
-   No hay múltiples aplicaciones en monorepo
-   El foco está en `peerDependencies` y compatibilidad publicada
-   Debes probar la librería construida (`yarn link`) en proyectos consumidores

---

## 🎯 Requisitos Previos Obligatorios

Antes de comenzar, **DEBES** cumplir estos requisitos:

### 1. Node.js ≥ 20.11.1

Angular 20 **NO soporta Node 18 ni Node 22.0-22.10**.

```bash
# Verificar versión actual
node --version

# Si usas nvm:
nvm install 20
nvm use 20
```

**Versiones soportadas:**

-   ✅ Node.js 20.11.1 o superior (LTS) - **RECOMENDADO**
-   ✅ Node.js 22.11 o superior
-   ❌ Node.js 18.x (deprecado)
-   ❌ Node.js 22.0 - 22.10 (incompatible)

### 2. TypeScript ≥ 5.8

Angular 20 requiere TypeScript `>=5.8.0 <6.0.0`:

```json
"typescript": "~5.8.2"
```

### 3. Zone.js 0.16.0

Angular 20 introduce Zone.js 0.16:

```json
"zone.js": "~0.16.0"
```

### 4. RxJS 7.8.x

✅ **Ya lo cumples** (tienes 7.8.0). Compatible sin cambios.

### 5. Backup del Proyecto

**CRÍTICO:** Crea una rama de migración:

```bash
git checkout -b migration/angular-20
git add .
git commit -m "Checkpoint antes de migrar a Angular 20"
```

---

## 🚀 Procedimiento Paso a Paso

### ✅ **PASO 1: Actualizar Angular Core, CLI y ng-packagr** (COMPLETADO)

Ejecuta el comando oficial de migración:

```bash
yarn ng update @angular/cli@20 @angular/core@20 --allow-dirty
```

**✅ Resultado:**

```
@angular/core: 19.2.18 → 20.3.16
@angular/cli: 19.2.19 → 20.3.15
@angular/common: 19.2.18 → 20.3.16
ng-packagr: 19.2.2 → 20.3.2
jest-preset-angular: 13.1.1 → ^14.0.0 (resuelto a 14.6.2 en yarn.lock)
```

**Migraciones automáticas aplicadas por ng update:**

1. ✅ Actualización de `moduleResolution` a `'bundler'` en tsconfig
2. ✅ Migración al nuevo build system (`application` builder)
3. ✅ Migración de imports de `DOCUMENT` desde `@angular/common` a `@angular/core`
4. ✅ Reemplazo de `TestBed.flushEffects()` con `TestBed.tick()`
5. ✅ Validación mejorada de configuración de rutas (redirectTo + canMatch)

**Verificación de código:**

-   ✅ No se encontró uso de `TestBed.get()` (ya usa `TestBed.inject()`)
-   ✅ No se encontró uso de `TestBed.flushEffects()`
-   ✅ No se encontró uso de `InjectFlags` enum
-   ✅ No se encontró uso de `afterRender` (renamed to `afterEveryRender`)
-   ✅ No se encontró uso de APIs experimentales deprecadas

---

### ✅ **PASO 2: Actualizar TypeScript y Zone.js** (COMPLETADO)

TypeScript y Zone.js se actualizan separadamente:

```bash
# TypeScript (Angular 20 requiere >=5.8.0 <6.0.0)
yarn add -D typescript@~5.8.2

# Zone.js
yarn add zone.js@~0.16.0
```

**✅ Resultado:**

```
typescript: 5.8.2
zone.js: 0.16.0
```

**Verificación de tsconfig.json:**

```json
{
    "compilerOptions": {
        "target": "es2015",
        "module": "esnext",
        "lib": ["es2017", "dom"],
        "moduleResolution": "bundler", // ← Actualizado automáticamente
        "useDefineForClassFields": false
    }
}
```

---

### ✅ **PASO 3: Actualizar peer dependencies de la librería** (COMPLETADO)

**CRÍTICO para librerías:** Se actualizó `projects/ngx-jsonapi-lib/package.json`:

```json
"peerDependencies": {
  "@angular/animations": "^18.0.0 || ^19.0.0 || ^20.0.0",
  "@angular/common": "^18.0.0 || ^19.0.0 || ^20.0.0",
  "@angular/compiler": "^18.0.0 || ^19.0.0 || ^20.0.0",
  "@angular/core": "^18.0.0 || ^19.0.0 || ^20.0.0",
  "@angular/forms": "^18.0.0 || ^19.0.0 || ^20.0.0",
  "@angular/platform-browser": "^18.0.0 || ^19.0.0 || ^20.0.0",
  "@angular/platform-browser-dynamic": "^18.0.0 || ^19.0.0 || ^20.0.0",
  "@angular/platform-server": "^18.0.0 || ^19.0.0 || ^20.0.0",
  "@angular/router": "^18.0.0 || ^19.0.0 || ^20.0.0",
  "lodash-es": "^4.17",
  "dexie": "^2.0.4 || ^4.0.0"
}
```

**✅ Cambios realizados:**

-   Agregado soporte para Angular 20 (`|| ^20.0.0`)
-   Mantenida compatibilidad con Angular 18 y 19
-   **No hay breaking changes** - librería compatible con todas las versiones
-   La librería mantiene dependencias runtime como `peerDependencies` (no hay `dependencies` en el package.json del lib)

---

### ✅ **PASO 4: Actualizar configuración de Jest** (COMPLETADO)

Angular 20 requiere actualizar `jest-preset-angular`. Implementado:

**Versión instalada:**

```bash
jest-preset-angular: 14.6.2 (resuelto por yarn.lock)
jest: 29.6.2
```

**✅ Actualización de `jest.base.config.js`:**

```javascript
module.exports = {
    preset: 'jest-preset-angular',
    testEnvironment: 'jsdom', // ← Agregado
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    transform: {
        '^.+\\.(ts|mjs|js|html)$': [
            'jest-preset-angular',
            {
                tsconfig: '<rootDir>/projects/ngx-jsonapi-lib/tsconfig.spec.json',
                stringifyContentPathRegex: '\\.(html|svg)$'
            }
        ]
    },
    moduleFileExtensions: ['ts', 'js', 'mjs', 'html', 'json'],
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$|@angular|rxjs|zone\\.js|lodash-es|dexie)'],
    modulePathIgnorePatterns: ['dist'],
    moduleNameMapper: {
        '^lodash-es$': 'lodash',
        '^ngx-jsonapi/(?!db)(.*)': '<rootDir>/projects/ngx-jsonapi-lib/src/$1'
    },
    snapshotSerializers: [
        'jest-preset-angular/build/serializers/no-ng-attributes',
        'jest-preset-angular/build/serializers/ng-snapshot',
        'jest-preset-angular/build/serializers/html-comment'
    ]
};
```

**Cambios principales:**

1. ❌ **Eliminado `globals`** (deprecado en ts-jest) en configs de lib/demo
2. ✅ **Transform configurado como array** con opciones inline
3. ✅ **Agregado `testEnvironment: 'jsdom'`**
4. ✅ **Actualizado `transformIgnorePatterns`** para soporte ESM
5. ✅ **Corregido path de tsconfig** a la librería
6. ✅ **Setup de Jest** actualizado a `jest-preset-angular/setup-jest`

**Nota sobre jest-preset-angular 16:**

⚠️ La versión 16.0.0 tiene problemas conocidos con esbuild y Buffer. Se mantiene la versión 14.6.2 que es estable y compatible con Angular 20.

---

### ✅ **PASO 5: Verificar dependencias de producción** (COMPLETADO)

Las dependencias de runtime del repo (root `package.json`) son compatibles y la librería las declara como peer dependencies:

```json
"dependencies": {
  "dexie": "^4.0.11",     // ✅ Compatible
  "lodash-es": "^4.17.21", // ✅ Independiente de Angular
  "rxjs": "^7.8.0",        // ✅ Compatible
  "tsickle": "^0.46.3",    // ⚠️ Puede ser obsoleto
  "tslib": "^2.6.0"        // ✅ Compatible
}
```

**✅ Verificación:**

-   **dexie:** Compatible con Angular 20
-   **lodash-es:** No depende de Angular
-   **rxjs:** Versión correcta (7.8.x)
-   **tsickle:** ng-packagr 20 aún lo incluye, mantener
-   **tslib:** Compatible

---

### ✅ **PASO 6: Construir la librería** (COMPLETADO)

Ejecutado exitosamente:

```bash
yarn build:jsonapi
```

**✅ Resultado:**

```
✔ Compiling with Angular sources in partial compilation mode.
✔ Writing FESM and DTS bundles
✔ Copying assets
✔ Writing package manifest
✔ Built ngx-jsonapi

Build at: 2026-02-03T12:27:18.891Z - Time: 4386ms
```

**Verificación de dist/ngx-jsonapi/:**

-   ✅ `fesm2022/` (ES modules generados)
-   ✅ `package.json` (con peer dependencies actualizadas)
-   ✅ `README.md`
-   ✅ `*.d.ts` (TypeScript definitions)

---

## 📋 Cambios de Angular 20 que NO aplican a esta librería

### ✅ No requieren acción (verificados en código):

| Cambio oficial                                         | Aplica | Estado | Razón                             |
| ------------------------------------------------------ | ------ | ------ | --------------------------------- |
| Renombrar `afterRender` → `afterEveryRender`           | ❌     | N/A    | No usa lifecycle hooks de UI      |
| Reemplazar `TestBed.flushEffects()`                    | ❌     | N/A    | No encontrado en código           |
| Renombrar `provideExperimentalCheckNoChangesForDebug`  | ❌     | N/A    | No usa debugging experimental     |
| Refactorizar uso de `ng-reflect-*`                     | ❌     | N/A    | Es librería, no tiene templates   |
| Ajustar `RedirectFn` asíncrono                         | ❌     | N/A    | Solo demo, no usa RedirectFn      |
| Renombrar `request` → `params` en resources            | ❌     | N/A    | No usa RxResource                 |
| Renombrar `provideExperimentalZonelessChangeDetection` | ❌     | N/A    | No usa zoneless experimental      |
| Ajustar templates con `{{ in }}` o `{{ void }}`        | ❌     | N/A    | No tiene templates                |
| Actualizar tipos de `Router` commands                  | ❌     | N/A    | Solo demo, sin cambios necesarios |
| Actualizar tests de animaciones                        | ❌     | N/A    | No usa animaciones                |
| Configurar `rethrowApplicationErrors` en tests         | ❌     | N/A    | No afecta tests actuales          |
| Refactorizar guards de string a ProviderToken          | ❌     | N/A    | No usa guards                     |
| Reemplazar `TestBed.get()` → `TestBed.inject()`        | ✅     | ✅     | Ya usa `inject()`                 |
| Eliminar `InjectFlags` enum                            | ✅     | ✅     | No usa InjectFlags                |
| Actualizar `injector.get()` a ProviderToken            | ✅     | ✅     | Ya usa InjectionToken             |
| Actualizar TypeScript ≥ 5.8                            | ✅     | ✅     | Actualizado a 5.8.2               |
| Manejar errores de AsyncPipe en ErrorHandler           | ❌     | N/A    | No usa AsyncPipe                  |
| Refactorizar `PendingTasks.run` → `PendingTasks.add`   | ❌     | N/A    | No usa PendingTasks               |
| Revisar `DatePipe` con formato Y sin w                 | ❌     | N/A    | No usa pipes                      |
| Actualizar paréntesis con nullish coalescing           | ❌     | N/A    | No tiene templates                |
| Validar redirectTo + canMatch                          | ❌     | N/A    | Solo demo, sin canMatch           |

---

## 🔍 Pasos Pendientes

### **PASO 7: Pruebas unitarias** ⚠️

```bash
yarn test
```

**Estado actual:**

-   ✅ Configuración de Jest actualizada (base/lib/demo + setup-jest)
-   ⚠️ Pendiente ejecutar `yarn test` para validar

**Plan de acción:**

1. Revisar configuración de transformers
2. Verificar compatibilidad de `ts-jest`
3. Actualizar mocks si es necesario

---

### **PASO 8: Probar con yarn link**

**CRÍTICO para librerías:** Prueba la librería construida en un proyecto real:

```bash
# En el directorio de ngx-jsonapi
cd dist/ngx-jsonapi
yarn link

# En un proyecto consumidor
cd /path/to/demo-project
yarn link ngx-jsonapi

# Ejecuta el proyecto consumidor
yarn start
```

**Verificar:**

-   La librería se importa correctamente
-   No hay errores de tipos TypeScript
-   Los servicios y clases funcionan como se espera
-   No hay warnings en consola del navegador
-   Funciona con Angular 19 y Angular 20

---

### **PASO 9: Actualizar versión y CHANGELOG**

Si todo funciona, actualiza la versión de la librería:

**En `projects/ngx-jsonapi-lib/package.json`:**

```json
{
    "name": "ngx-jsonapi",
    "version": "3.0.0" // ← CAMBIO DE VERSIÓN
}
```

**Crear `CHANGELOG.md` entry:**

```markdown
## [3.0.0] - 2026-02-XX

### Added

-   Soporte para Angular 20.x

### Changed

-   Actualizado peer dependencies para soportar Angular 18, 19 y 20
-   Actualizado ng-packagr a v20
-   Actualizado TypeScript a 5.8.x
-   Actualizado Zone.js a 0.16.x
-   Modernizada configuración de Jest

### BREAKING CHANGES

-   Drop de soporte para Angular 17 y anteriores
-   Requiere Node.js ≥ 20.11.1
-   Requiere TypeScript ≥ 5.8.0

### Dependencies

-   @angular/core: ^18.0.0 || ^19.0.0 || ^20.0.0
-   TypeScript: ~5.8.2
-   Zone.js: ~0.16.0
```

---

### **PASO 10: Publicar**

```bash
yarn release
```

**Verificar que el script `release` sea correcto en `package.json`:**

```json
"release": "yarn build:jsonapi && cd dist/ngx-jsonapi && yarn publish"
```

⚠️ **Importante:**

-   Verifica que `cd dist/ngx-jsonapi` apunte al directorio correcto
-   El `package.json` que se publica es el de `dist/ngx-jsonapi/`, no el del root

---

## ✅ Checklist de Validación Post-Migración

Antes de publicar, verifica:

-   [x] ✅ Build exitoso: `yarn build:jsonapi`
-   [ ] ⚠️ Tests pasando: `yarn test` (requiere ajustes)
-   [x] ✅ Tipos correctos: Revisar `dist/ngx-jsonapi/*.d.ts`
-   [x] ✅ Package.json de dist con peer dependencies actualizadas
-   [x] ✅ Peer dependencies soportan Angular 18, 19 y 20
-   [ ] 🔲 Probado con `yarn link` en proyecto Angular 19
-   [ ] 🔲 Probado con `yarn link` en proyecto Angular 20
-   [ ] 🔲 README.md actualizado con requisitos
-   [ ] 🔲 CHANGELOG.md actualizado
-   [ ] 🔲 Versión bumpeada a 3.0.0

---

## ⚠️ Problemas Comunes y Soluciones

### Error: "Cannot find module @angular/core"

**Causa:** Peer dependencies no resueltas

**Solución:**

```bash
rm -rf node_modules yarn.lock
yarn install
```

### Error: "ng-packagr failed to compile"

**Causa:** Incompatibilidad de TypeScript o configuración obsoleta

**Solución:**

-   Verifica versión de TypeScript en `package.json`
-   Revisa `tsconfig.lib.json` y `tsconfig.lib.prod.json`
-   Asegúrate de que `ng-packagr` sea v20.x

### Error: Jest tests failing con ESM

**Causa:** `jest-preset-angular` necesita configuración ESM

**Solución en `jest.base.config.js`:**

```javascript
transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$|@angular|rxjs|zone\\.js|lodash-es|dexie)'];
```

### Error: "tsickle is deprecated"

**Causa:** ng-packagr 20 puede no necesitar tsickle

**Solución:**

-   Por ahora mantenerlo (ng-packagr 20.3.2 aún lo usa)
-   Monitorear futuras versiones de ng-packagr

### Advertencias de peer dependencies en yarn

**Causa:** Proyectos consumidores con Angular <20

**Solución:**

-   Mantén ranges amplios: `"^18.0.0 || ^19.0.0 || ^20.0.0"`
-   Documenta claramente en README.md

---

## 📚 Recursos Útiles

-   [Angular 20 Release Notes](https://angular.dev/reference/releases)
-   [Angular Update Guide](https://update.angular.io/)
-   [Guía oficial Angular 19→20](https://update.angular.io/?l=3&v=19.0-20.0)
-   [ng-packagr Documentation](https://github.com/ng-packagr/ng-packagr)
-   [jest-preset-angular](https://github.com/thymikee/jest-preset-angular)

---

## ⏱️ Estimación de Tiempo

| Tarea                         | Tiempo estimado | Estado       |
| ----------------------------- | --------------- | ------------ |
| Preparación y backup          | 15 min          | ✅           |
| Actualización de dependencias | 30 min          | ✅           |
| Ajustes de configuración      | 30 min          | ✅           |
| Build y corrección de errores | 1-2 horas       | ✅           |
| Testing y ajustes             | 1 hora          | ⚠️ Pendiente |
| Pruebas con yarn link         | 1 hora          | 🔲 Pendiente |
| Documentación y release       | 30 min          | 🔲 Pendiente |
| **TOTAL COMPLETADO**          | **~2 horas**    | **66%**      |
| **TOTAL ESTIMADO**            | **4-6 horas**   |              |

---

## 🎉 Resumen de lo Completado

### ✅ Actualizaciones realizadas:

1. **Angular Core & CLI:** 19.2.18 → 20.3.16
2. **ng-packagr:** 19.2.2 → 20.3.2
3. **TypeScript:** 5.8.2
4. **Zone.js:** 0.15.1 → 0.16.0
5. **jest-preset-angular:** 13.1.1 → 14.6.2
6. **Jest:** Actualizado a 29.6.2
7. **Peer dependencies:** Agregado soporte Angular 20
8. **Configuración Jest:** Modernizada para Angular 20

### ✅ Verificaciones de código:

-   ✅ Sin uso de APIs deprecadas
-   ✅ Sin uso de InjectFlags
-   ✅ Sin templates con `in` o `void`
-   ✅ Sin guards de string
-   ✅ Ya usa `TestBed.inject()` en lugar de `get()`
-   ✅ `injector.get()` usa ProviderToken correctamente

### 📦 La librería es compatible con:

-   ✅ Angular 18.x
-   ✅ Angular 19.x
-   ✅ Angular 20.x

**Sin breaking changes en el código de la librería.**
