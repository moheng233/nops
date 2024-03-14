import {
    pgEnum,
    pgTable,
    serial,
    timestamp,
    uniqueIndex,
    varchar,
} from "drizzle-orm/pg-core";

export const userStatusEnum = pgEnum("user_status", [
    "INVITE",
    "NORMAL",
    "DELETE",
]);
export const userRoleEnum = pgEnum("use_role", ["ADMIN", "USER"]);

export const users = pgTable(
    "users",
    {
        serial: serial("serial").notNull(),
        id: varchar("id", { length: 255 }).primaryKey(),
        nickname: varchar("nickname", { length: 50 }).notNull(),
        email: varchar("email", { length: 30 }).notNull(),
        hashed_password: varchar("hashed_password", { length: 30 }),
        status: userStatusEnum("status").default("NORMAL").notNull(),
        role: userRoleEnum("role").default("USER").notNull(),
    },
    (table) => {
        return {
            serialIndex: uniqueIndex("serial_idx").on(table.serial),
            emailIndex: uniqueIndex("email_idx").on(table.email),
        };
    },
);

export const sessions = pgTable("sessions", {
    id: varchar("id", { length: 255 }).primaryKey(),
    userId: varchar("user_id", { length: 255 })
        .notNull()
        .references(() => users.id),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date",
    }).notNull(),
});

export const schemas = {
    users,
    sessions,
};
