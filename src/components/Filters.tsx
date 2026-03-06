import type { FilterType } from "@/src/types/todo"
import { Button } from "@/src/components/ui/Button"
import { cn } from "@/src/lib/utils"

interface Props {
  filter: FilterType
  onFilterChange: (filter: FilterType) => void
}

const filterLabels: Record<FilterType, string> = {
  all: "all",
  completed: "completed",
  pending: "pending",
}

export default function Filters({ filter, onFilterChange }: Props) {
  return (
    <div
      className="flex gap-2 mb-5 bg-slate-200/50 p-1.5 rounded-2xl md:w-fit w-full justify-between md:justify-start transition-all duration-300"
      role="tablist"
      aria-label="Filter tasks"
    >
      {(["all", "completed", "pending"] as const).map((f) => (
        <Button
          key={f}
          type="button"
          role="tab"
          aria-selected={filter === f}
          variant="secondary"
          onClick={() => onFilterChange(f)}
          className={cn(
            "md:px-6 px-4 md:py-2 py-1 rounded-xl font-medium text-sm transition-all duration-300 bg-transparent active:scale-[0.98]",
            filter === f
              ? "bg-white text-primary transform scale-100"
              : "text-primary hover:text-primary-hover hover:bg-white/40"
          )}
        >
          {filterLabels[f]}
        </Button>
      ))}
    </div>
  )
}
