import type { FilterType } from "@/src/types/todo"
import { Button } from "@/src/components/ui/Button"
import { cn } from "@/src/lib/utils"

interface Props {
  filter: FilterType
  onFilterChange: (filter: FilterType) => void
}

const filterLabels: Record<FilterType, string> = {
  all: "All",
  completed: "Completed",
  pending: "Pending",
}

export default function Filters({ filter, onFilterChange }: Props) {
  return (
    <div className="flex gap-2 mb-5" role="tablist" aria-label="Filter tasks">
      {(["all", "completed", "pending"] as const).map((f) => (
        <Button
          key={f}
          type="button"
          role="tab"
          aria-selected={filter === f}
          variant="secondary"
          onClick={() => onFilterChange(f)}
          className={cn(
            "border border-gray-300",
            filter === f
              ? "bg-gray-200 text-gray-800"
              : "text-gray-500 hover:text-gray-700 bg-transparent hover:bg-gray-100"
          )}
        >
          {filterLabels[f]}
        </Button>
      ))}
    </div>
  )
}
