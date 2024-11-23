import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://guarded-eyrie-17012-94648af88a8b.herokuapp.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
