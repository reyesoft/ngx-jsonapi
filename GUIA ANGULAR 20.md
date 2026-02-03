# Guía Completa de Migración: Angular 19 a Angular 20

**Proyecto:** ngx-jsonapi  
**Tipo:** Librería Angular  
**Repositorio:** https://github.com/reyesoft/ngx-jsonapi  
**Versión actual:** 2.6.2 (Angular 19.0.0)  
**Versión objetivo:** 3.0.0 (Angular 20.x)  
**Gestor de paquetes:** Yarn  
**Build tool:** ng-packagr  
**Fecha:** Febrero 2025

---

## 📊 Resumen Ejecutivo

### Nivel de Dificultad: **BAJO** ✅

La migración de Angular 19 a Angular 20 en **ngx-jsonapi** es relativamente simple:

- ✅ **Es una librería**, no una aplicación (menos superficie de cambios)
- ✅ **Pocas dependencias:** Solo lodash-es, dexie, rxjs, tslib (todas compatibles)
- ✅ **Ya usa Jest** (no necesitas migrar desde Karma)
- ✅ **Sin dependencias de UI** (no Angular Material, no CDK en producción)
- ⚠️ **Desafío principal:** Actualizar ng-packagr y peer dependencies
- 🔧 **Esfuerzo técnico:** Bajo - principalmente actualización de Angular core
- ⏱️ **Tiempo estimado:** 4-6 horas de trabajo

### Diferencias clave vs aplicaciones

Como esta es una **librería**:
- No tienes que preocuparte por SSR, routing, lazy loading
- No hay múltiples aplicaciones en monorepo
- El foco está en `peerDependencies` y compatibilidad publicada
- Debes probar la librería construida (`yarn link`) en proyectos consumidores

---

## 🎯 Requisitos Previos Obligatorios

Antes de comenzar, **DEBES** cumplir estos requisitos:

### 1. Node.js ≥ 20.11.1
Angular 20 **NO soporta Node 18**. Actualiza a Node 20 LTS:

```bash
# Verificar versión actual
node --version

# Si usas nvm:
nvm install 20
nvm use 20
```

### 2. TypeScript ≥ 5.8
Tu proyecto usa TypeScript `5.8.2`. Angular 20 recomienda `5.9.x`:

