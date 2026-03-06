"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/Button"

interface Props {
  onCreate: (text: string) => void | Promise<void>
}

export default function TodoForm({ onCreate }: Props) {
  const [text, setText] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!text.trim()) return

    await onCreate(text)
    setText("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-5">
      <div className="flex-1 relative flex items-center">
        <span className="absolute left-3 text-gray-400 pointer-events-none" aria-hidden>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          placeholder="Add a new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <Button type="submit" variant="primary">
        Add Task
      </Button>
    </form>
  )
}