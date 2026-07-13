import { readFile } from 'fs/promises'
import { join } from 'path'

// خط ImageResponse الافتراضي (Noto Sans) لاتيني فقط، فلا بد من تمرير خط
// عربي صراحةً وإلا ظهر النص العربي في الصور المولّدة مربعات فارغة.
// satori لا يدعم woff2، لذلك نستخدم نسخ TTF من IBM Plex Sans Arabic
// (يغطي العربية واللاتينية معًا).
const FONTS_DIR = join(process.cwd(), 'src/assets/fonts')

interface OgFont {
  name: string
  data: Buffer
  weight: 400 | 700
  style: 'normal'
}

let fontsPromise: Promise<OgFont[]> | null = null

export function getOgFonts(): Promise<OgFont[]> {
  if (!fontsPromise) {
    fontsPromise = Promise.all([
      readFile(join(FONTS_DIR, 'IBMPlexSansArabic-Regular.ttf')),
      readFile(join(FONTS_DIR, 'IBMPlexSansArabic-Bold.ttf')),
    ]).then(([regular, bold]) => [
      { name: 'IBM Plex Sans Arabic', data: regular, weight: 400, style: 'normal' },
      { name: 'IBM Plex Sans Arabic', data: bold, weight: 700, style: 'normal' },
    ])
  }

  return fontsPromise
}
