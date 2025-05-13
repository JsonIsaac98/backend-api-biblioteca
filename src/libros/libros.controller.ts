// backend/src/libros/libros.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LibrosService } from './libros.service';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';

@ApiTags('Libros')
@Controller('libros')
export class LibrosController {
  constructor(private readonly librosService: LibrosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo libro' })
  @ApiResponse({ status: 201, description: 'Libro creado exitosamente' })
  async create(@Body() createLibroDto: CreateLibroDto) {
    return await this.librosService.create(createLibroDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los libros' })
  @ApiResponse({ status: 200, description: 'Lista de libros' })
  async findAll() {
    return await this.librosService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Buscar libros' })
  @ApiResponse({ status: 200, description: 'Libros encontrados' })
  async search(@Query('q') query: string) {
    return await this.librosService.search(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un libro por ID' })
  @ApiResponse({ status: 200, description: 'Libro encontrado' })
  @ApiResponse({ status: 404, description: 'Libro no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.librosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un libro' })
  @ApiResponse({ status: 200, description: 'Libro actualizado' })
  @ApiResponse({ status: 404, description: 'Libro no encontrado' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLibroDto: UpdateLibroDto
  ) {
    return await this.librosService.update(id, updateLibroDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un libro (soft delete)' })
  @ApiResponse({ status: 200, description: 'Libro eliminado' })
  @ApiResponse({ status: 404, description: 'Libro no encontrado' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.librosService.remove(id);
    return { message: 'Libro eliminado exitosamente' };
  }
}