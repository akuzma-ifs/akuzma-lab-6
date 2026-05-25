import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/lab5-ak-ifs/',

  plugins: [
    tailwindcss(),
  ],
})