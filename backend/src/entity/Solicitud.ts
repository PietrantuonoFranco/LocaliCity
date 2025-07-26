import "reflect-metadata";
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, OneToMany, JoinColumn } from "typeorm";

import { Usuario } from "./Usuario";
import { Pais } from "./Pais";
import { Provincia } from "./Provincia";
import { Localidad } from "./Localidad";


@Entity()
export class Solicitud extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 45 })
    tipo!: string;

    @Column({ type: "varchar", length: 45 })
    mensaje!: string;

    @Column({ type: "varchar", length: 45 })
    referencia!: string;


    // Relaciones
    @ManyToOne(() => Usuario, usuario => usuario.solicitudes)
        @JoinColumn({ name: 'usuario_id' })
        usuario!: Usuario;

    @OneToOne(() => Pais, { nullable: true })
        @JoinColumn({ name: 'pais_id' })
        pais!: Pais;
    
    @OneToOne(() => Provincia, { nullable: true })
        @JoinColumn({ name: 'provincia_id' })
        provincia!: Provincia;
    
    @OneToOne(() => Localidad, { nullable: true })
        @JoinColumn({ name: 'localidad_id' })
        localidad!: Localidad;
}