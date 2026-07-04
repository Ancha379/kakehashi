import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ja from './ja.json';
import id from './id.json';

i18n.use(initReactI18next).init({
  resources: {
    ja: { translation: ja },
    id: { translation: id }
  },
  lng: 'id',
  fallbackLng: 'id',
  interpolation: { escapeValue: false }
});

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
});

export default i18n;
