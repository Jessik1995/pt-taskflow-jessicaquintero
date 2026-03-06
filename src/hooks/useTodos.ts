"use client"

import { useEffect, useState, useCallback } from "react"
import { Todo } from "../types/todo"
import type { FilterType } from "../types/todo"
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../services/todosApi"

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(0)
  const [filter, setFilter] = useState<FilterType>("all")
  const [addFeedback, setAddFeedback] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getTodos(page * 10)
      setTodos(data.todos)
      setTotal(data.total)
    } catch {
      setError("Failed to load tasks. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  const filteredTodos =
    filter === "all"
      ? todos
      : filter === "completed"
        ? todos.filter((t) => t.completed)
        : todos.filter((t) => !t.completed)

  const addTodo = async (text: string) => {
    try {
      setAddFeedback(null)
      const newTodo = await createTodo(text)
      setTodos((prev) => [newTodo, ...prev])
      setAddFeedback({ type: "success", message: "Task added." })
      setTimeout(() => setAddFeedback(null), 3000)
    } catch {
      setAddFeedback({ type: "error", message: "Could not add task." })
    }
  }

  const toggleTodo = async (id: number, completed: boolean) => {
    try {
      const updated = await updateTodo(id, completed)
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, ...updated } : todo))
      )
    } catch {
      setAddFeedback({ type: "error", message: "Could not update task." })
      setTimeout(() => setAddFeedback(null), 3000)
    }
  }

  const removeTodo = async (id: number) => {
    const confirmDelete = window.confirm("Delete this task?")

    if (!confirmDelete) return

    try {
      await deleteTodo(id)
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
    } catch {
      setAddFeedback({ type: "error", message: "Could not delete task." })
      setTimeout(() => setAddFeedback(null), 3000)
    }
  }

  return {
    todos: filteredTodos,
    loading,
    error,
    retry: fetchTodos,
    page,
    setPage,
    total,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    removeTodo,
    addFeedback,
  }
}
