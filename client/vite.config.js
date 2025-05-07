import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import os from 'os';

const envVars = dotenvExpand.expand(dotenv.config()).parsed || {};

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name in interfaces) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1';
}

const localIP = envVars.LOCAL_IP || getLocalIP();
const apiBase = envVars.VITE_API_BASE_URL || `http://${localIP}:3000`;

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      '/api': {
        target: apiBase,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: '../server/public',
    emptyOutDir: true,
  },
  optimizeDeps: {
    exclude: ['some-large-package'],
  },
});
