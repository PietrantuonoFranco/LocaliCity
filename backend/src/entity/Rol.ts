import "reflect-metadata";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToOne, OneToMany } from "typeorm";

import { Usuario } from "./Usuario";

@Entity()
export class Rol extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 45 })
    nombre!: string;


    // Relaciones
    @OneToMany(() => Usuario, usuario => usuario.rol)
        usuarios!: Usuario[];
}