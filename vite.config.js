import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        livestatus: resolve(__dirname, 'livestatus.html'),
        help: resolve(__dirname, 'help.html')
      }
    }
  }
})
