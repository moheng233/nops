import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column({ length: 16 })
    username: string = "";

    @Column()
    password: string = "";

}