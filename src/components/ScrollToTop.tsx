import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scroll ke atas setiap pindah route (kecuali anchor #hash di halaman yang sama). */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return null;
}
