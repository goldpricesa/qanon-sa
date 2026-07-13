import type { CSSProperties } from 'react'

interface RtlTextProps {
  text: string
  style?: CSSProperties
}

// satori (محرك توليد الصور في next/og) لا يطبّق خوارزمية bidi، فيرصف كلمات
// السطر الواحد دائمًا من اليسار إلى اليمين حتى للنص العربي. الالتفاف على ذلك
// يكون بتقسيم النص إلى كلمات داخل صف flex معكوس (row-reverse) قابل للالتفاف،
// فيصبح ترتيب الكلمات والتفاف الأسطر صحيحين بصريًا.
// المحاذاة عبر justifyContent: في row-reverse تكون flex-start = محاذاة يمين.
// يُكتفى بفاصل صغير بين الكلمات لأن satori يقيس عرض الكلمة العربية بأشكال
// الحروف المنفصلة بينما يرسمها متصلة، فيتبقى داخل كل صندوق فراغ إضافي أصلًا.
export function RtlText({ text, style }: RtlTextProps) {
  const fontSize = typeof style?.fontSize === 'number' ? style.fontSize : 24
  const words = text
    .split(/\s+/)
    .filter(Boolean)
    // بغياب bidi تُترك علامة الترقيم الختامية في نهاية السطر المنطقية، فتظهر
    // يمين الكلمة العربية بدل يسارها؛ نقلها إلى بداية الرمز يصحح موضعها البصري.
    .map((word) =>
      word.replace(/^([؀-ۿ][^:،؛.!؟]*)([:،؛.!؟]+)$/u, '$2$1')
    )

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        columnGap: Math.round(fontSize * 0.15),
        ...style,
      }}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>{word}</span>
      ))}
    </div>
  )
}
