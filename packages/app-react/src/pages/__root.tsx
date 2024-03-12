import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { createWSClient, wsLink } from "@trpc/client";
import { Suspense, useState } from "react";

import { TanStackRouterDevtools } from "@/components/lazy_router_dev_tools";
import { trpc } from "@/lib/trpc";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    const [wsClient] = useState(() =>
        createWSClient({
            url: `ws://localhost:5173/api/`,
        }),
    );
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                wsLink({
                    client: wsClient,
                }),
            ],
        }),
    );

    return (
        <Suspense>
            <trpc.Provider client={trpcClient} queryClient={queryClient}>
                <QueryClientProvider client={queryClient}>
                    <Outlet />
                </QueryClientProvider>
            </trpc.Provider>
            <TanStackRouterDevtools position={"bottom-right"} />
        </Suspense>
    );
}
