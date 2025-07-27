import "reflect-metadata";
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn } from "typeorm";
import bcrypt from "bcryptjs"
import "dotenv"

import { Rol } from "./Rol";
import { Solicitud } from "./Solicitud";

@Entity()
export class Usuario extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 45, unique: true })
    email!: string;

    @Column({ type: "varchar", length: 45 })
    nombre!: string;

    @Column({ type: "varchar", length: 45 })
    apellido!: string;

    @Column({ type: "varchar", length: 255 })
    contrasenia!: string;


    // Relaciones
    @OneToOne(() => Rol)
        @JoinColumn({ name: 'rol_id' })
        rol!: Rol;

    @OneToMany(() => Solicitud, solicitud => solicitud.usuario, {
        cascade: true
    })
        solicitudes!: Solicitud[];


    // Métodos
    async hashContrasenia() {
        this.contrasenia = await bcrypt.hash(this.contrasenia, process.env.SALT_ROUNDS  || "10");
    }

    async compareContrasenia(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.contrasenia);
    }
}