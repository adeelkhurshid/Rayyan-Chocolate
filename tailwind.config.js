/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rayyan-black': '#050505',
        'rayyan-navy': '#0B1635',
        'rayyan-gold': '#C8A75A',
        'rayyan-brown': '#4A2A17',
        'rayyan-cocoa': '#6D3B20',
        'rayyan-cream': '#F5E8D8',
        'rayyan-white': '#FAFAFA',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
