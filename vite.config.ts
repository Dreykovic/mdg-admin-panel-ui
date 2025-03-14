// vite.config.ts
import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 600, // Increase limit slightly if needed
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-redux': ['react-redux', 'redux', '@reduxjs/toolkit'],
          'vendor-ui': ['react-error-boundary'], // Add UI libraries here

          // Split by module
          'module-goods': [
            '/src/pages/goods/categories-page',
            '/src/pages/goods/origins-page',
            '/src/pages/goods/suppliers-page',
            '/src/pages/goods/margins-page',
            '/src/pages/goods/units-page',
            '/src/pages/goods/products-page',
            '/src/pages/goods/product-details-page',
            '/src/pages/goods/add-inventory-page',
            '/src/pages/goods/add-product-page',
          ],
          'module-compositions': [
            '/src/pages/compositions/recipes-page',
            '/src/pages/compositions/recipe-details-page',
          ],
          'module-resources': ['/src/pages/changelog'],
        },
      },
    },
  },
});
