import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // "/api": "http://localhost:3000", // <-- send API calls to your backend
      "/api": "http://127.0.0.1:3000",
    },
  },
});