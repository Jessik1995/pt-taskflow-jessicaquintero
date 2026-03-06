"use client";

import { cn } from "@/src/lib/utils";

type BadgeVariant = "completed" | "pending" | "neutral";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  completed: "bg-green-400 text-white",
  pending: "bg-blue-400 text-white",
  neutral: "bg-gray-200 text-gray-800",
};

export function Badge({
  variant = "neutral",
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "px-2.5 py-1 rounded-md text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
