import { createHTTPHandler } from "@trpc/server/adapters/standalone";
import { consola } from "consola";
import 'dotenv/config';
import type { Hot } from "dynohot/hot";
import { Server, createServer } from "node:http";
import { appRouter, createContext } from "./rpc.js";
import { AppDataSource } from "./db.js";

const PORT = process.env.SERVER_PORT || 3001;

async function app(server: Server) {
    const handle = createHTTPHandler({
        router: appRouter,
        createContext
    });

    server.addListener("request", (res, rep) => {
        handle(res, rep);
    })
}

const server = createServer();
let database = await AppDataSource.initialize();
server.addListener("listening", () => {
    consola.success(`Server listening in http://localhost:${PORT}`);
});

await app(server);

if ((import.meta as any)['hot'] != null) {
    consola.info("Starting NOPS Server is Development mode");

    ((import.meta as any).hot as Hot).accept(["./rpc.js"], async () => {
        consola.success("Hot reloading NOPS Server");
        server.removeAllListeners("request");
        await app(server);
    });

} else {
    consola.info("Starting NOPS Server");
}

server.listen(PORT);