import { Lucia, generateId } from "lucia";
import { trpc } from "../rpc.js";
import { createAssert } from "typia";
import { userRoleEnum, users } from "../schema.js";
import { Argon2id } from "oslo/password";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { PgEnum2Unio } from "../util.js";

export const authRouter = trpc.router({
    login: trpc.procedure
        .input(createAssert<{ email: string, password: string }>())
        .output(createAssert<string | TRPCError>())
        .mutation(async ({ ctx, input }) => {
            const us = await ctx.database
                .select({ id: users.id, hashed_password: users.hashed_password })
                .from(users)
                .where(eq(users.email, input.email))
                .limit(1);

            if (us[0] == undefined) {
                throw new TRPCError({
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
    inviteUser: trpc.procedure
        .meta({ requireRole: "ADMIN" })
        .input(createAssert<{ email: string, role: PgEnum2Unio<typeof userRoleEnum> }>)
        .output(createAssert<boolean>())
        .mutation(async ({ ctx, input }) => {


            return true;
        }),
    inviteAcceptUser: trpc.procedure
        .input(createAssert<{ id: string, password: string }>)
        .output(createAssert<string>())
        .mutation(async ({ctx, input}) => {
            
        }),
    createUser: trpc.procedure
        .meta({
            requireRole: "ADMIN"
        })
        .input(createAssert<{ email: string, password: string }>())
        .output(createAssert<boolean>())
        .mutation(async ({ ctx, input }) => {
            const userId = generateId(30);

            await ctx.database.insert(users).values({
                id: userId,
                email: input.email,
                hashed_password: await new Argon2id().hash(input.password),
                status: "NORMAL",
                role: "ADMIN"
            }).returning();

            return true;
        }),
});

export type AuthRouter = typeof authRouter;