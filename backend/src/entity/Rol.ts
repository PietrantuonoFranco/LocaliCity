import "reflect-metadata";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToOne } from "typeorm";

import { Usuario } from "./Usuario";

@Entity()
export class Rol extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 45 })
    nombre!: string;


    // Relaciones
    @OneToOne(() => Usuario)
        usuario!: Usuario;
}