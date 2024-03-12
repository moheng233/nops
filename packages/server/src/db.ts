import 'dotenv/config';

import consola from 'consola';
import { DefaultLogger, LogWriter } from 'drizzle-orm';
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { schemas } from './schema.js';


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