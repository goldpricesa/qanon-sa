declare module 'sanitize-html' {
  interface SanitizeHtmlOptions {
    allowedTags?: string[]
    allowedAttributes?: Record<string, string[]>
    allowedSchemes?: string[]
    allowedSchemesAppliedToAttributes?: string[]
    allowProtocolRelative?: boolean
    disallowedTagsMode?: 'discard' | 'escape' | 'recursiveEscape' | 'completelyDiscard'
    enforceHtmlBoundary?: boolean
  }

  export default function sanitizeHtml(
    dirty: string,
    options?: SanitizeHtmlOptions
  ): string
}
