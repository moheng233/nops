import typescript from 'rollup-plugin-typescript2';
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  esbuild: false,
  plugins: [solid(), typescript({
    check: false
  })],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  }
});
