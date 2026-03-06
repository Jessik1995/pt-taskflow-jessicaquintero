import { Todo } from "@/src/types/todo"
import { Card } from "@/src/components/ui/Card"
import { Button } from "@/src/components/ui/Button"
import { Badge } from "@/src/components/ui/Badge"
import { cn } from "@/src/lib/utils"

interface Props {
  todo: Todo
  onToggle: (id: number, completed: boolean) => void
  onDelete: (id: number) => void
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <Card className="flex justify-between items-center gap-3 p-4">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id, !todo.completed)}
          className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500 shrink-0 cursor-pointer"
        />
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "font-medium text-gray-800",
              todo.completed && "line-through text-gray-500"
            )}
          >
            {todo.todo}
          </p>
          <p className="text-sm text-gray-400 mt-0.5">Task</p>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <Badge variant={todo.completed ? "completed" : "pending"}>
          {todo.completed ? "Completed" : "Pending"}
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(todo.id)}
          className="gap-1.5 rounded-lg"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </Button>
      </div>
    </Card>
  )
}