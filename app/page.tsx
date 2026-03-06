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
    addFeedback
  } = useTodos()

  const limit = 10
  const hasNext = (page + 1) * limit < total
  const hasPrev = page > 0

  const totalPages = Math.max(1, Math.ceil(total / limit))

  return (
    <main className="mx-auto p-10 md:p-40 min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-teal-50">
      <section className="w-full bg-white/60 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl overflow-hidden transition-all duration-300 p-8 pb-6">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <Image src="/orquestia-logo.jpg" alt="TaskFlow" width={55} height={55} />
          <h1 className="text-3xl font-bold text-gray-800">TaskFlow</h1>
        </div>
      </header>

      <TodoForm onCreate={addTodo} />

      {addFeedback && (
        <p
          role="status"
          className={cn(
            "mb-4 text-sm",
            addFeedback.type === "success" ? "text-green-600" : "text-red-600"
          )}
        >
          {addFeedback.message}
        </p>
      )}

      <Filters filter={filter} onFilterChange={setFilter} />

      {error && (
        <Card className="mb-4 p-4 rounded-lg bg-red-50 text-red-800" role="alert">
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

          <div className="flex gap-3 mt-6 items-center justify-center">
            <Button
              variant="secondary"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={!hasPrev}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
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
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </>
      )}
      </section>
    </main>
  )
}
