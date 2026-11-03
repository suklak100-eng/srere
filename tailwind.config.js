/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          950: '#02100C',
          900: '#041A15', // Deep Imperial Emerald
          850: '#07261F', // Midnight Jade
          800: '#0B362C',
          700: '#114B3E',
        },
        pearl: {
          50: '#FFFFFF',
          100: '#FAF6F0', // Warm Pearl Alabaster
          200: '#F3ECE1', // Soft Champagne Silk
          300: '#E7DCcb',
          400: '#D5C5B0',
        },
        gold: {
          100: '#FFF9D9',
          200: '#FFF3B0',
          300: '#EBD27A',
          400: '#DFC25E',
          500: '#D4AF37', // Metallic Liquid Gold
          600: '#C59B27',
          700: '#AA771C',
          800: '#8A6421',
          900: '#5F4414',
        },
        ruby: {
          800: '#7B112C', // Velvet Ruby
          900: '#54081B',
        }
      },
      fontFamily: {
        royal: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(4, 26, 21, 0.08), 0 0 15px rgba(212, 175, 55, 0.12)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.35)',
        'card-lift': '0 25px 50px -12px rgba(180, 135, 40, 0.28)',
      }
    },
  },
  plugins: [],
}