```json
"typescript": "~5.9.0"
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

### **PASO 1: Actualizar Angular Core y CLI**

Ejecuta el comando oficial de migración:

```bash
yarn ng update @angular/cli@20 @angular/core@20
```

**¿Qué hace esto?**
- Actualiza todos los paquetes `@angular/*` a v20
- Aplica schematics automáticos de migración
- Modifica archivos de configuración según cambios de Angular 20

**Posibles problemas:**
- Si falla por conflictos de peer dependencies, revisa manualmente:
  ```bash
  yarn why @angular/core
  ```
- Puedes usar `--force` con precaución si es necesario

---

### **PASO 2: Actualizar ng-packagr**

Como esta es una **librería**, ng-packagr es crítico:

```bash
yarn add -D ng-packagr@^20.0.0
```

**Verificar archivo `projects/ngx-jsonapi-lib/ng-package.json`:**

```json
{
  "$schema": "../../node_modules/ng-packagr/ng-package.schema.json",
  "dest": "../../dist/ngx-jsonapi",
  "lib": {
    "entryFile": "src/public_api.ts"
  }
}
```

✅ Si ya está así, no necesitas cambios.

---

### **PASO 3: Actualizar TypeScript**

```bash
yarn add -D typescript@~5.9.0
```

**Verificar `tsconfig.json` root:**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "lib": ["ES2023", "DOM"],
    "useDefineForClassFields": false,
    // ... resto de opciones
  }
}
```

**Verificar `projects/ngx-jsonapi-lib/tsconfig.lib.json`:**

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true,
    "inlineSources": true,
    "types": []
  },
  "exclude": ["**/*.spec.ts"]
}
```

---

### **PASO 4: Actualizar Zone.js**

```bash
yarn add zone.js@~0.16.0
```

**Verificar que no haya breaking changes:**
- En librerías, Zone.js suele estar en `peerDependencies`, no en `dependencies`
- Angular 20 lo maneja de forma diferente (puede ser opcional en el futuro)

---

### **PASO 5: Actualizar peer dependencies de la librería**

Edita `projects/ngx-jsonapi-lib/package.json`:

**ANTES:**
```json
"peerDependencies": {
  "@angular/common": "18.0.0 || 19.0.0",
  "@angular/core": "18.0.0 || 19.0.0",
  "rxjs": "^7.8.0",
  "tslib": "^2.3.0"
}
```

**DESPUÉS:**
```json
"peerDependencies": {
  "@angular/common": "^18.0.0 || ^19.0.0 || ^20.0.0",
  "@angular/core": "^18.0.0 || ^19.0.0 || ^20.0.0",
  "rxjs": "^7.8.0",
  "tslib": "^2.3.0"
}
```

**Importante:**
- Mantén compatibilidad con Angular 18 y 19 si es posible
- Si hay breaking changes, considera lanzar v3.0.0

---

### **PASO 6: Actualizar Jest y Testing**

Tu proyecto ya usa `jest-preset-angular`. Angular 20 requiere ESM support:

```bash
yarn add -D jest-preset-angular@^16.0.0
```

**Verificar `setup-jest.ts`:**

```typescript
import 'jest-preset-angular/setup-jest';
```

**Verificar `jest.base.config.js`:**

```javascript
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
  },
};
```

⚠️ **Nota:** Jest con ESM puede requerir ajustes en `transformIgnorePatterns`

---

### **PASO 7: Verificar dependencias de producción**

Las dependencias actuales en `projects/ngx-jsonapi-lib/package.json`:

```json
"dependencies": {
  "dexie": "^4.0.11",
  "lodash-es": "^4.17.21",
  "rxjs": "^7.8.0",
  "tsickle": "^0.46.3",
  "tslib": "^2.6.2"
}
```

**Verificar compatibilidad:**
- ✅ **dexie:** Compatible con Angular 20
- ✅ **lodash-es:** No depende de Angular
- ✅ **rxjs:** Ya está en la versión correcta
- ⚠️ **tsickle:** Verifica si ng-packagr 20 aún lo necesita (puede ser obsoleto)

---

### **PASO 8: Construir la librería**

Ejecuta el build de producción:

```bash
yarn build:jsonapi
```

**Comando esperado (desde `package.json`):**
```json
"build:jsonapi": "ng build ngx-jsonapi-lib"
```

**Verificar salida en `dist/ngx-jsonapi/`:**
- `fesm2022/` (ES modules)
- `package.json` (con versión correcta)
- `README.md`
- `*.d.ts` (typings)

**Posibles errores:**
- Errores de TypeScript por tipos más estrictos
- Errores de ng-packagr por configuración obsoleta
- Errores de compilación por cambios en decoradores

---

### **PASO 9: Pruebas unitarias**

Ejecuta todos los tests:

```bash
yarn test
```

**Verificar configuraciones:**
- `jest.lib.config.js` debe extender de `jest.base.config.js`
- Tests en `projects/ngx-jsonapi-lib/src/**/*.spec.ts`

**Errores comunes:**
- Mocks obsoletos por cambios en Angular testing
- `TestBed` con configuración nueva de standalone components
- Imports de módulos que ahora son standalone

---

### **PASO 10: Probar con yarn link**

**CRÍTICO para librerías:** Prueba la librería construida en un proyecto real:

```bash
# En el directorio de ngx-jsonapi
cd dist/ngx-jsonapi
yarn link

# En un proyecto consumidor (ej: tu app demo)
cd /path/to/demo-project
yarn link ngx-jsonapi

