import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { userRoleEnum, users } from "./schema";

export const VEmail = z.string().email().max(40);
export const VPassword = z.string().min(6).max(30);
export const VRoles = z.enum(userRoleEnum.enumValues);

export const VEmailAndPassword = z.object({
    email: VEmail,
    password: VPassword,
});

export const VInfiniteQuery = z.object({
    limit: z.number().min(1).max(100).default(50),
    cursor: z.number().default(0),
    direction: z.enum(["forward", "backward"]).default("forward"),
});

export const VUser = createSelectSchema(users);
export const VUserInsert = createInsertSchema(users).omit({
    serial: true,
    id: true,
});
