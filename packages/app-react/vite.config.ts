import { resolve } from "node:path";

import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import React from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import AutoImport from "unplugin-auto-import/vite";
import { defineConfig } from "vite";
import { i18nDetector } from "vite-plugin-i18n-detector";

// https://vitejs.dev/config/
export default defineConfig({
    css: {
        postcss: {
            plugins: [
                tailwindcss({
                    config: "./tailwind.config.js",
                }),
                autoprefixer(),
            ],
        },
    },
    plugins: [
        i18nDetector({
            localesPaths: ["../../locales"],
        }),
        AutoImport({
            include: [/\.[tj]sx?$/],
            imports: [
                "react",
                "react-i18next",
                {
                    from: "use-immer",
                    imports: ["useImmer"],
                },
                {
                    from: "react-hook-form",
                    imports: ["useForm"],
                },
            ],
            dirs: ["src/components/ui/*"],
            dts: ".vite/auto-imports.d.ts",
            injectAtEnd: true,
            eslintrc: {
                enabled: true,
                filepath: ".vite/.eslintrc-auto-import.json",
                globalsPropValue: true,
            },
        }),
        React({}),
        TanStackRouterVite({
            routesDirectory: "./src/pages",
            generatedRouteTree: "./.vite/routeTree.gen.ts",
            quoteStyle: "single",
        }),
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
        },
    },
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:3001",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
});
