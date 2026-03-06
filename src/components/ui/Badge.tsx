"use client"

import { cn } from "@/src/lib/utils"

type BadgeVariant = "completed" | "pending" | "neutral"

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  completed: "bg-emerald-50 text-emerald-600 border-emerald-200",
  pending: "bg-amber-50 text-amber-600 border-amber-200",
  neutral: "bg-gray-200 text-gray-800",
}

export function Badge({
  variant = "neutral",
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "px-3 py-1 text-xs font-bold rounded-full border",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
