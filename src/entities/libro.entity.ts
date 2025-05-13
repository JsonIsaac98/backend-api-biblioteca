// backend/src/entities/libro.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Prestamo } from './prestamo.entity';
import { Autor } from './autor.entity';

@Entity('libros')
export class Libro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ unique: true })
  isbn: string;

  @Column('text', { nullable: true })
  descripcion: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column('date', { nullable: true, name: 'fecha_publicacion' })
  fechaPublicacion: Date;

  @Column({ default: 0 })
  stock: number;

  @Column({ default: true })
  activo: boolean;

  @Column({ name: 'autor_id' })
  autorId: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  fechaActualizacion: Date;

  @ManyToOne(() => Autor, autor => autor.libros)
  @JoinColumn({ name: 'autor_id' })
  autor: Autor;

  @OneToMany(() => Prestamo, prestamo => prestamo.libro)
  prestamos: Prestamo[];
}