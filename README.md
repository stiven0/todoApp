# TodoApp

Aplicación de lista de tareas (To-Do List) construida con **Ionic 8 + Angular 20**, con soporte híbrido móvil vía **Capacitor 8**.

---

## Requisitos previos

| Herramienta | Versión mínima |
|---|---|
| Node.js | 20.x |
| npm | 10.x |
| Angular CLI | 20.x |
| Ionic CLI | 7.x |
| Android Studio | Flamingo o superior |
| Java JDK | 17 |
| Android SDK | API 22+ |

---

## Instalación

```bash
npm install
```

---

## Ejecutar en web (desarrollo)

```bash
npm start
# o
ionic serve
```

---

## Compilar para producción

```bash
npm run build
```

Genera los artefactos en la carpeta `www/`.

---

## Estructura híbrida — Android e iOS

> **Nota sobre Cordova:** El enunciado menciona Cordova, pero esta aplicación usa **Capacitor** como plataforma híbrida. Capacitor es el reemplazo oficial recomendado por el equipo de Ionic para proyectos modernos. Ofrece mejor integración con Angular, mayor rendimiento nativo y soporte activo. Los conceptos y el flujo de trabajo son equivalentes.

---

### Android

#### Preparar plataforma Android

```bash
npm run build
npx cap sync
```

> Si es la primera vez y no existe la carpeta `android/`:
> ```bash
> npm install @capacitor/android
> npx cap add android
> npx cap sync
> ```

#### Abrir en Android Studio

```bash
npx cap open android
```

#### Generar APK de debug

1. En Android Studio: **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
2. El archivo se genera en: `android/app/build/outputs/apk/debug/app-debug.apk`.

#### Generar APK de release (firmado)

1. **Build > Generate Signed Bundle / APK > APK**.
2. Crea o proporciona un keystore existente.
3. Completa alias y contraseñas.
4. Selecciona variante `release`.
5. El APK queda en: `android/app/build/outputs/apk/release/`.

#### Ejecutar en emulador o dispositivo

1. Abre Android Studio y espera que Gradle sincronice.
2. Selecciona un dispositivo/emulador en la barra superior.
3. Presiona **Run ▶** o usa `Shift + F10`.

---

### iOS

> ⚠️ **Requiere macOS con Xcode instalado.**
> No es posible compilar ni generar IPA en Windows o Linux.

#### Preparar plataforma iOS (en macOS)

```bash
npm run build
npm install @capacitor/ios
npx cap add ios
npx cap sync
```

#### Abrir en Xcode

```bash
npx cap open ios
```

#### Generar IPA

1. Xcode: **Product > Archive**.
2. Una vez completado el archivo, clic en **Distribute App**.
3. Selecciona método de distribución (Ad Hoc, App Store, Development).
4. Sigue el asistente y exporta el `.ipa`.

---

## Firebase & Remote Config

La app integra **Firebase Remote Config** para controlar funcionalidades mediante feature flags sin publicar nueva versión.

### Configuración

Las credenciales de Firebase están en `src/environments/environment.ts` y `environment.prod.ts`.

### Feature flag: `enable_dark_mode`

| Valor | Comportamiento |
|---|---|
| `false` | App en modo claro (default) |
| `true`  | App en modo oscuro (clase `ion-palette-dark` aplicada al documento) |

### Cómo demostrar el flag

1. Abre [Firebase Console > Remote Config](https://console.firebase.google.com).
2. Edita el parámetro `enable_dark_mode`.
3. Publica el cambio.
4. Reinicia la app — el tema cambia automáticamente en el siguiente arranque.

### Flujo técnico

1. Al iniciar la app, `AppInitService` llama a `RemoteConfigService.init()`.
2. Se ejecuta `fetchAndActivate()` contra Firebase.
3. Se lee el valor del flag `enable_dark_mode`.
4. Si es `true`, se aplica la clase `ion-palette-dark` al elemento `<html>`.
5. En desarrollo, `minimumFetchIntervalMillis = 0` — el cambio es visible en cada arranque.

---

## Optimización de rendimiento

### Carga inicial

| Técnica | Descripción |
|---|---|
| Componentes standalone | Eliminan NgModules, reducen el bundle inicial |
| Lazy loading de rutas | La página principal se carga bajo demanda |
| Inicialización centralizada | `AppInitService` inicializa storage y Remote Config en paralelo con `Promise.all` |
| `ChangeDetectionStrategy.OnPush` | En todos los componentes, reduce ciclos de detección de cambios |

### Grandes cantidades de tareas

| Técnica | Descripción |
|---|---|
| Virtual Scroll (Angular CDK) | Solo renderiza en DOM los ítems visibles en pantalla |
| `trackBy` | Evita re-renderizar ítems que no cambiaron |
| `computed()` | El filtro de tareas solo recalcula si cambian sus dependencias (señales) |

### Minimización de memoria

| Técnica | Descripción |
|---|---|
| Signals + `toSignal` | Reemplaza suscripciones RxJS manuales, Angular gestiona el ciclo de vida automáticamente |
| `computed()` memoizado | No recalcula si las dependencias no cambiaron |
| Patrón facade (`AppInitService`) | Centraliza inicialización para evitar inicializaciones duplicadas |

---

## Estructura del proyecto

```
src/
  app/
    core/
      services/          # AppInitService, RemoteConfigService
    features/
      todo/
        components/      # TodoItem, TodoForm, TodoFilter, TodoCategoriesManager, TodoCategoriesForm
        models/          # Todo, Category
        pages/todo/      # TodoPage (página principal)
        services/        # TodoService, CategoryService, FormValidationService
  environments/          # Configuración Firebase por entorno
```

---

## Licencia

MIT
