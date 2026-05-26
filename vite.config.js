import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, 'frontend'),
  build: {
    outDir: path.resolve(__dirname, 'frontend', 'dist'),
  },
  server: {
    port: 3000,
    host: '127.0.0.1' 
  }
})