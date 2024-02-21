import { initTRPC } from "@trpc/server";
import typia from "typia";

export const t = initTRPC.create();

export const appRouter = t.router({
    version: t.procedure.output(typia.createAssert<string>()).query(() => {
        return "1.0.0.5";
    }),
});

export type AppRouter = typeof appRouter;