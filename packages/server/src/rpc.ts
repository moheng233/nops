import { initTRPC } from "@trpc/server";

import { Context } from "./index.js";
import { userRoleEnum } from "./schema.js";
import { Tuple2Union } from "./util.js";

export interface Meta {
    requireRole: "NONE" | Tuple2Union<(typeof userRoleEnum)["enumValues"]>;
}

const trpc = initTRPC
    .meta<Meta>()
    .context<Context>()
    .create({
        defaultMeta: {
            requireRole: "USER",
        },
    });

export const procedure = trpc.procedure;

export function getTrpc() {
    return trpc;
}

const router = trpc.router({
    auth: (await import("./apis/auth.js", {})).default,
});

export function getRouter() {
    return router;
}

export type Router = typeof router;
