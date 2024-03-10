import "./index.css";
import "./i18n.ts";

import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";

import { routeTree } from "../.vite/routeTree.gen.ts";

const router = createRouter({ routeTree, defaultPreload: "intent" });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
    const root = createRoot(rootElement);

    root.render(
        <StrictMode>
            <Suspense>
                <RouterProvider router={router} />
            </Suspense>
        </StrictMode>,
    );
}
