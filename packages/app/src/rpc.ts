import { createTRPCClient, httpLink } from "@trpc/client";
import type { Router } from "@nps/server/rpc";
import { pinia } from "./index";
import { useAppStore } from "./stores";

export const rpc = createTRPCClient<Router>({
    links: [
        httpLink({
            url: "/api",
            headers() {
                const store = useAppStore(pinia);

                return {
                    authorization: `Bearer ${store.token}`,
                }
            },
        })
    ],

});