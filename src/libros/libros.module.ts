import { Module } from '@nestjs/common';
import { LibrosService } from './libros.service';
import { LibrosController } from './libros.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Libro } from 'src/entities/libro.entity';
import { Autor } from 'src/entities/autor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Libro, Autor])],
  providers: [LibrosService],
  controllers: [LibrosController]
})
export class LibrosModule {}
