import { consola } from "consola";
import 'dotenv/config';
import type { Hot } from "dynohot/hot";
import { Lucia, Session, User } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Server, createServer } from "node:http";
import { router } from "./rpc.js";
import { createHTTPHandler } from "@trpc/server/adapters/standalone";
import { initDatabase } from "./db.js";
import { sessions, users, userRoleEnum } from "./schema.js";

const PORT = process.env.SERVER_PORT || 3001;

const server = createServer();
const database = await initDatabase();
const lucia = new Lucia(new DrizzlePostgreSQLAdapter(database, sessions, users), {
    getUserAttributes(attr) {
        return {
            username: attr.username,
        }
    },
    getSessionAttributes(attr) {
        return {
            
        }
    },
});

export interface Context {
    database: typeof database,
    lucia: typeof lucia,
    session: Session | null,
    user: User | null
}

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: {
            username: string;
        };
    }
}

async function app(server: Server) {
    const handler = createHTTPHandler({
        router,
        async createContext({ req }) {
            const token = lucia.readBearerToken(req.headers.authorization ?? "");
            const { session, user } = await lucia.validateSession(token ?? "");

            return {
                database,
                lucia,
                session,
                user
            }
        }
    });

    server.on("request", async (req, res) => {
        await handler(req, res);
    });
}


server.addListener("listening", () => {
    consola.success(`Server listening in http://localhost:${PORT}`);
});

await app(server);

if ((import.meta as any)['hot'] != null) {
    consola.info("Starting NOPS Server is Development mode");

    ((import.meta as any).hot as Hot).accept(["./rpc.js"], async () => {
        consola.success("Hot reloading NOPS server");
        server.removeAllListeners("request");
        await app(server);
    });

} else {
    consola.info("Starting NOPS Server");
}

server.listen(PORT);