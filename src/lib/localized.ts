import { useTranslation } from 'react-i18next';
import type { Bilingual, Lang } from '../data/types';

/** Bahasa UI aktif ('ja' | 'id'). */
export function useLang(): Lang {
  const { i18n } = useTranslation();
  return i18n.language === 'ja' ? 'ja' : 'id';
}

/** Ambil teks dwibahasa sesuai bahasa UI aktif. */
export function useLocalized() {
  const lang = useLang();
  return (b: Bilingual) => b[lang];
}

/** Ambil field dwibahasa bergaya `<field>_ja` / `<field>_id` dari sebuah objek. */
export function pickField<T extends Record<string, unknown>>(
  obj: T,
  field: string,
  lang: Lang
): string {
  return String(obj[`${field}_${lang}`] ?? '');
}
