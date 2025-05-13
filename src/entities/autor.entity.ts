import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Libro } from './libro.entity';

@Entity('autores')
export class Autor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column('text', { nullable: true })
  biografia: string;

  @Column({ nullable: true })
  nacionalidad: string;

  @Column('date', { nullable: true, name: 'fecha_nacimiento' })
  fechaNacimiento: Date;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  fechaActualizacion: Date;

  @OneToMany(() => Libro, libro => libro.autor)
  libros: Libro[];
}