import { pgEnum, pgTable, serial, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum('role', ["ADMIN", "USER"]);
export const roles = roleEnum.enumValues;

export const users = pgTable('users', {
    id: varchar("id", { length: 255 }).primaryKey(),
    username: varchar("username", { length: 30 }),
    hashed_password: varchar("hashed_password", { length: 30 }),
    role: roleEnum("role")
}, (table) => {
    return {
        usernameIndex: uniqueIndex("username_idx").on(table.username),

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