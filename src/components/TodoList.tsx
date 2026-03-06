import { Todo } from "@/src/types/todo"
import TodoItem from "./TodoItem"

interface Props {
  todos: Todo[]
  onToggle: (id: number, completed: boolean) => void
  onDelete: (id: number) => void
}

export default function TodoList({ todos, onToggle, onDelete }: Props) {
  return (
    <div className="space-y-4">
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          animationDelay={index * 50}
        />
      ))}
    </div>
  )
}
