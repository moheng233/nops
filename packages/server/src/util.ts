
export type Expand<U> = U extends string ? { [key in U]: unknown } : never;

export type Tuple2Union<Tuple extends readonly unknown[]> = Tuple[number];
// export type PgEnum2Unio<E extends PgEnum<unknown>> = Tuple2Union<E['enumValues']>;

export function getFirstOrNull<T>(items: T[]) {
    return items[0] ?? null;
}