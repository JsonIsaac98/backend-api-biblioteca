import { Module } from '@nestjs/common';
import { PrestamosService } from './prestamos.service';
import { PrestamosController } from './prestamos.controller';
import { Prestamo } from 'src/entities/prestamo.entity';
import { Libro } from 'src/entities/libro.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Prestamo, Libro, Usuario])],
  providers: [PrestamosService],
  controllers: [PrestamosController]
})
export class PrestamosModule {}
