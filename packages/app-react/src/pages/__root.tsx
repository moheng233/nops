import { createRootRoute,Outlet } from "@tanstack/react-router";
import { Suspense } from "react";

import { TanStackRouterDevtools } from "../components/lazy_router_dev_tools";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <Suspense>
            <Outlet />
            <TanStackRouterDevtools position={"bottom-right"} />
        </Suspense>
    );
}
