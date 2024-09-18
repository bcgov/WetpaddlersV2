import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  cacheDir: '.vite', //node_modules not writable on openshift
  plugins: [react()],
})
