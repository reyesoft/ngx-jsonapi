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

Estos son los pasos base con `ng update` documentados por Angular:

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
🔹 Checklist detallada
1. package.json
 Actualizar peerDependencies en cada librería:

json
Copiar código
"peerDependencies": {
  "@angular/core": ">=18.0.0 <20.0.0",
  "@angular/common": ">=18.0.0 <20.0.0"
}
 Subir devDependencies a Angular 19:

json
Copiar código
"@angular/core": "^19.0.0",
"@angular/common": "^19.0.0",
"@angular/cli": "^19.0.0",
"typescript": ">=5.5.0 <6.0.0"
2. angular.json
 Revisar que cada demo use el builder:

json
Copiar código
"builder": "@angular-devkit/build-angular:application"
 Quitar configuraciones obsoletas de Webpack.

3. Migraciones de templates
 Reemplazar *ngIf, *ngFor, *ngSwitch por @if, @for, @switch.
Usar migración automática:

bash
Copiar código
ng generate @angular/core:control-flow
 Confirmar que @defer con @loading, @placeholder, @error está aplicado en vistas pesadas.

4. Inputs/Outputs modernos
 Revisar todos los @Input:

Agregar { required: true } donde sea obligatorio.

Mantener opcionales con valor por defecto.

 Seguir usando @Output() EventEmitter (signals aún no obligatorios).

5. Standalone Components
 Confirmar que todos los componentes de librerías están standalone: true.

 Eliminar NgModules residuales.

 En demos, migrar AppModule → bootstrapApplication.

6. Routing
 Confirmar uso de loadComponent y Routes[] en lugar de loadChildren con módulos.

 Asegurar que todos los *.routing.module.ts se migraron a *.routes.ts.

7. Angular Material
 Migrar todos los componentes mat-legacy-* a MDC.

 Revisar SCSS: usar m2-define-palette, m2-define-light-theme.

8. SSR e Hydration (opcional)
 Habilitar hydration en main.ts:

ts
Copiar código
bootstrapApplication(AppComponent, {
  providers: [
    provideClientHydration(),
  ]
});
 Si quieres compatibilidad con 18: ✅ soportado.

 Si necesitas compatibilidad con 17: ⚠️ no soportado.

9. Zoneless (opcional)
 Activar solo si toda la app puede vivir sin zone.js:

ts
Copiar código
bootstrapApplication(AppComponent, {
  providers: [
    provideExperimentalZonelessChangeDetection(),
  ]
});
 Compatibilidad: 18+ solamente.

10. Testing
 Revisar configuración de Jest/Karma para Angular 19.

 Confirmar que los tests corren con standalone y control flow moderno.

11. Versionado
 Subir major version en cada librería (2.0.0 → 3.0.0).

 Documentar en el changelog:

markdown
Copiar código
## 3.0.0
- Migración Angular 18 → 19
- Compatibilidad mantenida: Angular 18 y 19
- Compatibilidad eliminada: Angular 17
- Breaking changes: legacy Material eliminado, NgModules eliminados
🔹 Recomendaciones
Si ya aplicaste @if/@for/@switch, standalone y MDC en 17/18 → no necesitas cambios grandes para 19.

Lo único realmente nuevo en 19 que podés considerar:

Hydration más robusta (solo si hacés SSR).

Zoneless (solo si tu app no depende de zone.js).

DX (warnings de imports no usados, hints automáticos).

👉 Si tus librerías son UI y no SSR → el salto a 19 es suave.