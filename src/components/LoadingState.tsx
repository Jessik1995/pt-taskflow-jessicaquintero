import { Card } from "@/src/components/ui/Card"

export default function LoadingState() {
  return (
    <div
      className="space-y-3"
      aria-busy="true"
      aria-label="Loading tasks"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Card
          key={i}
          className="flex items-center gap-3 p-4 animate-pulse"
          style={{ animationDelay: `${i * 100}ms` } as React.CSSProperties}
        >
          <div className="h-5 w-5 rounded border border-gray-200 bg-gray-100 shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 max-w-[70%] rounded bg-gray-200" />
            <div className="h-3 max-w-[40%] rounded bg-gray-100" />
          </div>
        </Card>
      ))}
    </div>
  )
}
