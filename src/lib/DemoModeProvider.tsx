import { createContext, useCallback, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// "Mode demo" = menjelajah /app tanpa login, memakai perusahaan contoh (id-01).
// Disimpan di sessionStorage supaya bertahan antar-navigasi tapi hilang saat
// tab ditutup. Ini menjaga review ANC tetap tanpa friksi walau /app di-gate.
const KEY = 'kakehashi_demo';

interface DemoModeValue {
  demo: boolean;
  enableDemo: () => void;
  exitDemo: () => void;
}

const DemoModeContext = createContext<DemoModeValue | null>(null);

export function DemoModeProvider({ children }: { children: ReactNode }) {
  const [demo, setDemo] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(KEY) === '1';
    } catch {
      return false;
    }
  });

  const enableDemo = useCallback(() => {
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* abaikan bila storage tak tersedia */
    }
    setDemo(true);
  }, []);

  const exitDemo = useCallback(() => {
    try {
      sessionStorage.removeItem(KEY);
    } catch {
      /* abaikan */
    }
    setDemo(false);
  }, []);

  return (
    <DemoModeContext.Provider value={{ demo, enableDemo, exitDemo }}>
      {children}
    </DemoModeContext.Provider>
  );
}

export function useDemoMode(): DemoModeValue {
  const ctx = useContext(DemoModeContext);
  if (!ctx) throw new Error('useDemoMode harus dipakai di dalam <DemoModeProvider>');
  return ctx;
}
