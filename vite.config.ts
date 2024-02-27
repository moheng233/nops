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
import path from "path";


export default defineConfig({
  esbuild: false,
  plugins: [
    VueRouter({
      dts: ".vite/typed-router.d.ts",
      routesFolder: [
        {
          src: "src/client/pages",
        }
      ]
    }),
    VueI18n({
      include: [ path.resolve(__dirname, "./src/locales/**") ]
    }),
    vue(),
    typescript({
      check: false
    }),
    Components({
      dirs: ['src/client/components'],
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
        VueRouterAutoImports
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
