"use client";

import { cn } from "@/src/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

/**
 * Card container: white background, subtle border and shadow.
 * Matches existing todo item, empty state, and loading skeleton styles.
 */
export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-sm border border-gray-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
