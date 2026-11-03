/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#040506',
          900: '#08090A',
          850: '#0D0E11',
          800: '#14171A',
          700: '#1F2329',
        },
        emerald: {
          950: '#020C09',
          900: '#041A15',
          850: '#07261F',
          800: '#0B362C',
        },
        alabaster: {
          50: '#FFFFFF',
          100: '#FAF8F5',
          200: '#F4EFE8',
          300: '#ECE3D7',
          400: '#DFD2C0',
        },
        champagne: {
          100: '#FBF5EB',
          200: '#F5E6CD',
          300: '#EBD2A4',
          400: '#DFBA73',
          500: '#C5A880',
          600: '#AA8858',
          700: '#8A6736',
        },
        gold: {
          100: '#FFF9D9',
          200: '#FFF3B0',
          300: '#EBD27A',
          400: '#DFC25E',
          500: '#D4AF37',
          600: '#C59B27',
          700: '#AA771C',
          800: '#8A6421',
        },
        ruby: {
          900: '#54081B',
          800: '#6E1024',
          700: '#871831',
        }
      },
      fontFamily: {
        cinzel: ['"Cinzel"', 'serif'],
        royal: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      letterSpacing: {
        'widest-luxury': '0.28em',
        'super-wide': '0.35em',
      },
      boxShadow: {
        'pedestal': '0 30px 60px -12px rgba(0, 0, 0, 0.45)',
        'gold-subtle': '0 0 25px rgba(197, 168, 128, 0.18)',
        'gold-glow': '0 0 35px rgba(212, 175, 55, 0.35)',
      }
    },
  },
  plugins: [],
}