# Ejecuta el proyecto consumidor
yarn start
```

**Verificar:**
- La librería se importa correctamente
- No hay errores de tipos TypeScript
- Los servicios y clases funcionan como se espera
- No hay warnings en consola del navegador

---

### **PASO 11: Actualizar versión y publicar**

Si todo funciona, actualiza la versión de la librería:

**En `projects/ngx-jsonapi-lib/package.json`:**

```json
{
  "name": "ngx-jsonapi",
  "version": "3.0.0",
  // ...
}
```

**Cambios a documentar en CHANGELOG.md:**

```markdown
## [3.0.0] - 2025-02-XX

### Breaking Changes
- Soporte para Angular 20.x
- Drop de soporte para Angular 17 y anteriores
- Actualización de peer dependencies

### Dependencies
- Angular 20.x
- TypeScript 5.9.x
- Zone.js 0.16.x
```

**Publicar:**

```bash
yarn release
```

**Verificar que el script `release` sea correcto:**

```json
"release": "yarn build:jsonapi && cd dist/ngx-jsonapi && yarn publish"
```

⚠️ **Nota:** Verifica que el comando `cd dist/ngx-jsonapi` apunte al directorio correcto donde ng-packagr genera el package.json

---

## 🔍 Verificaciones Post-Migración

### Checklist de Validación

- [ ] ✅ Build exitoso: `yarn build:jsonapi`
- [ ] ✅ Tests pasando: `yarn test`
- [ ] ✅ Tipos correctos: Revisar `dist/ngx-jsonapi/*.d.ts`
- [ ] ✅ Package.json de dist correcto
- [ ] ✅ Peer dependencies actualizadas
- [ ] ✅ Probado con `yarn link` en proyecto real
- [ ] ✅ README.md actualizado con requisitos de Angular 20
- [ ] ✅ CHANGELOG.md actualizado
- [ ] ✅ Versión bumpeada a 3.0.0 (o según semantic versioning)

### Testing en Proyectos Reales

Antes de publicar a npm, prueba en:
1. Demo app incluida en el repo (`/demo`)
2. Al menos 1 proyecto consumidor real
3. Verifica en diferentes versiones de Angular (18, 19, 20)

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
- Verifica versión de TypeScript en `package.json`
- Revisa `tsconfig.lib.json` y `tsconfig.lib.prod.json`
- Asegúrate de que `ng-packagr` sea v20.x

### Error: Jest tests failing con ESM

**Causa:** `jest-preset-angular` necesita configuración ESM

**Solución en `jest.base.config.js`:**
```javascript
transformIgnorePatterns: [
  'node_modules/(?!.*\\.mjs$|@angular|rxjs|dexie)'
]
```

### Error: "tsickle is deprecated"

**Causa:** ng-packagr 20 puede no necesitar tsickle

**Solución:**
- Verifica documentación de ng-packagr
- Posiblemente puedes eliminar `tsickle` de dependencies

### Advertencias de peer dependencies en yarn

**Causa:** Proyectos consumidores con Angular <20

**Solución:**
- Mantén ranges amplios: `"^18.0.0 || ^19.0.0 || ^20.0.0"`
- Documenta claramente en README.md

---

## 📚 Recursos Útiles

- [Angular 20 Release Notes](https://angular.dev/reference/releases)
- [Angular Update Guide](https://update.angular.io/)
- [ng-packagr Documentation](https://github.com/ng-packagr/ng-packagr)
- [jest-preset-angular](https://github.com/thymikee/jest-preset-angular)

---

## ⏱️ Estimación de Tiempo

| Tarea | Tiempo estimado |
|-------|----------------|
| Preparación y backup | 15 min |
| Actualización de dependencias | 30 min |
| Ajustes de configuración | 30 min |
| Build y corrección de errores | 1-2 horas |
| Testing y ajustes | 1 hora |
| Pruebas con yarn link | 1 hora |
| Documentación y release | 30 min |
| **TOTAL** | **4-6 horas** |

**Nota:** Esto asume que no hay breaking changes inesperados. Si encuentras problemas con dependencias o tipos, puede extenderse.

---

## 🎉 ¡Listo!

Una vez completados todos los pasos:
1. Publica a npm con `yarn release`
2. Actualiza el README con badge de versión
3. Comunica a usuarios sobre la nueva versión compatible con Angular 20
