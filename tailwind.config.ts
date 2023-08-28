import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        'very-dark-gray': 'hsl(209, 23%, 22%)',
        'light-gray': 'hsl(0, 0%, 98%)',
        'dark-gray': 'hsl(0, 0%, 52%)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      gridTemplateColumns: {
        'grid-cards': 'repeat(auto-fit, minmax(300px, auto));'
      }
    }
  },
  plugins: []
}
export default config
