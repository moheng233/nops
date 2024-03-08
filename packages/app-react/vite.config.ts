import { resolve } from "node:path";

import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";

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
        react({}),
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
});
