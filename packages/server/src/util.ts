import type { PgEnum } from "drizzle-orm/pg-core";

export type Tuple2Union<Tuple extends readonly unknown[]> = Tuple[number];
export type PgEnum2Unio<E extends PgEnum<any>> = Tuple2Union<E['enumValues']>;