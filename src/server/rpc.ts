import { initTRPC } from "@trpc/server";
import { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import typia from "typia";

export const createContext = async (opts: CreateHTTPContextOptions) => {
    return {

    };
};

export interface MetaData {
    authRequired: boolean;
}

export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().meta<MetaData>().create();

export const procedure = t.procedure;

export const appRouter = t.router({
    version: t.procedure.output(typia.createAssert<string>()).query(({ ctx, input }) => {
        return "1.0.0.5";
    }),
});

export type AppRouter = typeof appRouter;