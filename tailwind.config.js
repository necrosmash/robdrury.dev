/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xsm': '540px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        emotionengine: ["emotionengine", "sans-serif"],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: '#fff',
            a: {
              color: theme('colors.blue.500'),
              '&:hover': {
                color: theme('colors.blue.700'),
              },
            },
            h2: {
              a: {
                color: '#fff',
                '&:hover': {
                  color: '#fff',
                },
              },
            },
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            },
          }
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}