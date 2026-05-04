/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#CC0000',
        dark: '#1A1A1A',
        'status-pending': '#FF9800',
        'status-process': '#2196F3',
        'status-painting': '#9C27B0',
        'status-done': '#4CAF50',
        'status-alert': '#FF6F00',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      fontSize: {
        xs: ['12px', '1.5em'],
        sm: ['14px', '1.5em'],
        base: ['16px', '1.5em'],
        lg: ['18px', '1.5em'],
        xl: ['20px', '1.5em'],
        '2xl': ['24px', '1.5em'],
        '3xl': ['28px', '1.5em'],
        '4xl': ['32px', '1.5em'],
      },
      minHeight: {
        touchTarget: '48px',
      },
      minWidth: {
        touchTarget: '48px',
      },
    },
  },
  plugins: [],
}
