import { Card } from "@/src/components/ui/Card"

interface Props {
  message?: string
}

export default function EmptyState({ message = "No tasks to show." }: Props) {
  return (
    <Card className="text-center py-10 text-gray-500" role="status">
      {message}
    </Card>
  )
}
