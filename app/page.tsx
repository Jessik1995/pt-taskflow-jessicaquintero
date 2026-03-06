"use client"

import TodoList from "@/src/components/TodoList"
import TodoForm from "@/src/components/TodoForm"
import LoadingState from "@/src/components/LoadingState"
import EmptyState from "@/src/components/EmptyState"
import Filters from "@/src/components/Filters"
import { useTodos } from "@/src/hooks/useTodos"
import { Button } from "@/src/components/ui/Button"
import { Card } from "@/src/components/ui/Card"
import { cn } from "@/src/lib/utils"
import Image from "next/image"

export default function Home() {
  const {
    todos,
    loading,
    error,
    retry,
    page,
    setPage,
    total,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    removeTodo,
    addFeedback,
  } = useTodos()

  const limit = 10
  const hasNext = (page + 1) * limit < total
  const hasPrev = page > 0

  const totalPages = Math.max(1, Math.ceil(total / limit))

  return (
    <main className="mx-auto p-4 md:p-40 md:py-20 min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-teal-50">
      <section className="w-full bg-white/60 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl overflow-hidden transition-all duration-300 md:p-8 p-4 pb-6 animate-slide-up">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="bg-gradient-to-tr from-primary to-primary-hover md:p-3 p-2 md:rounded-2xl rounded-md shadow-lg shadow-indigo-200 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-list-todo md:w-6 md:h-6 w-4 h-4"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="6" height="6" rx="1"></rect>
                <path d="m3 17 2 2 4-4"></path>
                <path d="M13 6h8"></path>
                <path d="M13 12h8"></path>
                <path d="M13 18h8"></path>
              </svg>
            </div>
            <h1 className="md:text-3xl text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-hover">
              TaskFlow
            </h1>
          </div>
        </header>

        <TodoForm onCreate={addTodo} />

        {addFeedback && (
          <div className="animate-fade-in mb-4">
            <p
              role="status"
              className={cn(
                "text-sm",
                addFeedback.type === "success" ? "text-green-600" : "text-red-600"
              )}
            >
              {addFeedback.message}
            </p>
          </div>
        )}

        <Filters filter={filter} onFilterChange={setFilter} />

        {error && (
          <Card
            className="mb-4 p-4 rounded-lg bg-red-50 text-red-800"
            role="alert"
          >
            <p className="mb-2">{error}</p>
            <Button variant="danger" size="sm" onClick={retry}>
              Retry
            </Button>
          </Card>
        )}

        {loading && <LoadingState />}

        {!loading && !error && (
          <>
            {todos.length === 0 ? (
              <EmptyState
                message={
                  filter === "all"
                    ? "No tasks yet. Add one above."
                    : `No ${filter} tasks.`
                }
              />
            ) : (
              <TodoList
                todos={todos}
                onToggle={toggleTodo}
                onDelete={removeTodo}
              />
            )}

            <div className="flex gap-3 mt-6 items-center justify-center animate-fade-in">
              <Button
                variant="secondary"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={!hasPrev}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Prev
              </Button>
              <span className="text-sm text-gray-600">
                Page {page + 1} of {totalPages}
              </span>
              <Button
                variant="secondary"
                onClick={() => setPage((p) => p + 1)}
                disabled={!hasNext}
              >
                Next
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Button>
            </div>
          </>
        )}
      </section>
    </main>
  )
}
