# Migraciones recomendadas de Angular 15 a 16/17

A continuación se listan las 7 características que no estaban disponibles en Angular 15 pero sí en Angular 16 y 17. Para cada una se incluye una explicación detallada, ejemplos y, si corresponde, el comando recomendado para migrar o implementar la feature.

| Feature/Propiedad/Uso                | Explicación breve                                                                 | Comando de migración o implementación                  |
|--------------------------------------|----------------------------------------------------------------------------------|--------------------------------------------------------|
| Standalone Components                | Permite crear componentes sin necesidad de NgModules. Simplifica la estructura y facilita la reutilización. Los imports de otros componentes, pipes y directivas se hacen directamente en el decorador. | `ng generate component MiComponente --standalone`      |
| Signals                              | Nuevo sistema reactivo para gestionar el estado y reactividad. Permite crear variables reactivas que actualizan la vista automáticamente cuando cambian. | [Ver guía oficial](https://angular.dev/reference/signals) |
| DestroyRef                           | API para gestionar la destrucción de instancias y recursos, útil para limpiar suscripciones, timers, etc. | [Ver ejemplo](https://angular.dev/reference/DestroyRef) |
| Functional Guards                    | Guards como funciones, más simples y directos, reducen el código y mejoran la legibilidad. | [Ver ejemplo](https://angular.dev/reference/guards)     |
| Input Required/Optional              | Inputs pueden ser requeridos u opcionales con decoradores, mejorando la claridad de la API de componentes. | [Ver ejemplo](https://angular.dev/reference/Input)      |
| Route Tree API                       | Nueva API para manipular rutas como árbol, más flexible y programática. Permite acceder y modificar rutas hijas, padres, etc. | [Ver ejemplo](https://angular.dev/reference/RouteTree)  |
| Environment Injector                 | Inyección de dependencias a nivel de entorno, más granular y flexible. Facilita la configuración y el acceso a servicios globales. | [Ver ejemplo](https://angular.dev/reference/EnvironmentInjector) |

---

## Ejemplos y explicación detallada

### 1. Standalone Components
Permiten crear componentes, directivas y pipes sin necesidad de declararlos en un NgModule.
```bash
ng generate component MiComponente --standalone
```
```typescript
@Component({
  selector: 'app-mi-componente',
  standalone: true,
  imports: [CommonModule]
})
export class MiComponente {}
```

### 2. Signals
Sistema reactivo para gestionar el estado y la reactividad.
```typescript
import { signal } from '@angular/core';
const contador = signal(0);
contador.update(v => v + 1);
```
Más info: [Guía oficial](https://angular.dev/reference/signals)

### 3. DestroyRef
Ejecuta lógica cuando un componente/directiva se destruye, sin necesidad de implementar OnDestroy.
```typescript
import { inject, DestroyRef } from '@angular/core';
const destroyRef = inject(DestroyRef);
destroyRef.onDestroy(() => { /* cleanup */ });
```

### 4. Functional Guards
Guards de rutas como funciones simples.
```typescript
export const canActivate: CanActivateFn = (route, state) => {
  return true; // o lógica de autorización
};
```

### 5. Input Required/Optional
Inputs requeridos u opcionales usando decoradores.
```typescript
@Input({ required: true }) usuarioId!: string;
@Input() nombre?: string;
```

### 6. Route Tree API
Manipulación flexible y programática del árbol de rutas.
```typescript
import { inject, RouteTree } from '@angular/router';
const routeTree = inject(RouteTree);
const currentRoute = routeTree.root;
```

### 7. Environment Injector
Inyección de dependencias a nivel de entorno.
```typescript
import { inject, EnvironmentInjector } from '@angular/core';
const envInjector = inject(EnvironmentInjector);
```

---

**Notas:**
- Para cada feature, revisa la documentación oficial para detalles y ejemplos.
- Si alguna migración requiere modificar imports, decoradores o estructura, sigue las guías recomendadas.
- Puedes ir marcando cada feature a medida que la implementes.
