import vue from "@vitejs/plugin-vue";
import typescript from 'rollup-plugin-typescript2';
import AutoImport from "unplugin-auto-import/vite";
import { PrimeVueResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { VueRouterAutoImports } from 'unplugin-vue-router';
import VueRouter from "unplugin-vue-router/vite";
import VueI18n from "@intlify/unplugin-vue-i18n/vite";
import { defineConfig } from 'vite';
import VueDevtools from "vite-plugin-vue-devtools";
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from "path";


export default defineConfig({
  root: __dirname,
  cacheDir: "../../node_modules/.vite/app",
  esbuild: false,
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/primevue/resources/themes/*",
          dest: "themes"
        }
      ]
    }),
    VueRouter({
      dts: ".vite/typed-router.d.ts",
      routesFolder: [
        {
          src: "src/pages",
        }
      ]
    }),
    VueI18n({
      include: [path.resolve(__dirname, "../../locales/**")],
    }),
    vue(),
    typescript({
      check: false
    }),
    Components({
      dirs: ['src/components'],
      dts: ".vite/components.d.ts",
      resolvers: [
        PrimeVueResolver(),
      ]
    }),
    AutoImport({
      dts: ".vite/imports.d.ts",
      imports: [
        'vue',
        'vue-i18n',
        VueRouterAutoImports,
      ],
      vueTemplate: true
    }),
    VueDevtools()],
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
