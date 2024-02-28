import { initTRPC } from "@trpc/server";
import { Context } from "./index.js";
import { userRoleEnum } from "./schema.js";
import { PgEnum2Unio } from "./util.js";

export interface Meta {
    requireRole: "NONE" | PgEnum2Unio<typeof userRoleEnum>,
}

export const trpc = initTRPC.meta<Meta>().context<Context>().create({
    defaultMeta: {
        requireRole: "USER"
    }
});

export const router = trpc.router({

});

export type Router = typeof router;