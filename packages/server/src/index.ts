import "dotenv/config";

import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { consola } from "consola";
import cors from "cors";
import { Lucia, User } from "lucia";

import { initDatabase } from "./db.js";
import { getRouter } from "./rpc.js";
import { sessions, users } from "./schema.js";

const PORT = Number.parseInt(process.env.SERVER_PORT || "3001");

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: {
            username: string;
        };
    }
}

const database = await initDatabase();
const lucia = new Lucia(
    new DrizzlePostgreSQLAdapter(database, sessions, users),
    {
        getUserAttributes(attr) {
            return {
                username: attr.username,
            };
        },
        getSessionAttributes() {
            return {};
        },
    },
);

export interface Context {
    database: typeof database;
    lucia: typeof lucia;
    // session: Session | null;
    // user: User | null;
}

const handler = createHTTPServer({
    middleware: cors(),
    router: getRouter(),
    async createContext({ req }) {
        // const token = lucia.readBearerToken(req.headers.authorization ?? "");
        // const data = await lucia.validateSession(token ?? "");

        return {
            database,
            lucia,
            // session: data["session"],
            // user: data["user"],
        };
    },
});

handler.listen(PORT);

consola.log(`✅ TRPC Server listening on http://localhost:${PORT}`);
