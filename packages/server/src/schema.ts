import { pgEnum, pgTable, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";

export const userStatusEnum = pgEnum('user_status', ["INVITE", "NORMAL", "DELETE"]);
export const userRoleEnum = pgEnum('use_role', ["ADMIN", "USER"]);

export const users = pgTable('users', {
    id: varchar("id", { length: 255 }).primaryKey(),
    email: varchar("email", { length: 30 }),
    hashed_password: varchar("hashed_password", { length: 30 }),
    status: userStatusEnum("status"),
    role: userRoleEnum("role")
}, (table) => {
    return {
        emailIndex: uniqueIndex("email_idx").on(table.email),
    }
});

export const sessions = pgTable("sessions", {
    id: varchar("id", { length: 255 }).primaryKey(),
    userId: varchar("user_id", { length: 255 })
        .notNull()
        .references(() => users.id),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date"
    }).notNull()
});

export const schemas = {
    users, sessions
};