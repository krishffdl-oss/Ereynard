import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    // ── Code splitting — reduces unused JS ──
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router':       ['react-router-dom'],
          'helmet':       ['react-helmet-async'],
          'emailjs':      ['@emailjs/browser'],
        },
      },
    },

    // ── Minification (terser npm install --save-dev terser) ──
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },

    // ── CSS splitting ──
    cssCodeSplit: true,

    // ── No sourcemaps in prod ──
    sourcemap: false,

    // ── Chunk size warning ──
    chunkSizeWarningLimit: 600,
  },

  // ── Faster dev server ──
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});