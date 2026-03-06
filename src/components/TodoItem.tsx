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
    <Card
      className={cn(
        "flex justify-between items-center gap-3 p-4 transition-all duration-300",
        todo.completed && "opacity-75"
      )}
    >
      <div className="flex items-normal gap-3 flex-1 w-full">
        <button
          type="button"
          onClick={() => onToggle(todo.id, !todo.completed)}
          aria-pressed={todo.completed}
          aria-label={
            todo.completed ? "Marcar como pendiente" : "Marcar como completada"
          }
          className={cn(
            "w-6 h-6 rounded-full border-2 shrink-0 cursor-pointer flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
            todo.completed
              ? "border-primary bg-primary"
              : "border-primary bg-white"
          )}
        >
          {todo.completed && (
            <svg
              className="w-3.5 h-3.5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "md:text-lg text-base font-medium transition-all duration-300",
              todo.completed
                ? "line-through text-slate-400 opacity-70"
                : "text-slate-800"
            )}
          >
            {todo.todo}
          </p>
          <p
            className={cn(
              "md:text-sm text-xs mt-0.5 transition-all duration-300",
              todo.completed ? "text-gray-400 opacity-70" : "text-gray-500"
            )}
          >
            TAREA
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0 md:w-auto w-full md:justify-start justify-end">
        <Badge variant={todo.completed ? "completed" : "pending"}>
          {todo.completed ? "Completed" : "Pending"}
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(todo.id)}
          className="gap-1.5 rounded-lg"
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete
        </Button>
      </div>
    </Card>
  )
}
