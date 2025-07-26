import "reflect-metadata";
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { Provincia } from "./Provincia"

@Entity()
export class Pais extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 45 })
    nombre!: string;


    // Relaciones
    @OneToMany(() => Provincia, provincia => provincia.pais, {
        cascade: true
    })
        provincias!: Provincia[];
}