import type { Lang } from '../data/types';

/** Waktu relatif dwibahasa (mis. "2 jam lalu" / "2時間前") dari timestamp ISO. */
export function relativeTime(iso: string, lang: Lang): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });
  const abs = Math.abs(diffMs);
  if (abs >= 86_400_000) return rtf.format(-Math.round(diffMs / 86_400_000), 'day');
  if (abs >= 3_600_000) return rtf.format(-Math.round(diffMs / 3_600_000), 'hour');
  if (abs >= 60_000) return rtf.format(-Math.round(diffMs / 60_000), 'minute');
  return rtf.format(0, 'minute');
}
