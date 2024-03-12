import 'dotenv/config';

import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { applyWSSHandler  } from "@trpc/server/adapters/ws";
import { consola } from "consola";
import { Lucia, Session, User } from "lucia";
import { WebSocketServer } from 'ws';

import { initDatabase } from "./db.js";
import { getRouter } from "./rpc.js";
import { sessions,users } from "./schema.js";

const PORT = Number.parseInt(process.env.SERVER_PORT || "3001");

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: {
            username: string;
        };
    }
}

const wss = new WebSocketServer({
    port: PORT
});
const database = await initDatabase();
const lucia = new Lucia(new DrizzlePostgreSQLAdapter(database, sessions, users), {
    getUserAttributes(attr) {
        return {
            username: attr.username,
        }
    },
    getSessionAttributes() {
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

const handler = applyWSSHandler({
    wss,
    router: getRouter(),
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

wss.on('connection', (ws) => {
    consola.log(`➕➕ Connection (${wss.clients.size})`);
    ws.once('close', () => {
        consola.log(`➖➖ Connection (${wss.clients.size})`);
      });
});

consola.log(`✅ WebSocket Server listening on ws://localhost:${PORT}`);

process.on('SIGTERM', () => {
    consola.log('SIGTERM');
    handler.broadcastReconnectNotification();
    wss.close();
});