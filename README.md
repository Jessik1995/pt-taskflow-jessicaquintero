# TaskFlow — pt-taskflow-jessicaquintero

Task management app that consumes the [DummyJSON](https://dummyjson.com/docs/todos) Todos API. Built with Next.js, React, TypeScript and TailwindCSS.

## Installation

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). No extra steps required.

## Environment variables

Copy `.env.example` to `.env.local` and set:

```env
NEXT_PUBLIC_API_URL=https://dummyjson.com
```

See `.env.example` for the list of variables.

## Scripts

- `pnpm dev` — development server
- `pnpm build` — production build (must pass with zero lint errors)
- `pnpm start` — run production build
- `pnpm lint` — run ESLint
- `pnpm format` — run Prettier

## Technical decisions

### State management

**useState** is used for all client state (todos list, loading, error, page, filter, add feedback). No global store (e.g. Zustand) was added because:

- State is only needed in one page and in the custom hook.
- The flow is simple: fetch → display → mutate via API → update local state.
- Keeping state in a single hook keeps the code easy to follow and test.

### Toggle completed: post-response update

When marking a task completed/pending, the UI is updated **after** the PATCH response succeeds (not optimistically). Reasons:

- The API returns the updated todo; we use that payload to update state, so the UI always matches the server response.
- If the request fails, we don’t have to roll back or show a mismatch.
- For this demo, the extra latency is acceptable and keeps the logic straightforward.

### Reusable components

- **TodoItem** — single task row (checkbox, label, delete).
- **TodoList** — list of `TodoItem`s.
- **TodoForm** — input + submit for adding a task.
- **LoadingState** — skeleton placeholder while tasks load.
- **EmptyState** — message when there are no tasks (or no tasks for the current filter).
- **Filters** — tabs for All / Completed / Pending (local filter only).

### API and local state

DummyJSON does not persist POST/PATCH/DELETE. All mutations are applied only in local state after a successful response, so the list stays consistent with user actions across pagination and filters.

## Project structure

- `app/page.tsx` — main page; composes hooks and components.
- `src/hooks/useTodos.ts` — fetching and CRUD logic (no UI).
- `src/services/todosApi.ts` — API client for DummyJSON todos.
- `src/types/todo.ts` — TypeScript types for Todo and API responses.
- `src/components/` — UI components (TodoList, TodoItem, TodoForm, LoadingState, EmptyState, Filters).

ESLint and Prettier are configured; `pnpm build` runs with zero lint errors.
