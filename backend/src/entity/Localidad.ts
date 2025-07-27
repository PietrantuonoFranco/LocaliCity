import "reflect-metadata";
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

import { Provincia } from "./Provincia";

@Entity()
export class Localidad extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 45 })
    nombre!: string;


    // Relaciones
    @ManyToOne(() => Provincia, provincia => provincia.localidades)
        @JoinColumn({ name: 'provincia_id' })
        provincia!: Provincia;
}