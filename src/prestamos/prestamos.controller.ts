import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { PrestamosService } from './prestamos.service';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Préstamos')
@Controller('prestamos')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PrestamosController {
  constructor(private readonly prestamosService: PrestamosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo préstamo' })
  @ApiResponse({ status: 201, description: 'Préstamo creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos o sin stock' })
  @ApiResponse({ status: 404, description: 'Libro no encontrado' })
  async create(@Body() createPrestamoDto: CreatePrestamoDto) {
    return await this.prestamosService.create(createPrestamoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los préstamos' })
  @ApiResponse({ status: 200, description: 'Lista de préstamos' })
  async findAll() {
    return await this.prestamosService.findAll();
  }

  @Get('estadisticas')
  @ApiOperation({ summary: 'Obtener estadísticas de préstamos' })
  @ApiResponse({ status: 200, description: 'Estadísticas de préstamos' })
  async getEstadisticas() {
    return await this.prestamosService.getEstadisticas();
  }

  @Get('usuario/:usuarioId')
  @ApiOperation({ summary: 'Obtener préstamos por usuario' })
  @ApiResponse({ status: 200, description: 'Lista de préstamos del usuario' })
  async findByUser(@Param('usuarioId', ParseIntPipe) usuarioId: number) {
    return await this.prestamosService.findByUser(usuarioId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un préstamo por ID' })
  @ApiResponse({ status: 200, description: 'Préstamo encontrado' })
  @ApiResponse({ status: 404, description: 'Préstamo no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.prestamosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un préstamo' })
  @ApiResponse({ status: 200, description: 'Préstamo actualizado' })
  @ApiResponse({ status: 404, description: 'Préstamo no encontrado' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePrestamoDto: UpdatePrestamoDto
  ) {
    return await this.prestamosService.update(id, updatePrestamoDto);
  }

  @Post(':id/devolver')
  @ApiOperation({ summary: 'Devolver un libro prestado' })
  @ApiResponse({ status: 200, description: 'Libro devuelto exitosamente' })
  @ApiResponse({ status: 400, description: 'El libro ya fue devuelto' })
  @ApiResponse({ status: 404, description: 'Préstamo no encontrado' })
  async devolver(@Param('id', ParseIntPipe) id: number) {
    return await this.prestamosService.devolver(id);
  }

  @Post('check-vencidos')
  @ApiOperation({ summary: 'Marcar préstamos vencidos' })
  @ApiResponse({ status: 200, description: 'Préstamos vencidos actualizados' })
  async checkVencidos() {
    const count = await this.prestamosService.checkVencidos();
    return { message: `Se marcaron ${count} préstamos como vencidos` };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un préstamo' })
  @ApiResponse({ status: 200, description: 'Préstamo eliminado' })
  @ApiResponse({ status: 400, description: 'No se puede eliminar un préstamo activo' })
  @ApiResponse({ status: 404, description: 'Préstamo no encontrado' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.prestamosService.remove(id);
    return { message: 'Préstamo eliminado exitosamente' };
  }
}