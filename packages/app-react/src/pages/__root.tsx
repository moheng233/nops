import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { httpLink } from "@trpc/client";
import { Suspense } from "react";

import { TanStackRouterDevtools } from "@/components/lazy_router_dev_tools";
import { trpc } from "@/lib/trpc";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpLink({
                    url: "/api",
                }),
            ],
        }),
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <Suspense>
                    <Outlet />
                </Suspense>
                <TanStackRouterDevtools position={"bottom-right"} />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </trpc.Provider>
    );
}
