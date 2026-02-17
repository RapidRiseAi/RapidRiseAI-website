import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      maxWidth: { content: '1200px' },
      borderRadius: {
        card: '18px',
        button: '14px',
      },
      colors: {
        bg0: 'var(--bg-0)',
        bg1: 'var(--bg-1)',
        stroke: 'var(--stroke)',
        text0: 'var(--text-0)',
        text1: 'var(--text-1)',
        blue: 'var(--blue)',
      },
      boxShadow: {
        glow: '0 0 0 3px var(--blueGlow)',
      },
    },
  },
  plugins: [],
} satisfies Config;
