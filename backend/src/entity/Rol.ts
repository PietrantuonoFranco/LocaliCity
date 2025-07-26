import "reflect-metadata";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";

import { Usuario } from "./Usuario";

@Entity()
export class Rol extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 45 })
    name!: string;


    // Relaciones
    @OneToOne(() => Usuario)
        usuario!: Usuario;
}