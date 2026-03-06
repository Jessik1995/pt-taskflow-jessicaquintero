import { clsx, type ClassValue } from "clsx";

/**
 * Merges class names with clsx for conditional styling.
 * Use for component variants and conditional Tailwind classes.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
