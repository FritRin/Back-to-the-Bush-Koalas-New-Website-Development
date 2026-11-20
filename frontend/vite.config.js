import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// // https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    host: '0.0.0.0',
    allowedHosts: true,

    watch: {
      usePolling: true,
    },

    // Forward API requests to the backend server.
    proxy: {
      '/api': {
        target: 'http://backend:3000',
        changeOrigin: true,
      },
      '/images': {
        target: 'http://backend:3000',
        changeOrigin: true,
      },
    },
  },
});