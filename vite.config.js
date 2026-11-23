import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' makes the build work on GitHub Pages in any repo folder
export default defineConfig({
  plugins: [react()],
  base: './',
});
