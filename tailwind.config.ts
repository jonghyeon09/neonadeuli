import type { Config } from 'tailwindcss';
import { RecursiveKeyValuePair, ResolvableTo } from 'tailwindcss/types/config';

const defaultTheme = require('tailwindcss/defaultTheme');

const colors: ResolvableTo<RecursiveKeyValuePair> = {
  statics: {
    white: '#ffffff',
    black: '#000000',
  },
  primary: {
    0: '#FBB039',
    100: '#FEF2DE',
    200: '#FDE4BC',
    300: '#FCD79B',
    400: '#FBCA7A',
    500: '#FABC58',
    600: '#F89F10',
    700: '#DA8907',
    800: '#B37005',
    900: '#8D5804',
    1000: '#664003',
  },
  neutrals: {
    100: '#f2f2f2',
    200: '#e6e6e6',
    300: '#d9d9d9',
    400: '#cccccc',
    500: '#b4b4b4',
    600: '#969696',
    700: '#878787',
    800: '#787878',
    900: '#696969',
    1000: '#5a5a5a',
    1100: '#4b4b4b',
    1200: '#3c3c3c',
    1300: '#2d2d2d',
    1400: '#1e1e1e',
  },
  secondary: {
    0: '#f5f0e4',
    100: '#faf7f1',
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
      boxShadow: {
        md: '0px 2px 8px rgba(0, 0, 0, 0.12), 0px 1px 4px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(0, 0, 0, 0.08)',
      },
    },
    fontFamily: {
      sans: ['Pretendard-Regular', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
export default config;
