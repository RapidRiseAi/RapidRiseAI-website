import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      maxWidth: { content: '1200px' },
      borderRadius: { card: '20px', button: '14px' },
      colors: {
        bg0: 'var(--bg-0)',
        bg1: 'var(--bg-1)',
        bg2: 'var(--bg-2)',
        stroke: 'var(--stroke)',
        text0: 'var(--text-0)',
        text1: 'var(--text-1)',
        text2: 'var(--text-2)',
        blue: 'var(--blue)',
        success: 'var(--success)',
        danger: 'var(--danger)',
        'background-primary': 'var(--background-primary)',
        'background-secondary': 'var(--background-secondary)',
        'surface-primary': 'var(--surface-primary)',
        'surface-secondary': 'var(--surface-secondary)',
        'surface-elevated': 'var(--surface-elevated)',
        'border-subtle': 'var(--border-subtle)',
        'border-strong': 'var(--border-strong)',
        'border-blue': 'var(--border-blue)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'accent-primary': 'var(--accent-primary)',
        'accent-secondary': 'var(--accent-secondary)',
        'accent-success': 'var(--accent-success)',
        'accent-warning': 'var(--accent-warning)',
        'accent-danger': 'var(--accent-danger)',
        'glow-blue': 'var(--glow-blue)',
        'glow-cyan': 'var(--glow-cyan)',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(45,124,255,0.7), 0 0 24px rgba(45,124,255,0.35)',
      },
    },
  },
  plugins: [],
} satisfies Config;
