import "reflect-metadata";
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

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

    @Column({ type: "varchar", length: 255 })
    mensaje!: string;

    @Column({ type: "varchar", length: 45 })
    referencia!: string;

    @Column({ type: "varchar", length: 45 })
    nombre!: string;

    @Column({ type: "varchar", length: 45 })
    estado: string = "Pendiente";


    // Relaciones
    @ManyToOne(() => Usuario, usuario => usuario.solicitudes, { nullable: false })
        @JoinColumn({ name: 'usuario_id' })
        usuario!: Usuario;

    @ManyToOne(() => Pais, { nullable: true })
        @JoinColumn({ name: 'pais_id' })
        pais!: Pais;
    
    @ManyToOne(() => Provincia, { nullable: true })
        @JoinColumn({ name: 'provincia_id' })
        provincia!: Provincia;
    
    @ManyToOne(() => Localidad, { nullable: true })
        @JoinColumn({ name: 'localidad_id' })
        localidad!: Localidad;
}