"use client";

import { cn } from "@/src/lib/utils";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-hover transition-colors font-medium",
  secondary:
    "bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium",
  danger:
    "bg-red-100 hover:bg-red-200 text-red-800 font-medium",
  ghost:
    "bg-gray-100 text-gray-600 hover:bg-gray-200 font-medium transition-colors",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 rounded text-sm",
  md: "px-4 py-2 rounded-lg text-sm",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "cursor-pointer shrink-0 inline-flex items-center justify-center gap-1.5",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
