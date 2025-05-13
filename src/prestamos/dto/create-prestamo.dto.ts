import { IsInt, IsNotEmpty, IsDateString, IsEnum, IsOptional, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePrestamoDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  usuarioId: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  libroId: number;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  fechaDevolucion: string;

  @ApiProperty({ enum: ['prestado', 'devuelto', 'vencido'], default: 'prestado' })
  @IsEnum(['prestado', 'devuelto', 'vencido'])
  @IsOptional()
  estado?: string = 'prestado';

  @ApiProperty({ default: 0 })
  @IsPositive()
  @IsOptional()
  multa?: number = 0;
}