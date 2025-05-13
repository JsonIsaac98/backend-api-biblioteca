import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Libro } from '../entities/libro.entity';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';

@Injectable()
export class LibrosService {
  constructor(
    @InjectRepository(Libro)
    private librosRepository: Repository<Libro>,
  ) {}

  async create(createLibroDto: CreateLibroDto): Promise<Libro> {
    const libro = this.librosRepository.create(createLibroDto);
    return await this.librosRepository.save(libro);
  }

  async findAll(): Promise<Libro[]> {
    return await this.librosRepository.find({
      relations: ['autor'],
      where: { activo: true }
    });
  }

  async findOne(id: number): Promise<Libro> {
    const libro = await this.librosRepository.findOne({
      where: { id },
      relations: ['autor']
    });
    
    if (!libro) {
      throw new NotFoundException(`Libro con ID ${id} no encontrado`);
    }
    
    return libro;
  }

  async update(id: number, updateLibroDto: UpdateLibroDto): Promise<Libro> {
    const libro = await this.findOne(id);
    Object.assign(libro, updateLibroDto);
    return await this.librosRepository.save(libro);
  }

  async remove(id: number): Promise<void> {
    const libro = await this.findOne(id);
    libro.activo = false;
    await this.librosRepository.save(libro);
  }

  async search(query: string): Promise<Libro[]> {
    return await this.librosRepository
      .createQueryBuilder('libro')
      .leftJoinAndSelect('libro.autor', 'autor')
      .where('libro.titulo LIKE :query', { query: `%${query}%` })
      .orWhere('libro.isbn LIKE :query', { query: `%${query}%` })
      .orWhere('autor.nombre LIKE :query', { query: `%${query}%` })
      .orWhere('autor.apellido LIKE :query', { query: `%${query}%` })
      .andWhere('libro.activo = true')
      .getMany();
  }
}