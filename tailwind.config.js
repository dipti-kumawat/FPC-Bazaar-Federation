/** FPC Bazaar Federation brand palette: Deep Forest Green, Warm Ivory, Antique Gold. */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F1F4F0',
          100: '#E2E9E1',
          200: '#C4D2C5',
          300: '#9BB5A0',
          400: '#5E8A72',
          500: '#315F4D',
          600: '#24513F',
          700: '#194433',
          800: '#103B2D',
          900: '#0A2B21',
          950: '#061D16',
        },
        gold: { 50: '#FBF8EF', 100: '#F4ECD6', 200: '#E8D9B0', 300: '#D9C48F', 400: '#C7AE7D', 500: '#B69A62', 600: '#967B49', 700: '#765F36' },
        ink: '#292D29',
        paper: '#F6F3EA',
        ivory: '#F6F3EA',
        cream: '#EDE7D6',
        charcoal: '#292D29',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Noto Sans Devanagari"', 'system-ui', 'sans-serif'],
        display: ['Fraunces', '"Noto Serif Devanagari"', 'Georgia', 'serif'],
        serif: ['Fraunces', '"Noto Serif Devanagari"', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 18px 50px rgba(16, 59, 45, 0.08)',
        lift: '0 22px 60px -18px rgba(6, 29, 22, 0.35)',
        card: '0 1px 0 rgba(16,59,45,.04), 0 12px 32px -18px rgba(16,59,45,.25)',
      },
    },
  },
  plugins: [],
};
