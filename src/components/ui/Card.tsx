"use client";

import { cn } from "@/src/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "group flex flex-col md:flex-row items-center justify-between p-4 rounded-2xl transition-all duration-300 border hover:shadow-md bg-white/80 border-white shadow-sm hover:-translate-y-0.5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
