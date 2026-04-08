import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(isoDate: string): string {
  const date = new Date(isoDate)
  return date.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} دقائق للقراءة`
}
