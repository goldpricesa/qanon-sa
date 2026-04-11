import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sanitizeArticleHtml(html: string): string {
  const dangerousTags = /<(script|style|iframe|object|embed|form|input|textarea|button|select|meta|link|base)[^>]*>[\s\S]*?<\/\1>/gi
  const selfClosingDangerous = /<(script|style|iframe|object|embed|form|input|textarea|button|select|meta|link|base)[^>]*\/?>/gi
  const eventHandlers = /\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi
  const dangerousProtocols = /(?:javascript|vbscript|data):/gi
  const dangerousAttrs = /\s+(srcdoc|formaction)\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi

  return html
    .replace(dangerousTags, '')
    .replace(selfClosingDangerous, '')
    .replace(eventHandlers, '')
    .replace(dangerousAttrs, '')
    .replace(dangerousProtocols, '')
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
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
  if (minutes === 1) return 'دقيقة واحدة للقراءة'
  if (minutes === 2) return 'دقيقتان للقراءة'
  if (minutes >= 3 && minutes <= 10) return `${minutes} دقائق للقراءة`
  return `${minutes} دقيقة للقراءة`
}
