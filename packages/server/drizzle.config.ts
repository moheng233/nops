import 'dotenv/config';

import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./src/schema.ts",
    out: "./.drizzle",
    driver: "pg",
    dbCredentials: {
        connectionString: process.env.DB_URL as string
    }
});