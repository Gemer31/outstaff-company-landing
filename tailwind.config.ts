import type { Config } from 'tailwindcss';


const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      scale: {
        '101': '1.01',
      },
      colors: {
        'custom-red-1': '#F14F4D',
        'custom-red-2': '#f76868',
        'custom-black-1': '#282828',
        'custom-black-2': '#1C1C1C',
        'custom-gray-1': '#2F2F2F'
      },
      backgroundColor: {
        'black-1/2': 'rgba(0, 0, 0, 0.5)',
        'black-1/5': 'rgba(0, 0, 0, 0.2)',
        'black-1/4': 'rgba(0, 0, 0, 0.25)',
        'black-4/5': 'rgba(0, 0, 0, 0.8)',
      },
      screens: {
        xs: '320px',
        '2xs': '400px',
        '3xs': '480px',
        //      sm	640px
        '2sm': '704px',
        //      md	768px
        '2md': '896px',
        //      lg	1024px
        //      xl	1280px
        //      2xl	1536px
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
