import { initTRPC } from "@trpc/server";
import { Context } from "./index.js";
import { userRoleEnum } from "./schema.js";
import { PgEnum2Unio } from "./util.js";
import { authRouter } from "./apis/auth.js";

export interface Meta {
    requireRole: "NONE" | PgEnum2Unio<typeof userRoleEnum>,
}

export const trpc = initTRPC.meta<Meta>().context<Context>().create({
    defaultMeta: {
        requireRole: "USER"
    }
});

export const procedure = trpc.procedure.use(async (opt) => {
    if (opt.meta?.requireRole != "NONE") {
        
    }

    return opt.next({
        ctx: {
            
        }
    });
});

export const router = trpc.router({
    auth: authRouter
});

export type Router = typeof router;