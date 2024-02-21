import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { Suspense, createResource, createSignal } from "solid-js";
import type { AppRouter } from "../server/rpc";

export function App() {
    const client = createTRPCClient<AppRouter>({
        links: [
            httpBatchLink({
                url: '/api'
            })
        ]
    });
    const [version, version_action] = createResource(() => client.version.query());

    return (
        <>
            <Suspense fallback={
                <p>version:loading</p>
            } >
                <p>version:{version()}</p>
            </Suspense>
            <button onclick={version_action.refetch}>refetch</button>
        </>
    )
}