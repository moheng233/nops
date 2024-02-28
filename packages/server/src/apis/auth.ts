import { Lucia, generateId } from "lucia";
import { trpc } from "../rpc.js";
import { createAssert } from "typia";
import { users } from "../schema.js";
import { Argon2id } from "oslo/password";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const authRouter = trpc.router({
    login: trpc.procedure
        .input(createAssert<{ username: string, password: string }>())
        .output(createAssert<string | TRPCError>())
        .mutation(async ({ ctx, input }) => {
            const us = await ctx.database
                .select({ id: users.id,hashed_password: users.hashed_password })
                .from(users)
                .where(eq(users.username, input.username))
                .limit(1);

            if (us[0] == undefined) {
                return new TRPCError({
                    code: "INTERNAL_SERVER_ERROR"
                });
            }

            const { hashed_password, id } = us[0];
            if (!await new Argon2id().verify(hashed_password!, input.password)) {
                return new TRPCError({
                    code: "INTERNAL_SERVER_ERROR"
                });
            }

            const session = await ctx.lucia.createSession(id, {});

            return session.id;
        }),
    register: trpc.procedure
        .input(createAssert<{ username: string, password: string }>())
        .output(createAssert<string>())
        .mutation(async ({ ctx, input }) => {
            const userId = generateId(30);

            await ctx.database.insert(users).values({
                id: userId,
                username: input.username,
                hashed_password: await new Argon2id().hash(input.password)
            }).returning();

            const session = await ctx.lucia.createSession(userId, {});
            return session.id;
        }),
});

export type AuthRouter = typeof authRouter;