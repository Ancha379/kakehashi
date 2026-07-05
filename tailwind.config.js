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
        },
        // ── Token redesign landing (dari desain Claude Design) ──
        navy: {
          950: '#0A1230',
          900: '#0B1437',
          800: '#111a52',
          700: '#22317a',
          600: '#2b3a86'
        },
        royal: {
          300: '#aeb9ff',
          400: '#8ca0ff',
          500: '#4F6BFF',
          600: '#3a52e0'
        },
        coral: {
          400: '#FF6A57',
          500: '#FF5A47',
          600: '#e8442f'
        },
        mint: {
          400: '#5ce6a5',
          500: '#2bb47a'
        }
      },
      fontFamily: {
        sans: ['"Noto Sans"', '"Noto Sans JP"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '"Noto Sans JP"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        card: '0 1px 3px rgba(15, 36, 64, 0.06), 0 8px 24px rgba(15, 36, 64, 0.07)',
        glow: '0 20px 60px -20px rgba(79, 107, 255, 0.5)',
        lift: '0 24px 60px -24px rgba(10, 18, 48, 0.35)'
      }
    }
  },
  plugins: []
};
