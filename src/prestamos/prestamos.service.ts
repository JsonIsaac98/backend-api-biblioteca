import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prestamo } from '../entities/prestamo.entity';
import { Libro } from '../entities/libro.entity';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';

@Injectable()
export class PrestamosService {
  constructor(
    @InjectRepository(Prestamo)
    private prestamosRepository: Repository<Prestamo>,
    @InjectRepository(Libro)
    private librosRepository: Repository<Libro>,
  ) {}

  async create(createPrestamoDto: CreatePrestamoDto): Promise<Prestamo> {
    // Verificar que el libro existe y tiene stock
    const libro = await this.librosRepository.findOne({
      where: { id: createPrestamoDto.libroId }
    });
    
    if (!libro) {
      throw new NotFoundException('Libro no encontrado');
    }
    
    if (libro.stock <= 0) {
      throw new BadRequestException('No hay stock disponible para este libro');
    }
    
    // Verificar que el usuario no tenga préstamos vencidos
    const prestamosVencidos = await this.prestamosRepository.count({
      where: {
        usuarioId: createPrestamoDto.usuarioId,
        estado: 'vencido',
      }
    });
    
    if (prestamosVencidos > 0) {
      throw new BadRequestException('El usuario tiene préstamos vencidos. Debe devolverlos antes de solicitar uno nuevo.');
    }
    
    // Crear el préstamo
    const prestamo = this.prestamosRepository.create(createPrestamoDto);
    const savedPrestamo = await this.prestamosRepository.save(prestamo);
    
    // Reducir el stock del libro
    libro.stock -= 1;
    await this.librosRepository.save(libro);
    
    return savedPrestamo;
  }

  async findAll(): Promise<Prestamo[]> {
    return await this.prestamosRepository.find({
      relations: ['usuario', 'libro', 'libro.autor']
    });
  }

  async findOne(id: number): Promise<Prestamo> {
    const prestamo = await this.prestamosRepository.findOne({
      where: { id },
      relations: ['usuario', 'libro', 'libro.autor']
    });
    
    if (!prestamo) {
      throw new NotFoundException(`Préstamo con ID ${id} no encontrado`);
    }
    
    return prestamo;
  }

  async findByUser(usuarioId: number): Promise<Prestamo[]> {
    return await this.prestamosRepository.find({
      where: { usuarioId },
      relations: ['libro', 'libro.autor']
    });
  }

  async update(id: number, updatePrestamoDto: UpdatePrestamoDto): Promise<Prestamo> {
    const prestamo = await this.findOne(id);
    Object.assign(prestamo, updatePrestamoDto);
    return await this.prestamosRepository.save(prestamo);
  }

  async devolver(id: number): Promise<Prestamo> {
    const prestamo = await this.findOne(id);
    
    if (prestamo.estado === 'devuelto') {
      throw new BadRequestException('Este libro ya fue devuelto');
    }
    
    // Actualizar el préstamo
    prestamo.estado = 'devuelto';
    prestamo.fechaDevolucionReal = new Date();
    
    // Calcular multa si está vencido
    const fechaLimite = new Date(prestamo.fechaDevolucion);
    const fechaDevolucion = new Date(prestamo.fechaDevolucionReal);
    
    if (fechaDevolucion > fechaLimite) {
      const diasRetraso = Math.ceil((fechaDevolucion.getTime() - fechaLimite.getTime()) / (1000 * 60 * 60 * 24));
      prestamo.multa = diasRetraso * 5; // $5 por día de retraso
    }
    
    const savedPrestamo = await this.prestamosRepository.save(prestamo);
    
    // Aumentar el stock del libro
    const libro = await this.librosRepository.findOne({
      where: { id: prestamo.libroId }
    });
    if (libro) {
      libro.stock += 1;
      await this.librosRepository.save(libro);
    }
    
    return savedPrestamo;
  }

  async checkVencidos(): Promise<number> {
    const today = new Date();
    const vencidos = await this.prestamosRepository
      .createQueryBuilder()
      .update(Prestamo)
      .set({ estado: 'vencido' })
      .where('fechaDevolucion < :today', { today })
      .andWhere('estado = :estado', { estado: 'prestado' })
      .execute();
    
    return vencidos.affected || 0;
  }

  async remove(id: number): Promise<void> {
    const prestamo = await this.findOne(id);
    
    if (prestamo.estado === 'prestado') {
      throw new BadRequestException('No se puede eliminar un préstamo activo. Primero devuelva el libro.');
    }
    
    await this.prestamosRepository.remove(prestamo);
  }

  async getEstadisticas(): Promise<any> {
    const total = await this.prestamosRepository.count();
    const activos = await this.prestamosRepository.count({ where: { estado: 'prestado' } });
    const vencidos = await this.prestamosRepository.count({ where: { estado: 'vencido' } });
    const devueltos = await this.prestamosRepository.count({ where: { estado: 'devuelto' } });
    
    return {
      total,
      activos,
      vencidos,
      devueltos,
    };
  }
}