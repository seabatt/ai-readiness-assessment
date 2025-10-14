import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // AI.work brand colors
        'brand-primary': '#FBFAF9',
        'brand-secondary': '#CDCCCB',
        'brand-tertiary': '#8A8784',
        'brand-surface': '#FBFAF9',
        'brand-surface-solid': '#262626',
        
        // Background variations
        'bg-primary': '#262626',
        'bg-card': '#1A1A1A',
        'bg-elevated': '#2F2F2F',
        
        // Text colors
        'text-primary': '#FBFAF9',
        'text-secondary': '#CDCCCB',
        'text-tertiary': '#8A8784',
        
        // Accent colors (use sparingly)
        'accent-green': '#00D97E',
        'accent-blue': '#4A9EFF',
        'accent-orange': '#FF6B35',
        
        // Status colors
        'status-success': '#00D97E',
        'status-active': '#4A9EFF',
        'status-warning': '#FF6B35',
      },
      borderRadius: {
        'card': '16px',
        'pill': '24px',
      },
      boxShadow: {
        'card': '0 4px 6px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 12px rgba(0, 0, 0, 0.4)',
        'glow-green': '0 0 20px rgba(0, 217, 126, 0.3)',
        'glow-blue': '0 0 20px rgba(74, 158, 255, 0.3)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
