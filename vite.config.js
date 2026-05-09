import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  build: {
    // ── Inject built scripts/styles at end of <head>, after your static tags ──
    // This prevents Vite's chunks from landing before <title> and <meta> tags
    modulePreload: {
      // Disable the inline polyfill script Vite injects
      // (the "SCRIPT sync inline" flagged by the SEO extension)
      polyfill: false,
    },

    rollupOptions: {
      output: {
        // ── Code splitting ──
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router':       ['react-router-dom'],
          'helmet':       ['react-helmet-async'],
          'emailjs':      ['@emailjs/browser'],
        },
      },
    },

    // ── Minification ──
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