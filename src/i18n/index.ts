import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ja from './ja.json';
import id from './id.json';

const LANG_KEY = 'kakehashi_lang';

// Bahasa dipertahankan antar muat-halaman (localStorage). Tanpa ini, tiap
// reload / tautan email / muat-penuh balik ke default 'id'.
function initialLang(): 'ja' | 'id' {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'ja' || saved === 'id') return saved;
  } catch {
    /* localStorage tak tersedia */
  }
  return 'id';
}

i18n.use(initReactI18next).init({
  resources: {
    ja: { translation: ja },
    id: { translation: id }
  },
  lng: initialLang(),
  fallbackLng: 'id',
  interpolation: { escapeValue: false }
});

// Set <html lang> saat awal (event languageChanged hanya jalan saat berubah).
document.documentElement.lang = i18n.language;

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  try {
    localStorage.setItem(LANG_KEY, lng === 'ja' ? 'ja' : 'id');
  } catch {
    /* abaikan */
  }
});

export default i18n;
