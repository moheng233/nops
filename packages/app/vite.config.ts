import VueI18n from "@intlify/unplugin-vue-i18n/vite";
import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import path from "path";
import tailwind from "tailwindcss";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { VueRouterAutoImports } from 'unplugin-vue-router';
import VueRouter from "unplugin-vue-router/vite";
import VueTypia from "unplugin-vue-typia/vite";
import { defineConfig } from 'vite';
import ViteInspect from "vite-plugin-inspect";
import { VitePWA } from 'vite-plugin-pwa';
import VueDevtools from "vite-plugin-vue-devtools";

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
    process.env.MODE == "production" ? VitePWA({
      injectRegister: "script-defer",
      registerType: "autoUpdate",
      manifest: {
        name: "NOps",
        short_name: "nops",
        theme_color: "#ffffff",
        display_override: ["window-controls-overlay", "fullscreen", "minimal-ui"],
        display: "standalone",
        icons: [
          {
            "src": "pwa-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
          }
        ]
      },
      devOptions: {
        enabled: true
      }
    }) : [],
    VueRouter({
      dts: path.resolve(__dirname, ".vite/typed-router.d.ts"),
      routesFolder: [
        {
          src: "src/pages",
        }
      ]
    }),
    VueI18n({
      include: [path.resolve(__dirname, "../../locales/**")],
      jitCompilation: true
    }),
    VueTypia(),
    vue({}),
    Components({
      dirs: ['src/components'],
      dts: path.resolve(__dirname, ".vite/components.d.ts"),
      resolvers: []
    }),
    AutoImport({
      dts: path.resolve(__dirname, ".vite/imports.d.ts"),
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
