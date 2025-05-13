import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Libro } from './libro.entity';

@Entity('prestamos')
export class Prestamo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'usuario_id' })
  usuarioId: number;

  @Column({ name: 'libro_id' })
  libroId: number;

  @CreateDateColumn({ name: 'fecha_prestamo' })
  fechaPrestamo: Date;

  @Column('date', { name: 'fecha_devolucion' })
  fechaDevolucion: Date;

  @Column('timestamp', { nullable: true, name: 'fecha_devolucion_real' })
  fechaDevolucionReal: Date;

  @Column({ type: 'enum', enum: ['prestado', 'devuelto', 'vencido'], default: 'prestado' })
  estado: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  multa: number;

  @ManyToOne(() => Usuario, usuario => usuario.prestamos)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @ManyToOne(() => Libro, libro => libro.prestamos)
  @JoinColumn({ name: 'libro_id' })
  libro: Libro;
}