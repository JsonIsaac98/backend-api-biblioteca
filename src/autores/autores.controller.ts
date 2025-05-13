import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AutoresService } from './autores.service';
import { CreateAutorDto } from './dto/create-autor.dto';
import { UpdateAutorDto } from './dto/update-autor.dto';

@ApiTags('Autores')
@Controller('autores')
export class AutoresController {
  constructor(private readonly autoresService: AutoresService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo autor' })
  @ApiResponse({ status: 201, description: 'Autor creado exitosamente' })
  async create(@Body() createAutorDto: CreateAutorDto) {
    return await this.autoresService.create(createAutorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los autores' })
  @ApiResponse({ status: 200, description: 'Lista de autores' })
  async findAll() {
    return await this.autoresService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un autor por ID' })
  @ApiResponse({ status: 200, description: 'Autor encontrado' })
  @ApiResponse({ status: 404, description: 'Autor no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.autoresService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un autor' })
  @ApiResponse({ status: 200, description: 'Autor actualizado' })
  @ApiResponse({ status: 404, description: 'Autor no encontrado' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAutorDto: UpdateAutorDto
  ) {
    return await this.autoresService.update(id, updateAutorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un autor' })
  @ApiResponse({ status: 200, description: 'Autor eliminado' })
  @ApiResponse({ status: 404, description: 'Autor no encontrado' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.autoresService.remove(id);
    return { message: 'Autor eliminado exitosamente' };
  }
}