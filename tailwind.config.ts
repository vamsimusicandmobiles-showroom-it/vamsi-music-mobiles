import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#08080a',
        graphite: '#141518',
        steel: '#23252a',
        bone: '#ece8e1',
        silver: '#9a9ea6',
        amp: '#8B0000',
        line: 'rgba(236, 232, 225, 0.12)',
      },
      fontFamily: {
        display: [
          'var(--font-display)',
          'Arial Narrow',
          'Impact',
          'sans-serif',
        ],
        sans: [
          'var(--font-body)',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};

export default config;
