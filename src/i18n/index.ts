import { en } from './en';
import { bn } from './bn';

export type TranslationKey = keyof typeof en;

export const translations = {
  en,
  bn,
} as const;

export type Language = keyof typeof translations;

export function getTranslation(lang: Language) {
  return translations[lang];
}

export function t(lang: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[lang];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key;
    }
  }

  return typeof value === 'string' ? value : key;
}
