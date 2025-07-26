import "reflect-metadata";
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";

import { Pais } from "./Pais";
import { Localidad } from "./Localidad";

@Entity()
export class Provincia extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 45, unique: true })
    email!: string;

    @Column({ type: "varchar", length: 45 })
    nombre!: string;

    @Column({ type: "varchar", length: 45 })
    apellido!: string;

    @Column({ type: "varchar", length: 45 })
    contrasenia!: string;


    // Relaciones
    @ManyToOne(() => Pais, pais => pais.provincias)
        @JoinColumn({ name: 'pais_id' })
        pais!: Pais;

    @OneToMany(() => Localidad, localidad => localidad.provincia, {
        cascade: true
    })
        localidades!: Localidad[];
}