import { createHTTPHandler } from "@trpc/server/adapters/standalone";
import { consola } from "consola";
import type { Hot } from "dynohot/hot";
import { Server, createServer } from "node:http";
import { appRouter } from "./router.js";

const port = process.env.SERVER_PORT || 3001;

async function app(server: Server) {
    const handle = createHTTPHandler({
        router: appRouter
    });

    server.addListener("request", (res, rep) => {
        handle(res, rep);
    })
}

const server = createServer();
server.addListener("listening", () => {
    consola.success(`Server listening in http://localhost:${port}`);
});

await app(server);

if ((import.meta as any)['hot'] != null) {
    consola.info("Starting NOPS Server is Development mode");
    
    ((import.meta as any).hot as Hot).accept("./router.js",async () => {
        consola.success("Hot reloading NOPS Server");
        server.removeAllListeners("request");
        await app(server);
    });

} else {
    consola.info("Starting NOPS Server");
}

server.listen(port);