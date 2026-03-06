"use client"

import { cn } from "@/src/lib/utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "addTask"
type ButtonSize = "sm" | "md"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-hover transition-colors font-medium",
  secondary:
    "bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-transform duration-150 active:scale-95",
  danger: "bg-red-100 hover:bg-red-200 text-red-800 font-medium",
  ghost:
    "bg-gray-100 text-gray-600 hover:bg-gray-200 font-medium transition-colors",
  addTask:
    "md:absolute relative md:right-2 md:top-2 md:bottom-2 bg-primary hover:bg-primary-hover disabled:bg-slate-300 disabled:transform-none text-white px-5 py-1 rounded-xl font-semibold transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md flex items-center gap-2 cursor-pointer md:w-auto w-full flex items-center justify-center",
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 rounded text-sm",
  md: "md:px-4 px-1 py-1.5 rounded-lg text-sm",
}

const baseStyles =
  "cursor-pointer shrink-0 inline-flex items-center justify-center gap-1.5"

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const isAddTask = variant === "addTask"
  return (
    <button
      type={type}
      className={cn(
        !isAddTask && baseStyles,
        variantStyles[variant],
        !isAddTask && sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
      {isAddTask && <FontAwesomeIcon icon={faPlus} />}
    </button>
  )
}
