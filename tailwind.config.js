/** @type {import('tailwindcss').Config} */

// ── Brand tokens ────────────────────────────────────────────────
// Ganti nilai di sini untuk menyesuaikan dengan brand ANC Japan.
// primary : biru korporat (kepercayaan, sisi Jepang)
// accent  : amber hangat (energi, sisi Indonesia)
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f2f6fb',
          100: '#e2ebf6',
          200: '#c5d7ec',
          300: '#9dbcdf',
          400: '#6d9ac9',
          500: '#3f75ad',
          600: '#255a9d',
          700: '#1e4e8c',
          800: '#1a4174',
          900: '#16355d',
          950: '#0f2440'
        },
        accent: {
          50: '#fff8eb',
          100: '#ffedc6',
          200: '#ffd988',
          300: '#ffc14a',
          400: '#ffa920',
          500: '#f98607',
          600: '#dd6102',
          700: '#b74206',
          800: '#94320c',
          900: '#7a2a0d'
        }
      },
      fontFamily: {
        sans: ['"Noto Sans"', '"Noto Sans JP"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        card: '0 1px 3px rgba(15, 36, 64, 0.06), 0 8px 24px rgba(15, 36, 64, 0.07)'
      }
    }
  },
  plugins: []
};
