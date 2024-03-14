import { TRPCError } from "@trpc/server";
import { asc, eq } from "drizzle-orm";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { z } from "zod";

import { getTrpc } from "../rpc.js";
import { userRoleEnum, users } from "../schema.js";
import { getFirstOrNull } from "../util.js";
import {
    VEmail,
    VEmailAndPassword,
    VInfiniteQuery,
    VUser,
    VUserInsert,
} from "../validators.js";

export default getTrpc().router({
    login: getTrpc()
        .procedure.input(VEmailAndPassword)
        .output(z.string())
        .mutation(async ({ ctx, input }) => {
            const us = await ctx.database
                .select({
                    id: users.id,
                    hashed_password: users.hashed_password,
                })
                .from(users)
                .where(eq(users.email, input.email))
                .limit(1);

            if (us[0] == undefined) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                });
            }

            const { hashed_password, id } = us[0];
            if (
                !(await new Argon2id().verify(hashed_password!, input.password))
            ) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                });
            }

            const session = await ctx.lucia.createSession(id, {});

            return session.id;
        }),

    inviteUser: getTrpc()
        .procedure.meta({ requireRole: "ADMIN" })
        .input(
            z.object({
                email: VEmail,
                role: z.enum(userRoleEnum.enumValues),
            }),
        )
        .output(z.string())
        .mutation(async ({ ctx, input }) => {
            const userId = generateId(30);

            await ctx.database
                .insert(users)
                .values({
                    id: userId,
                    email: input.email,
                    nickname: "",
                    hashed_password: undefined,
                    status: "INVITE",
                    role: input.role,
                })
                .returning();

            return userId;
        }),

    inviteAcceptUser: getTrpc()
        .procedure.input(VEmailAndPassword)
        .output(z.boolean())
        .mutation(async ({ ctx, input }) => {
            const user = getFirstOrNull(
                await ctx.database
                    .select()
                    .from(users)
                    .where(eq(users.email, input.email)),
            );

            if (user == null) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                });
            }

            return true;
        }),

    createUser: getTrpc()
        .procedure.meta({
            requireRole: "ADMIN",
        })
        .input(VUserInsert)
        .output(z.boolean())
        .mutation(async ({ ctx, input }) => {
            const userId = generateId(30);

            await ctx.database
                .insert(users)
                .values({
                    id: userId,
                    ...input,
                })
                .returning();

            return true;
        }),

    getAllUsers: getTrpc()
        .procedure.meta({
            requireRole: "ADMIN",
        })
        .input(VInfiniteQuery)
        .output(z.array(VUser))
        .query(async ({ ctx, input: { limit, cursor } }) => {
            const items = await ctx.database.query.users.findMany({
                limit,
                offset: cursor,
                orderBy: [asc(users.serial)],
            });

            return items;
        }),
});
