

# 🛠 Guía de Migración Angular 17/18 → 19

Este repositorio contiene **3 librerías** y **3 demos** (cada demo para su librería).
Una de las librerías depende de otra, por lo que los cambios deben aplicarse con orden.

**Objetivo:**
- Migrar a **Angular 19**.
- Mantener compatibilidad con **Angular 18**.
- Cortar soporte explícito de **Angular 17** (opcional según validación).
- No hacer cambios de más, solo lo necesario.

---

## 🔹 Tabla de compatibilidad rápida

| Feature / API moderna | Angular 17 | Angular 18 | Angular 19 | Notas |
|------------------------|------------|------------|------------|-------|
| Control Flow `@if`, `@for`, `@switch`, `@defer` | ✅ preview | ✅ estable | ✅ estable | Si estabas en 17.1+, ya funcionaba. |
| `@defer` con `@loading`, `@placeholder`, `@error` | ✅ limitado | ✅ estable | ✅ estable | En 17 parcial, estable desde 18. |
| Inputs modernos `@Input({ required })` | ✅ preview | ✅ estable | ✅ estable | En 17 puede no marcar error en tooling. |
| Standalone Components | ✅ soportado | ✅ estable | ✅ preferido | En 19 es camino único recomendado. |
| Routing `loadComponent` | ✅ soportado | ✅ estable | ✅ estable | En 17 requería flags, 18+ directo. |
| Material con MDC | ✅ (con legacy) | ✅ estable | ✅ único camino | En 19 se eliminan los `mat-legacy-*`. |
| SSR + Hydration | ❌ | ✅ básico | ✅ mejorado (event replay) | Requiere 18+. |
| Zoneless | ❌ | ✅ experimental | ✅ mejorado | Requiere 18+. |
| Tooling DX (hints, warnings) | ❌ | ✅ inicial | ✅ mejorado | No disponible en 17. |

---

## 🔹 Comandos oficiales de Angular

```bash
# Actualizar CLI global
npm uninstall -g @angular/cli
npm install -g @angular/cli@19

# Actualizar CLI + Core en el proyecto
ng update @angular/cli@19 @angular/core@19

# Migrar al nuevo sistema de build
ng update @angular/cli --name use-application-builder

# Migrar Angular Material
ng update @angular/material

# Migrar templates al Control Flow moderno
ng generate @angular/core:control-flow

# Convertir componentes a standalone
ng generate @angular/core:standalone --convertAll
```

---

## Checklist de migración Angular 19 (para Copilot)

1. **NgModules**  
  - Buscar todos los NgModules y convertirlos a la nueva sintaxis recomendada (standalone components/directives/pipes si aplica).

2. **Templates con *ngIf, *ngFor, *ngSwitch**  
  - Buscar todos los templates que usen *ngIf, *ngFor, *ngSwitch y reemplazarlos por la nueva sintaxis de control flow (`@if()`, `@for()`, `@switch()`).

3. **Inputs obligatorios**  
  - Identificar todos los `@Input()` obligatorios y marcarlos como `required`.

4. **Uso de Material legacy**  
  - Buscar cualquier uso de componentes legacy de Angular Material y migrarlos a la versión MDC.

5. **Ejecutar comandos de update**  
  - Ejecutar los comandos de actualización (`ng update @angular/material`, etc.) donde corresponda.

6. **Revisión manual de SSR/Hydration y Zoneless**  
  - Revisar manualmente si tu proyecto usa SSR/Hydration o Zoneless y si es necesario migrar o ajustar algo.

---

### Estrategia recomendada:

1. Aplica el checklist anterior en cada librería y demo del workspace.
2. Para cada punto, revisa y corrige el código fuente.
3. Ejecuta los comandos de actualización donde corresponda.
4. Documenta los cambios y revisa manualmente SSR/Hydration y Zoneless.

---

## 🔹 Checklist detallada

