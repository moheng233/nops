import { initTRPC } from "@trpc/server";
import { Context } from "./index.js";

export interface Meta {
    requireRole: "NONE" | "ADMIN" | "USER"
}

export const trpc = initTRPC.meta<Meta>().context<Context>().create({
    defaultMeta: {
        requireRole: "USER"
    }
});

export const router = trpc.router({

});

export type Router = typeof router;