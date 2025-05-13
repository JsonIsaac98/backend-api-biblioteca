import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Autor } from '../entities/autor.entity';
import { CreateAutorDto } from './dto/create-autor.dto';
import { UpdateAutorDto } from './dto/update-autor.dto';

@Injectable()
export class AutoresService {
  constructor(
    @InjectRepository(Autor)
    private autoresRepository: Repository<Autor>,
  ) {}

  async create(createAutorDto: CreateAutorDto): Promise<Autor> {
    const autor = this.autoresRepository.create(createAutorDto);
    return await this.autoresRepository.save(autor);
  }

  async findAll(): Promise<Autor[]> {
    return await this.autoresRepository.find({
      relations: ['libros']
    });
  }

  async findOne(id: number): Promise<Autor> {
    const autor = await this.autoresRepository.findOne({
      where: { id },
      relations: ['libros']
    });
    
    if (!autor) {
      throw new NotFoundException(`Autor con ID ${id} no encontrado`);
    }
    
    return autor;
  }

  async update(id: number, updateAutorDto: UpdateAutorDto): Promise<Autor> {
    const autor = await this.findOne(id);
    Object.assign(autor, updateAutorDto);
    return await this.autoresRepository.save(autor);
  }

  async remove(id: number): Promise<void> {
    const autor = await this.findOne(id);
    await this.autoresRepository.remove(autor);
  }
}