1. package.json
  - Actualizar peerDependencies en cada librería:
    ```json
    "peerDependencies": {
     "@angular/core": ">=18.0.0 <20.0.0",
     "@angular/common": ">=18.0.0 <20.0.0"
    }
    ```
  - Subir devDependencies a Angular 19:
    ```json
    "@angular/core": "^19.0.0",
    "@angular/common": "^19.0.0",
    "@angular/cli": "^19.0.0",
    "typescript": ">=5.5.0 <6.0.0"
    ```
2. angular.json
  - Revisar que cada demo use el builder:
    ```json
    "builder": "@angular-devkit/build-angular:application"
    ```
  - Quitar configuraciones obsoletas de Webpack.
3. Migraciones de templates
  - Reemplazar *ngIf, *ngFor, *ngSwitch por @if, @for, @switch.
  - Usar migración automática:
    ```bash
    ng generate @angular/core:control-flow
    ```
  - Confirmar que @defer con @loading, @placeholder, @error está aplicado en vistas pesadas.
4. Inputs/Outputs modernos
  - Revisar todos los @Input:
    - Agregar `{ required: true }` donde sea obligatorio.
    - Mantener opcionales con valor por defecto.
  - Seguir usando @Output() EventEmitter (signals aún no obligatorios).
5. Standalone Components
  - Confirmar que todos los componentes de librerías están `standalone: true`.
  - Eliminar NgModules residuales.
  - En demos, migrar AppModule → bootstrapApplication.
6. Routing
  - Confirmar uso de loadComponent y Routes[] en lugar de loadChildren con módulos.
  - Asegurar que todos los *.routing.module.ts se migraron a *.routes.ts.
7. Angular Material
  - Migrar todos los componentes mat-legacy-* a MDC.
  - Revisar SCSS: usar m2-define-palette, m2-define-light-theme.
8. SSR e Hydration (opcional)
  - Habilitar hydration en main.ts:
    ```ts
    bootstrapApplication(AppComponent, {
     providers: [
      provideClientHydration(),
     ]
    });
    ```
  - Si quieres compatibilidad con 18: ✅ soportado.
  - Si necesitas compatibilidad con 17: ⚠️ no soportado.
9. Zoneless (opcional)
  - Activar solo si toda la app puede vivir sin zone.js:
    ```ts
    bootstrapApplication(AppComponent, {
     providers: [
      provideExperimentalZonelessChangeDetection(),
     ]
    });
    ```
  - Compatibilidad: 18+ solamente.
10. Testing
  - Revisar configuración de Jest/Karma para Angular 19.
  - Confirmar que los tests corren con standalone y control flow moderno.
11. Versionado
  - Subir major version en cada librería (2.0.0 → 3.0.0).
  - Documentar en el changelog:
    ```markdown
    ## 3.0.0
    - Migración Angular 18 → 19
    - Compatibilidad mantenida: Angular 18 y 19
    - Compatibilidad eliminada: Angular 17
    - Breaking changes: legacy Material eliminado, NgModules eliminados
    ```

---

## Recomendaciones

Si ya aplicaste @if/@for/@switch, standalone y MDC en 17/18 → no necesitas cambios grandes para 19.

Lo único realmente nuevo en 19 que podés considerar:

- Hydration más robusta (solo si hacés SSR).
- Zoneless (solo si tu app no depende de zone.js).
- DX (warnings de imports no usados, hints automáticos).

👉 Si tus librerías son UI y no SSR → el salto a 19 es suave.

---

## Checklist de migración Angular 19 (para Copilot)

1. **NgModules**  
  - Buscar todos los NgModules y convertirlos a la nueva sintaxis recomendada (standalone components/directives/pipes si aplica).

2. **Templates con *ngIf, *ngFor, *ngSwitch**  
  - Buscar todos los templates que usen *ngIf, *ngFor, *ngSwitch y reemplazarlos por la nueva sintaxis de control flow (`@if()`, `@for()`, `@switch()`).

