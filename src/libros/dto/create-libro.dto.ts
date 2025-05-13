import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsISO8601 } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLibroDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  isbn: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty()
  @IsNumber()
  precio: number;

  @ApiProperty({ required: false })
  @IsISO8601()
  @IsOptional()
  fechaPublicacion?: string;

  @ApiProperty({ default: 0 })
  @IsNumber()
  @IsOptional()
  stock?: number;

  @ApiProperty({ default: true })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @ApiProperty()
  @IsNumber()
  autorId: number;
}