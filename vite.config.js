import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        etusivu: resolve(__dirname, 'etusivu.html'),
        diary: resolve(__dirname, 'diary.html'),
        register: resolve(__dirname, 'register.html'),
      },
    },
  },
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});