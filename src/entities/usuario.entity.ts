import { Exclude } from "class-transformer";
import { cp } from "fs";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Prestamo } from "./prestamo.entity";

@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column({unique: true})
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column ({type: 'enum', enum: ['admin', 'usuario'], default: 'usuario'})
    rol: string;

    @CreateDateColumn({ name: 'fecha_creacion' })
    fechaCreacion: Date;

    @UpdateDateColumn({ name: 'fecha_actualizacion' })
    fechaActualizacion: Date;

    @OneToMany(() => Prestamo, prestamo => prestamo.usuario)
    prestamos: Prestamo[];
}