import type { Config } from 'tailwindcss';
import { RecursiveKeyValuePair, ResolvableTo } from 'tailwindcss/types/config';

const defaultTheme = require('tailwindcss/defaultTheme');

const colors: ResolvableTo<RecursiveKeyValuePair> = {
  statics: {
    white: '#ffffff',
    black: '#000000',
  },
  neutrals: {
    100: '#f2f2f2',
    500: '#b4b4b4',
    1100: '#4b4b4b',
  },
};

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: colors,
    },
    fontFamily: {
      sans: ['Pretendard-Regular', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
export default config;
