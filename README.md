# TaskFlow — pt-taskflow-jessicaquintero

**Live Demo:** [https://pt-taskflow-jessicaquintero.vercel.app/](https://pt-taskflow-jessicaquintero.vercel.app/)

---

## Instalación

```bash
pnpm install
pnpm dev
```

---

## Scripts disponibles

| Comando       | Descripción                                       |
| ------------- | ------------------------------------------------- |
| `pnpm dev`    | Servidor de desarrollo                            |
| `pnpm build`  | Build de producción (debe pasar sin errores lint) |
| `pnpm start`  | Ejecutar build de producción                      |
| `pnpm lint`   | Ejecutar ESLint                                   |
| `pnpm format` | Ejecutar Prettier                                 |

---

## Estructura del proyecto

| Ruta / Carpeta             | Descripción                                         |
| -------------------------- | --------------------------------------------------- |
| `app/page.tsx`             | Página principal; compone hooks y componentes       |
| `src/hooks/useTodos.ts`    | Lógica de fetching y CRUD (sin UI)                  |
| `src/services/todosApi.ts` | Cliente API para todos de DummyJSON                 |
| `src/types/todo.ts`        | Tipos TypeScript para Todo y respuestas de la API   |
| `src/components/`          | Componentes UI (TodoList, TodoItem, TodoForm, etc.) |

ESLint y Prettier están configurados; `pnpm build` se ejecuta sin errores de lint.

---

## Decisiones técnicas

### Custom Hook para la lógica de datos

Toda la lógica de fetching y CRUD vive en un custom hook (`useTodos`). Así los componentes de UI se centran solo en el render y se mejora la separación de responsabilidades.

### Capa de servicio para llamadas API

Las peticiones a la API están aisladas en `todosApi.ts`. El hook y los componentes quedan independientes de la implementación concreta de la API.

### TypeScript para modelos de API

Todas las respuestas de la API están tipadas con interfaces de TypeScript para garantizar type safety y evitar el uso de `any`.

### Gestión de estado local

La aplicación usa `useState` de React dentro del custom hook para gestionar las tareas. Se evita deliberadamente una librería de estado global (Zustand, Redux, etc.) porque la app tiene una sola página y el estado se consume de forma local.

### Comportamiento de la API DummyJSON

La API de DummyJSON simula operaciones CRUD pero **no persiste** los cambios. Para que la UI sea consistente:

- **Crear:** las tareas creadas se añaden manualmente al estado local.
- **Actualizar:** las tareas actualizadas modifican el estado local tras la respuesta de la API.
- **Eliminar:** las tareas eliminadas se quitan del estado local.

Así la interfaz se mantiene coherente aunque la API no persista datos.

### Calidad de código

ESLint y Prettier están configurados para mantener un estilo de código consistente. El proyecto compila correctamente con:

```bash
pnpm build
```

sin errores de lint.
