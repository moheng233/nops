import consola from 'consola';
import 'dotenv/config';
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { schemas } from './schema.js';
import { DefaultLogger, LogWriter } from 'drizzle-orm';


class ConsolaWriter implements LogWriter {
    write(message: string) {
        consola.log(message);
    }
}


export async function initDatabase() {
    const client = postgres(process.env["DB_URL"] as string);
    const logger = new DefaultLogger({ writer: new ConsolaWriter() });

    const database = drizzle(client, {
        schema: schemas,
        logger
    });

    return database;
}

export type Database = Awaited<ReturnType<typeof initDatabase>>;