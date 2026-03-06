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
    <form onSubmit={handleSubmit} className="flex gap-2 mb-5 ">
      <div className="relative flex flex-col md:flex-row items-center w-full gap-2 md:gap-0">
        <input
          className="w-full md:pl-6 md:pr-36 md:py-4 py-2 px-4 rounded-2xl bg-white/80 border-2 border-transparent focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-lg shadow-inner placeholder-slate-400"
          placeholder="Add a new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          size="sm"
          type="submit"
          variant="addTask"
          disabled={!text.trim()}
        >
          Add Task
        </Button>
      </div>
    </form>
  )
}
