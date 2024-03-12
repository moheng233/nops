import { z } from "zod";

import { userRoleEnum } from "./schema";

export const VEmail = z.string().email().max(40);
export const VPassword = z.string().min(6).max(30);
export const VRoles = z.enum(userRoleEnum.enumValues);

export const VEmailAndPassword = z.object({
    email: VEmail,
    password: VPassword,
});
