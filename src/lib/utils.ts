import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Article HTML comes from our internal `src/data/posts.ts` (not user input),
// so this sanitizer is defence-in-depth — not the primary trust boundary.
// It strips a deny-list of known-dangerous patterns. If we ever accept HTML
// from users or external sources, swap this for a real allow-list parser
// such as `isomorphic-dompurify` or `sanitize-html`.
export function sanitizeArticleHtml(html: string): string {
  // Decode common HTML entities so that obfuscated `javascript:` payloads
  // (e.g. `&#x6a;avascript:`) don't slip past the protocol filter.
  const decodeEntities = (s: string) =>
    s
      .replace(/&#x([0-9a-fA-F]+);?/g, (_, h) =>
        String.fromCodePoint(parseInt(h, 16))
      )
      .replace(/&#(\d+);?/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))

  const decoded = decodeEntities(html)

  const dangerousTags = /<(script|style|iframe|object|embed|form|input|textarea|button|select|meta|link|base|svg)[^>]*>[\s\S]*?<\/\1>/gi
  const selfClosingDangerous = /<(script|style|iframe|object|embed|form|input|textarea|button|select|meta|link|base|svg)[^>]*\/?>/gi
  const eventHandlers = /\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi
  const dangerousProtocols = /(?:javascript|vbscript|data)\s*:/gi
  const dangerousAttrs = /\s+(srcdoc|formaction|xlink:href)\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi

  return decoded
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
  return date.toLocaleDateString('ar-SA-u-ca-gregory-nu-latn', {
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
