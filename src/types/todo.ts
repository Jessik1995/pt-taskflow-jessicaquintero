export interface Todo {
    id: number
    todo: string
    completed: boolean
    userId: number
  }
  
export interface TodosResponse {
  todos: Todo[]
  total: number
  skip: number
  limit: number
}

export interface DeleteTodoResponse extends Todo {
  isDeleted?: boolean
  deletedOn?: string
}

export type FilterType = "all" | "completed" | "pending"