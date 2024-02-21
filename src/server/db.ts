import { DataSource } from "typeorm";
import { UserEntity } from "./entities/user.entity.js";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "sqlite.db",
    synchronize: true,
    logging: true,
    entities: [UserEntity,]
});