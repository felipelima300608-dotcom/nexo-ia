/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        nexo: {
          bg: '#0A0E1A',
          'bg-secondary': '#0D1220',
          'bg-tertiary': '#111827',
          'bg-card': '#151D2E',
          'bg-elevated': '#1A2334',
          navy: '#0A1628',
          'navy-light': '#132238',
          'navy-lighter': '#1C2D4D',
          gold: '#C9A962',
          'gold-light': '#D4B978',
          'gold-dark': '#B8943D',
          cream: '#F5F0E8',
          'cream-muted': '#E8E2D8',
          primary: '#C9A962',
          secondary: '#1E3A5F',
          accent: '#2D5A8B',
          success: '#4A9D7C',
          error: '#C4605B',
          warning: '#D4A559',
          text: '#F5F0E8',
          'text-secondary': '#C9C5BC',
          'text-muted': '#8B8878',
          border: '#2A3448',
          'border-light': '#3D4A61',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'elegant': '0 4px 24px rgba(0, 0, 0, 0.15)',
        'elegant-hover': '0 8px 32px rgba(0, 0, 0, 0.2)',
        'gold-glow': '0 0 40px rgba(201, 169, 98, 0.15)',
        'card': '0 2px 12px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #C9A962 0%, #D4B978 100%)',
        'gradient-navy': 'linear-gradient(135deg, #1E3A5F 0%, #2D5A8B 100%)',
      },
    },
  },
  plugins: [],
};
