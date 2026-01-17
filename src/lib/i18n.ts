import type { Locale, AaiContent } from '@/data/aai/types';

export async function getAaiContent(locale: Locale = 'en'): Promise<AaiContent> {
  switch (locale) {
    case 'mr':
      return (await import('@/data/aai/content.mr')).content;
    case 'gu':
      return (await import('@/data/aai/content.gu')).content;
    case 'hi':
      return (await import('@/data/aai/content.hi')).content;
    default:
      return (await import('@/data/aai/content.en')).content;
  }
}
