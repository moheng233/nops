import VueI18n from "@intlify/unplugin-vue-i18n/vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import { PrimeVueResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { VueRouterAutoImports } from 'unplugin-vue-router';
import VueRouter from "unplugin-vue-router/vite";
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import VueDevtools from "vite-plugin-vue-devtools";
import ViteInspect from "vite-plugin-inspect";
import VueTypia from "unplugin-vue-typia/vite";
import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
  root: __dirname,
  cacheDir: "../../node_modules/.vite/app",
  experimental: {
    skipSsrTransform: true
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  },
  plugins: [
    // VitePWA({
    //   injectRegister: "script-defer",
    //   registerType: "autoUpdate",
    //   manifest: {
    //     name: "NOps",
    //     short_name: "nops",
    //     theme_color: "#ffffff",
    //     display_override: ["window-controls-overlay", "fullscreen", "minimal-ui"],
    //     display: "standalone",
    //     icons: [
    //       {
    //         "src": "pwa-192x192.png",
    //         "sizes": "192x192",
    //         "type": "image/png",
    //         "purpose": "any"
    //       },
    //       {
    //         "src": "pwa-512x512.png",
    //         "sizes": "512x512",
    //         "type": "image/png",
    //         "purpose": "any"
    //       }
    //     ]
    //   },
    //   devOptions: {
    //     enabled: true
    //   }
    // }),
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
    VueTypia(),
    vue({}),
    Components({
      dirs: ['src/components'],
      dts: ".vite/components.d.ts",
      resolvers: []
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
    VueDevtools(),
    ViteInspect()],
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
