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
        
        // Background variations (ai.work brand system)
        'bg-primary': '#141414',        // Global background
        'bg-card': '#1A1A1A',           // Card/container background (option 1)
        'bg-card-alt': '#41403E',       // Card/container background (option 2)
        'bg-elevated': '#2F2F2F',
        
        // Text colors (ai.work brand system)
        'text-primary': '#FBFAF9',      // Primary text
        'text-secondary': '#CDCCCB',
        'text-tertiary': '#8A8784',     // Secondary text, labels, helpers
        
        // Highlight & Feedback (ai.work brand system)
        'highlight': '#82D895',         // Success, selection, focus states
        
        // Legacy accent colors (keep for backwards compatibility)
        'accent-green': '#00D97E',
        'accent-blue': '#4A9EFF',
        'accent-orange': '#FF6B35',
        
        // Status colors
        'status-success': '#82D895',    // Updated to use new highlight color
        'status-active': '#4A9EFF',
        'status-warning': '#FF6B35',
        
        // Border color
        'border': '#2F2F2F',
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
        // ai.work brand system glows
        'glow-highlight': '0 0 8px rgba(130, 216, 149, 0.25)',      // Selected card state
        'glow-highlight-hover': '0 0 10px rgba(130, 216, 149, 0.1)', // Logo hover state
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
