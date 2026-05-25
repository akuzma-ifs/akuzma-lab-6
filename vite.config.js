import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/akuzma-lab-6/',
  plugins: [
    tailwindcss(),
  ],
})