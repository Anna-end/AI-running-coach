import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function groupBy<T, K extends keyof T>(arr: T[], key: K): Record<string, T[]> {
    const result: Record<string, T[]> = {};
  
    for (const item of arr) {
      const groupKey = String(item[key]);
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
    }
    return result;
  }

  