3. **Inputs obligatorios**  
  - Identificar todos los `@Input()` obligatorios y marcarlos como `required`.

4. **Uso de Material legacy**  
  - Buscar cualquier uso de componentes legacy de Angular Material y migrarlos a la versión MDC.

5. **Ejecutar comandos de update**  
  - Ejecutar los comandos de actualización (`ng update @angular/material`, etc.) donde corresponda.

6. **Revisión manual de SSR/Hydration y Zoneless**  
  - Revisar manualmente si tu proyecto usa SSR/Hydration o Zoneless y si es necesario migrar o ajustar algo.

---

### Estrategia recomendada:

1. Aplica el checklist anterior en cada librería y demo del workspace.
2. Para cada punto, revisa y corrige el código fuente.
3. Ejecuta los comandos de actualización donde corresponda.
4. Documenta los cambios y revisa manualmente SSR/Hydration y Zoneless.

---

## 1. Actualiza las dependencias principales

- Actualiza `@angular/core`, `@angular/cli`, `@angular/compiler`, `@angular/common`, etc., a la versión 19 en tu `package.json`.
- Haz lo mismo en la demo y en la librería.
- Ejecuta:
  ```bash
  npx ng update @angular/core@19 @angular/cli@19
  ```
- Si usas otras dependencias de Angular (ej: `@angular/forms`, `@angular/router`), actualízalas también.

**Compatibilidad:**  
- Angular 19 es compatible con Angular 18, pero no con Angular 17. Si usas nuevas APIs de Angular 19, tu código no funcionará en Angular 17.

---

## 2. Revisa breaking changes de Angular 19

- Consulta el changelog oficial:  
  https://github.com/angular/angular/blob/main/CHANGELOG.md
- Verifica si alguna API que usas fue eliminada o modificada.
- Si encuentras cambios incompatibles, considera usar polyfills o condicionales para mantener compatibilidad con Angular 18.

---

## 3. Ajusta TypeScript y RxJS

- Angular 19 puede requerir versiones más recientes de TypeScript y RxJS.
- Actualiza en `package.json`:
  - TypeScript: mínimo la versión recomendada por Angular 19.
  - RxJS: igual o superior a la recomendada.
- Ejecuta:
  ```bash
  npx ng update
  ```

---

## 4. Prueba la librería y la demo en ambos entornos

- Compila y ejecuta los tests en Angular 18 y 19.
- Si distribuyes la librería, usa `peerDependencies` para permitir ambas versiones:
  ```json
  "peerDependencies": {
    "@angular/core": ">=18.0.0 <20.0.0"
  }
  ```
- Si usas features nuevas de Angular 19, documenta que solo estarán disponibles en Angular 19+.

---

## 5. Evita features exclusivas de Angular 19 (si necesitas compatibilidad con 18)

- No uses nuevas APIs, decoradores o sintaxis exclusiva de Angular 19 si necesitas que funcione en Angular 18.
- Si debes usarlas, hazlo de forma opcional o con detección de versión.

---

## 6. Documenta los cambios

- Explica en el README o CHANGELOG:
  - Qué versiones de Angular soportas.
  - Qué features requieren Angular 19.
  - Qué cambios pueden romper compatibilidad con Angular 17.

---

## 7. Prueba de compatibilidad

- Crea un proyecto de ejemplo con Angular 18 y otro con Angular 19 usando tu librería.
- Asegúrate de que ambos funcionen correctamente.

---

## Notas sobre Angular 17

- Si usas features de Angular 18 o 19, tu librería NO será compatible con Angular 17.
- Cambios en el sistema de inyección, signals, o APIs removidas pueden romper compatibilidad con Angular 17.
- Si necesitas compatibilidad con Angular 17, mantente en Angular 18 o usa ramas separadas.

---

> Esta guía te ayudará a actualizar tu librería y demo a Angular 19 sin perder compatibilidad con Angular 18. Si tienes dudas o necesitas automatizar pruebas, ¡avísame!
