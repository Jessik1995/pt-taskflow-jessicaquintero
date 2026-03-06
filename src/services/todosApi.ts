import { Todo, TodosResponse, DeleteTodoResponse } from "../types/todo"

const API = process.env.NEXT_PUBLIC_API_URL

export async function getTodos(skip: number = 0): Promise<TodosResponse> {
  const res = await fetch(`${API}/todos?limit=10&skip=${skip}`)

  if (!res.ok) {
    throw new Error("Failed to fetch todos")
  }

  return res.json()
}

export async function createTodo(todo: string): Promise<Todo> {
  const res = await fetch(`${API}/todos/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      todo,
      completed: false,
      userId: 1
    })
  })

  if (!res.ok) {
    throw new Error("Failed to create todo")
  }

  return res.json()
}

export async function updateTodo(id: number, completed: boolean): Promise<Todo> {
  const res = await fetch(`${API}/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ completed })
  })

  if (!res.ok) {
    throw new Error("Failed to update todo")
  }

  return res.json()
}

export async function deleteTodo(id: number): Promise<DeleteTodoResponse> {
  const res = await fetch(`${API}/todos/${id}`, {
    method: "DELETE"
  })

  if (!res.ok) {
    throw new Error("Failed to delete todo")
  }

  return res.json()
}