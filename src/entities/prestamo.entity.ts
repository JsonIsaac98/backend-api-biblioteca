import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";
import { Libro } from "./libro.entity";


@Entity('prestamos')
export class Prestamo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'usuario_id'})
    usuarioId: number;

    @Column({name: 'libro_id'})
    libroId: number;

    @CreateDateColumn({ name: 'fecha_prestamo' })
    fechaPrestamo: Date;

    @Column('date', { name: 'fecha_devolucion' })
    fechaDevolucion: Date;

    @Column(({ type: 'enum', enum: ['prestado', 'devuelto', 'vencido'], default: 'prestado' }))
    estado: string; 

    @Column('decimal', { precison: 10, scale: 2, default: 0 })
    multa: number;

    @ManyToMany(() => Usuario, usuario => usuario.prestamos)
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @ManyToMany(() => Libro, libro => libro.prestamos)
    @JoinColumn({ name: 'libro_id' })
    libro: Libro;
}